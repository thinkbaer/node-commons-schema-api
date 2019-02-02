import {IEntityRef} from "./IEntityRef";
import {IClassRef} from "./IClassRef";

export interface IBuildOptions {
  beforeBuild?: (entityDef: IEntityRef | IClassRef, from: any, to: any) => void
  afterBuild?: (entityDef: IEntityRef | IClassRef, from: any, to: any) => void
}
