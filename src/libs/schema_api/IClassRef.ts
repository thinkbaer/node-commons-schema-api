import {IPropertyRef} from "./IPropertyRef";
import {IBuildOptions} from "./IBuildOptions";
import {IClassRefMetadata} from "./IClassRefMetadata";
import {IBaseRef} from "./IBaseRef";
import {ILookupRegistry} from "./ILookupRegistry";

export interface IClassRef extends IBaseRef {


  getClass(create?: boolean): Function;

  getPropertyRef(name: string): IPropertyRef;

  getPropertyRefs(): IPropertyRef[];

  create<T>(): T;

  build<T>(instance: any, options?: IBuildOptions): T;

  toJson(withProperties?: boolean): IClassRefMetadata;

}
