import { get } from 'lodash';
import type { QueryFields, QueryFieldsType } from '@schamane/small-graphql-mongoose-middleware';

export const translateField = (key: string, Translations: QueryFieldsType): QueryFields => get(Translations, key, key);
