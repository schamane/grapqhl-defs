/* eslint-disable @typescript-eslint/ban-types */
import { defaults, has, get, head, isArray, isObject, map, isEmpty, toString } from 'lodash';
import { Filter, FilterOperator, QueryFieldsType, GraphqlQueryType, QueryFieldObject } from '@schamane/small-graphql-mongoose-middleware';
import { FilterValueValidatorError, UnknowFilterOperatorError } from './errors';
import { translateField } from './translate';

type OperatorFunctions = { [key: string]: (name: string, value: unknown) => {} };

const resolution = (name: string, value: unknown, op: string): {} => (op ? { [name]: { [op]: value } } : { [name]: value });

const toQueryOperation = (name: string, value: unknown, op: string = undefined): {} => {
  if (isArray(value)) {
    return {
      [GraphqlQueryType.OR]: map(value, (x: unknown) => resolution(name, x, op))
    };
  }
  return resolution(name, value, op);
};

const processOperator: OperatorFunctions = {
  [FilterOperator.EQ]: (name, value) => toQueryOperation(name, value),
  [FilterOperator.NE]: (name, value) => toQueryOperation(name, value, '$ne'),
  [FilterOperator.GT]: (name, value) => toQueryOperation(name, value, '$gt'),
  [FilterOperator.GTE]: (name, value) => toQueryOperation(name, value, '$gte'),
  [FilterOperator.LT]: (name, value) => toQueryOperation(name, value, '$lt'),
  [FilterOperator.LTE]: (name, value) => toQueryOperation(name, value, '$lte'),
  [FilterOperator.CONTAINS]: (name, value) => {
    if (isArray(value)) {
      throw new FilterValueValidatorError('Value for CONTAINS operator cant be an Array');
    }

    return { [name]: { $regex: value, $options: 'i' } };
  },
  [FilterOperator.IN]: (name, value) => {
    if (!isArray(value)) {
      throw new FilterValueValidatorError('Value for IN operator should be an Array');
    }
    if (isArray(value) && isEmpty(value)) {
      // switch to equals
      return processOperator[FilterOperator.EQ](name, head(value));
    }
    return resolution(name, value, '$in');
  },
  [FilterOperator.NIN]: (name, value) => {
    if (!isArray(value)) {
      throw new FilterValueValidatorError('Value for IN operator should be an Array');
    }
    if (isArray(value) && isEmpty(value)) {
      // switch to equals
      return processOperator[FilterOperator.NE](name, head(value));
    }
    return resolution(name, value, '$nin');
  }
};

export const mapFilter = (filter: Filter, fieldTranslations: QueryFieldsType): {} => {
  const translateOperation = (name: string, filterOperator: FilterOperator, value: unknown): {} => {
    const translateNames = translateField(name, fieldTranslations) as QueryFieldObject;
    // default filterOperator
    if (!has(processOperator, filterOperator)) {
      throw new UnknowFilterOperatorError('UnknowFilterOperatorError');
    }

    if (isObject(translateNames)) {
      // use first value as query type
      const { type, fields } = translateNames;
      return {
        [type]: map(fields, (x: string) => processOperator[filterOperator](x, value))
      };
    }

    return processOperator[filterOperator](toString(translateNames), value);
  };

  const field = filter ? translateOperation(filter.name, filter.operator, filter.value) : undefined;

  return field;
};

export const filterToQuery = (filter: Filter, fieldTranslations: QueryFieldsType): {} => mapFilter(filter, fieldTranslations);

export const filtersToQuery = (filters: Filter[], fieldTranslations: QueryFieldsType): {}[] =>
  defaults.apply(
    {},
    map(filters, (filter: Filter) => mapFilter(filter, fieldTranslations))
  );

export const translateSorter = (field: string, fieldTranslations: QueryFieldsType): string | string[] => {
  if (has(fieldTranslations, field)) {
    const q = get(fieldTranslations, field);
    return isObject(q) ? q.fields : q;
  }
  return field;
};

export const translationsFieldPath = (field: string): string => `${field}.translations`;
export const translatedFieldLanguagePath = (field: string): string => `${field}.translations.language`;
export const translationsFieldStringPath = (attribute: string): string => `${attribute}[0].translations`;

export const languageFilter = (attribute: string, language: string): Record<string, unknown> => ({
  [`${translatedFieldLanguagePath(attribute)}`]: language
});
