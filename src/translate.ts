import { get } from 'lodash';
import { QueryFields, QueryFieldsType } from './models/filter';

export const translateField = (key: string, Translations: QueryFieldsType): QueryFields => get(Translations, key, key);
