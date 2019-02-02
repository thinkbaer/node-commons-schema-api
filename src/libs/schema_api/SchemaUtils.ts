import {IEntityRef} from "./IEntityRef";
import {IClassRef} from "./IClassRef";
import * as _ from "lodash";
import {NotYetImplementedError} from "commons-base/browser";
import {IBuildOptions} from "./IBuildOptions";

export class SchemaUtils {

  static transform(entityDef: IEntityRef | IClassRef, data: any, options: IBuildOptions = {}) {
    let object = entityDef.create();
    if (options.beforeBuild) {
      options.beforeBuild(entityDef, data, object)
    }
    for (let p of entityDef.getPropertyDefs()) {
      if ((_.isNull(data[p.name]) || _.isUndefined(data[p.name]))) {
        //object[p.name] = null;
        continue;
      }
      if (p.isReference()) {
        let ref = p.isEntityReference() ? p.getEntityRef() : p.getTargetRef();
        if (p.isCollection()) {
          object[p.name] = [];
          for (let i = 0; i < data[p.name].length; i++) {
            object[p.name][i] = ref.build(data[p.name][i], options);
          }
        } else {
          object[p.name] = ref.build(data[p.name], options);
        }
      } else {
        if (p.isCollection() && (_.isArray(data[p.name]) || _.isSet(data[p.name]))) {
          object[p.name] = [];
          for (let i = 0; i < data[p.name].length; i++) {
            let v = data[p.name][i];
            if (v) {
              object[p.name][i] = p.convert(v);
            } else {
              object[p.name][i] = null;
            }
          }
        } else if (p.isCollection() && !(_.isArray(data[p.name]) || _.isSet(data[p.name]))) {
          throw new NotYetImplementedError();
        } else {
          object[p.name] = p.convert(data[p.name]);
        }
      }
    }
    if (options.afterBuild) {
      options.afterBuild(entityDef, data, object)
    }
    return object;

  }

  static clazz(str: string): Function {
    function X() {
    }

    Object.defineProperty(X, 'name', {value: str});
    return X;
  }


}
