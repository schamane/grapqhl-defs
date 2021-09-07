export enum FilterOperator {
  EQ = 'eq',
  NE = 'ne',
  LT = 'lt',
  LTE = 'lte',
  GT = 'gt',
  GTE = 'gte',
  BT = 'bt',
  CONTAINS = 'contains',
  IN = 'in',
  NIN = 'nin'
}

export interface SortObject {
  [key: string]: string;
}

type FilterValue = boolean | number | string | number[] | string[];

export interface Filter {
  operator: FilterOperator;
  name: string;
  value: FilterValue;
}

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc'
}

export interface Sorter {
  name: string;
  direction: SortDirection;
}

export enum GraphqlQueryType {
  AND = '$and',
  OR = '$or'
}

export type QueryFieldObject = {
  type?: GraphqlQueryType;
  fields: string[];
};

export type QueryFields = QueryFieldObject | string;

export type QueryFieldsType = { [key: string]: QueryFields };
