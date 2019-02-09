import {IClassRef} from "./IClassRef";
import {IEntityRef} from "./IEntityRef";
import {IPropertyRefMetadata} from "./IPropertyRefMetadata";
import {IBaseRef} from "./IBaseRef";

export interface IPropertyRef extends IBaseRef {

  label(): string;

  isIdentifier(): boolean;

  isReference(): boolean;

  isEntityReference(): boolean;

  getEntityRef(): IEntityRef;

  getType(): string;

  getSourceRef(): IClassRef;

  getTargetRef(): IClassRef;

  isCollection(): boolean;

  convert(i: any): any;

  toJson(follow?: boolean): IPropertyRefMetadata;

  get(instance: any): any;
}
