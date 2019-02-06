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
  machineName: string;

  /**
   * Unique identifier
   */
  id(): string;


  /**
   * Return some options
   */
  getOptions(key?: string): any;

  /**
   * Set some option
   */
  setOption(key: string, value: any): void;

  /**
   * Set options
   */
  setOptions(value: any): void;

}
