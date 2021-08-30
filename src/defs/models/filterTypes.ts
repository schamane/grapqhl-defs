import { Filter, Sorter } from '@schamane/small-graphql-mongoose-middleware';

export interface FilterContext {
  filters?: Filter[];
  sort?: Sorter;
  pages?: number;
}
