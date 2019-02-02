

export interface IBaseRef {

  /**
   * Original class name
   */
  name: string;

  /**
   * Name for backend system
   */
  storingName: string;

  /**
   * Name for processing and identifing
   */
  machineName:string;

  /**
   * Unique identifier
   */
  id(): string;

}
