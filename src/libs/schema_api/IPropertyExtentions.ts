import {XS_TYPE} from "./Constants";
import {IClassRef} from "./IClassRef";

export interface IPropertyExtentions {
  type: XS_TYPE,
  object: IClassRef,
  property?: string,
  options: any

}
