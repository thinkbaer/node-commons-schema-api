import * as _ from "lodash";
import {ClassRef} from "./ClassRef";
import {XS_ANNOTATION_OPTIONS_CACHE, XS_TYPE_ENTITY, XS_TYPE_PROPERTY} from "./Constants";
import {IClassRef} from "./IClassRef";

import {MetaArgs} from "commons-base/browser";
import {IEntityRef} from "./IEntityRef";
import {IPropertyExtentions} from "./IPropertyExtentions";


export class AnnotationsHelper {

  static forPropertyOn(object: IClassRef, property: string, options: any) {
    let prop = object.getPropertyRef(property);
    if(prop){
      let pOptions = prop.getOptions();
      _.defaults(pOptions,options);
    }else{
      // cache for use by property constructor
      MetaArgs.key(XS_ANNOTATION_OPTIONS_CACHE).push(<IPropertyExtentions>{
        type: XS_TYPE_PROPERTY,
        object: object,
        property: property,
        options: options
      })
    }
  }

  static forEntityOn(object: ClassRef, options: any) {
    let ent = <IEntityRef>object.getEntityRef();
    if(ent){
      let pOptions = ent.getOptions();
      _.defaults(pOptions,options);
    }else{
      // cache for use by entity constructor
      MetaArgs.key(XS_ANNOTATION_OPTIONS_CACHE).push(<IPropertyExtentions>{
        type: XS_TYPE_ENTITY,
        object: object,
        options: options
      })
    }
  }

  static merge(object: IClassRef, options: any, property: string = null) {
    let addOns = _.remove(MetaArgs.key(XS_ANNOTATION_OPTIONS_CACHE), (x: IPropertyExtentions) =>
      property ?
        x.object === object &&
        x.property === property &&
        x.type == XS_TYPE_PROPERTY :
        x.object === object &&
        x.type == XS_TYPE_ENTITY
    );

    if (addOns) {
      addOns.forEach(addOn => {
        _.defaults(options, addOn.options)
      })
    }
  }
}
