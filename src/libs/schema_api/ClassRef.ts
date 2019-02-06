import * as _ from 'lodash';
import {ClassUtils, NotYetImplementedError} from "commons-base/browser";
import {SchemaUtils} from "./SchemaUtils";
import {
  XS_DEFAULT,
  XS_DEFAULT_SCHEMA, XS_ID_SEPARATOR,
  XS_TYPE_CLASS_REF,
  XS_TYPE_ENTITY,
  XS_TYPE_PROPERTY,
  XS_TYPE_SCHEMA
} from "./Constants";
import {LookupRegistry} from "./LookupRegistry";
import {Binding} from "./Binding";
import {IEntityRef} from "./IEntityRef";
import {IPropertyRef} from "./IPropertyRef";
import {IClassRef} from "./IClassRef";
import {IBuildOptions} from "./IBuildOptions";
import {IClassRefMetadata} from "./IClassRefMetadata";

export class ClassRef implements IClassRef {

  static __inc: number = 0;

  private lookupRegistry: string = XS_DEFAULT;

  private readonly idx: number;

  schema: string = XS_DEFAULT_SCHEMA;

  originalValue: string | Function;

  readonly className: string;

  private _cacheEntity: IEntityRef;

  private _options: any = {};

  isEntity: boolean = false;

  isPlaceholder: boolean = false;

  constructor(klass: string | Function) {
    this.className = ClassUtils.getClassName(klass);
    if (_.isString(klass)) {
      this.originalValue = klass;
      this.isPlaceholder = true;
    } else {
      this.originalValue = ClassUtils.getFunction(klass);
    }
    this.idx = ClassRef.__inc++;

  }

  updateClass(cls: Function) {
    this.originalValue = ClassUtils.getFunction(cls);
    this.isPlaceholder = false;
  }

  getOptions(key?: string): any {
    if (key) {
      return _.get(this._options, key);
    }
    return this._options;
  }

  setOptions(options: any) {
    if (options && !_.isEmpty(_.keys(options))) {
      this._options = options;
    }
  }

  setOption(key: string, value: any) {
    if (!this._options) {
      this._options = {};
    }
    _.set(this._options, key, value);
  }

  get name() {
    return this.className;
  }

  get storingName() {
    let name = _.get(this._options, 'name', this.className);
    return _.snakeCase(name);
  }

  set storingName(v: string) {
    _.set(this._options, 'name', v);
  }

  hasName() {
    return _.has(this._options, 'name');
  }

  setSchemas(s: string[]) {
    s.forEach((s: string) => {
      this.setSchema(s);
    })
  }

  setSchema(s: string) {
    this.schema = s;
    /*
    if (this.schema.length == 1 && this.schema[0] == XS_DEFAULT_SCHEMA) {
      this.schema = [s];
    } else {
      this.schema.push(s);
    }
    */

  }

  getSchema(): string {
    return this.schema;
    /*
    if (this.schema.length == 1) {
      return this.schema[0];
    } else {
      return this.schema;
    }*/
  }

  /*
  schemaName(){
    return this.schemas.join('')
  }*/

  inMultipleSchemas() {
    return this.schema.length > 1;
  }

  get machineName() {
    return _.snakeCase(this.className);
  }

  getClass(create: boolean = false): Function {
    if (_.isFunction(this.originalValue)) {
      return this.originalValue;
    } else if (_.isString(this.originalValue) && this.isPlaceholder) {
      if (create) {
        this.originalValue = SchemaUtils.clazz(this.originalValue);
        return this.originalValue;
      }
    }
    throw new NotYetImplementedError('getClass for ' + this.originalValue);

  }


  static find(klass: string | Function, registryName: string = XS_DEFAULT): ClassRef {
    let name = ClassUtils.getClassName(klass);
    let classRef = LookupRegistry.$(registryName).find<ClassRef>(XS_TYPE_CLASS_REF, (c: ClassRef) => c.className == name);
    return classRef;
  }


  static get(klass: string | Function, registryName: string = XS_DEFAULT): ClassRef {
    let classRef = this.find(klass, registryName);
    if (classRef) {
      if (classRef.isPlaceholder && _.isFunction(klass)) {
        classRef.updateClass(klass);
      }
      return classRef;
    }
    classRef = new ClassRef(klass);
    classRef.lookupRegistry = registryName;
    let binding = Binding.create(XS_TYPE_SCHEMA, XS_DEFAULT_SCHEMA, XS_TYPE_CLASS_REF, classRef);
    LookupRegistry.$(registryName).add(binding.bindingType, binding);
    return LookupRegistry.$(registryName).add(XS_TYPE_CLASS_REF, classRef);
  }

  getLookupRegistry() {
    return LookupRegistry.$(this.lookupRegistry)
  }


  getEntityRef(): IEntityRef {
    if (!this._cacheEntity) {
      this._cacheEntity = this.getLookupRegistry().find(XS_TYPE_ENTITY, (x: IEntityRef) => x.getClassRef().id() === this.id());
    }
    return this._cacheEntity;
  }


  create<T>(): T {
    return this.new();
  }


  new<T>(): T {
    let klass = this.getClass();
    let instance = Reflect.construct(klass, []);
    Reflect.defineProperty(instance, 'xs:registry', {value: this.lookupRegistry});
    Reflect.defineProperty(instance, 'xs:schema', {value: this.getSchema()});
    Reflect.defineProperty(instance, 'xs:name', {value: this.className});
    return instance;
  }


  getPropertyRefs(): IPropertyRef[] {
    return this.getLookupRegistry().filter(XS_TYPE_PROPERTY, (e: IPropertyRef) => e.getSourceRef().getClass() === this.getClass());
  }

  getPropertyRef(name: string): IPropertyRef {
    return this.getLookupRegistry().find(XS_TYPE_PROPERTY, (e: IPropertyRef) => e.getSourceRef().getClass() === this.getClass() && e.name === name);
  }

  id() {
    return [this.schema, this.name].join(XS_ID_SEPARATOR);
  }

  build<T>(data: any, options: IBuildOptions = {}): T {
    return <T>SchemaUtils.transform(this, data, options);
  }


  toJson(follow?: boolean): IClassRefMetadata {
    let meta: IClassRefMetadata = {
      schema: this.getSchema(),
      className: this.name,
      isEntity: this.isEntity,
      options: this._options,
    };

    if (!this.isEntity && follow) {
      meta.properties = [];
      this.getPropertyRefs().forEach(prop => {
        meta.properties.push(prop.toJson());
      })
    }

    return meta;
  }
}
