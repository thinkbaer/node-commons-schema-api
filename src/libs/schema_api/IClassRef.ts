import {IPropertyRef} from "./IPropertyRef";
import {IBuildOptions} from "./IBuildOptions";
import {IClassRefMetadata} from "./IClassRefMetadata";
import {IBaseRef} from "./IBaseRef";

export interface IClassRef extends IBaseRef {


  getClass(create?: boolean): Function;

  getPropertyDef(name: string): IPropertyRef;

  getPropertyDefs(): IPropertyRef[];

  create<T>(): T;

  build<T>(instance: any, options?: IBuildOptions): T;

  toJson(withProperties?: boolean): IClassRefMetadata;
}
