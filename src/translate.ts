import { get } from 'lodash-es';
import { QueryFields, QueryFieldsType } from './models/filter';

export const translateField = (key: string, Translations: QueryFieldsType): QueryFields => get(Translations, key, key);
