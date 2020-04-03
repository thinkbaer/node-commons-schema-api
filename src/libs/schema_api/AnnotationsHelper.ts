import * as _ from 'lodash';
import {ClassRef} from './ClassRef';
import {XS_ANNOTATION_OPTIONS_CACHE, XS_TYPE_ENTITY, XS_TYPE_PROPERTY} from './Constants';
import {IClassRef} from './IClassRef';

import {MetaArgs} from 'commons-base/browser';
import {IPropertyExtentions} from './IPropertyExtentions';


export class AnnotationsHelper {

  static forPropertyOn(object: Function, property: string, options: any) {
    const source = object.constructor;
    const classRefs: ClassRef[] = ClassRef.filter(c => c.originalValue === source);

    for (const ref of classRefs) {
      let prop = ref.getPropertyRef(property);
      if (prop) {
        const pOptions = prop.getOptions();
        _.defaults(pOptions, options);
      }
    }

    MetaArgs.key(XS_ANNOTATION_OPTIONS_CACHE).push(<IPropertyExtentions>{
      type: XS_TYPE_PROPERTY,
      object: source,
      property: property,
      options: options
    });
  }


  static forEntityOn(object: Function, options: any) {
    const classRefs: ClassRef[] = ClassRef.filter(c => c.originalValue === object);

    for (const ref of classRefs) {
      if (ref) {
        let pOptions = ref.getOptions();
        _.defaults(pOptions, options);
      }
    }

    MetaArgs.key(XS_ANNOTATION_OPTIONS_CACHE).push(<IPropertyExtentions>{
      type: XS_TYPE_ENTITY,
      object: object,
      options: options
    });
  }

  static merge(classRef: IClassRef, options: any, property: string = null) {
    const object = classRef.getClass();
    let addOns = _.filter(MetaArgs.key(XS_ANNOTATION_OPTIONS_CACHE), (x: IPropertyExtentions) =>
      property ?
        x.object === object &&
        x.property === property &&
        x.type == XS_TYPE_PROPERTY :
        x.object === object &&
        x.type == XS_TYPE_ENTITY
    );

    if (addOns) {
      addOns.forEach(addOn => {
        _.defaults(options, addOn.options);
      });
    }
  }
}
