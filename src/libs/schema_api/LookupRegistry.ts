import * as _ from 'lodash';
import {XS_DEFAULT, XS_TYPE} from "./Constants";

export class LookupRegistry {

  private static $self: { [name: string]: LookupRegistry } = {};

  private name: string = XS_DEFAULT;

  private _entries: { [context: string]: any[] } = {};

  constructor(name: string) {
    this.name = name;
  }

  getName(): string {
    return this.name;
  }

  static reset(name: string = XS_DEFAULT): void {
    if (this.$self[name]) {
      this.$self[name] = null;
    }
  }

  static $(name: string = XS_DEFAULT): LookupRegistry {
    if (!this.$self[name]) {
      this.$self[name] = new LookupRegistry(name);
    }
    return this.$self[name];
  }

  list(context: XS_TYPE) {
    if (!_.has(this._entries, context)) {
      this._entries[context] = [];
    }
    return this._entries[context];
  }

  add<T>(context: XS_TYPE, entry: T): T {
    if (!_.has(this._entries, context)) {
      this._entries[context] = [];
    }
    this._entries[context].push(entry);
    return entry;
  }

  remove<T>(context: XS_TYPE, search: any): T[] {
    if (!_.has(this._entries, context)) {
      this._entries[context] = [];
    }
    return _.remove<T>(this._entries[context], search);
  }

  filter<T>(context: XS_TYPE, search: any): T[] {
    if (!_.has(this._entries, context)) {
      this._entries[context] = [];
    }
    return _.filter(this._entries[context], search);
  }

  find<T>(context: XS_TYPE, search: any): T {
    if (!_.has(this._entries, context)) {
      this._entries[context] = [];
    }
    return _.find(this._entries[context], search);
  }


}
