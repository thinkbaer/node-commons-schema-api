import {IEntityRef} from "./IEntityRef";
import {IClassRef} from "./IClassRef";

export interface IBuildOptions {
  beforeBuild?: (entityRef: IEntityRef | IClassRef, from: any, to: any) => void
  afterBuild?: (entityRef: IEntityRef | IClassRef, from: any, to: any) => void
}
