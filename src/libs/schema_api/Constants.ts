export const XS_DEFAULT = 'default';

export const XS_TYPE_SCHEMA = 'schema';
export const XS_TYPE_ENTITY = 'entity';
export const XS_TYPE_CLASS_REF = 'class_ref';
export const XS_TYPE_PROPERTY = 'property';
export const XS_TYPE_BINDING_SCHEMA_ENTITY = 'schema_entity';
export const XS_TYPE_BINDING_SCHEMA_CLASS_REF = 'schema_class_ref';

export type XS_TYPE =
  'schema'
  | 'entity'
  | 'property'
  | 'class_ref'
  | 'schema_entity'
  | 'entity_property'
  | 'property_entity'
  | 'schema_class_ref';

export type XS_DATA_TYPES = 'string' | 'number' | 'boolean' | 'entity' | 'array' | 'any' ;
export const XS_ID_SEPARATOR = '--';

export const XS_DEFAULT_SCHEMA = 'default';

export type ClassType<T> = { new (...args: any[]): T; };

export type JS_DATA_TYPES = 'string' | 'text' | 'number' | 'boolean' | 'double' | 'json' | 'date' | 'time' | 'datetime' | 'timestamp' | 'byte';

export const XS_ANNOTATION_OPTIONS_CACHE = 'anno_options_cache';
