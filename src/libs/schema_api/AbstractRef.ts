import * as _ from 'lodash';
import {XS_DEFAULT, XS_TYPE} from "./Constants";
import {ClassRef} from "./ClassRef";
import {LookupRegistry} from "./LookupRegistry";


export abstract class AbstractRef {

  private readonly _baseType: XS_TYPE;

  private _lookupRegistry: string = XS_DEFAULT;

  readonly name: string;

  private _options: any = {};

  readonly object: ClassRef;


  constructor(type: XS_TYPE, name: string, object: ClassRef | Function | string = null, lookupRegistry: string = XS_DEFAULT) {
    this._lookupRegistry = lookupRegistry;
    this._baseType = type;
    this.name = name;
    if (object instanceof ClassRef) {
      this.object = object;
    } else {
      this.object = object ? ClassRef.get(object, this._lookupRegistry) : null;
    }
  }


  getLookupRegistry() {
    return LookupRegistry.$(this._lookupRegistry)
  }


  getSourceRef() {
    return this.object;
  }


  setOptions(opts: any) {
    if (opts && !_.isEmpty(Object.keys(opts))) {
      this._options = opts;
    }
  }


  setOption(key: string, value: any) {
    if (!this._options) {
      this._options = {};
    }
    _.set(this._options, key, value);
  }


  getClassRef() {
    return this.object;
  }


  getClass(create: boolean = false) {
    return this.getClassRef().getClass(create);
  }


  get machineName() {
    return _.snakeCase(this.name);
  }


  get storingName() {
    let name = this.getOptions('name');
    if (!name) {
      name = _.snakeCase(this.name);
    }
    return name;
  }


  get baseType() {
    return this._baseType;
  }


  getOptions(key: string = null, defaultValue: any = null) {
    if (key) {
      return _.get(this._options, key, defaultValue);
    }
    return this._options;
  }


  abstract id(): string | string[];


  toJson() {
    let options = _.cloneDeep(this.getOptions());
    let o: any = {
      id: this.id(),
      name: this.name,
      type: this.baseType,
      machineName: this.machineName,
      options: options
    };
    return o;
  }

}



