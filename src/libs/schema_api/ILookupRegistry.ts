import {IEntityRef} from "./IEntityRef";
import {IPropertyRef} from "./IPropertyRef";


export interface ILookupRegistry {

  getEntityRefFor(fn: any): IEntityRef;

  getPropertyRefsFor(fn: any): IPropertyRef[];

  fromJson(json: any): IEntityRef;
}
