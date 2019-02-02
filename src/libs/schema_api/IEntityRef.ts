import {IPropertyRef} from "./IPropertyRef";
import {IClassRef} from "./IClassRef";
import {IBuildOptions} from "./IBuildOptions";
import {IBaseRef} from "./IBaseRef";
import {IEntityRefMetadata} from "./IEntityRefMetadata";

export interface IEntityRef extends IBaseRef {

  getPropertyDef(name: string): IPropertyRef;

  getPropertyDefs(): IPropertyRef[];

  getClassRef(): IClassRef;

  create<T>(): T;

  build<T>(instance: any, options?: IBuildOptions): T;

  toJson(follow?:boolean): IEntityRefMetadata;

}
