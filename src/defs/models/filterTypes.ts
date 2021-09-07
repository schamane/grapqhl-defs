import { Filter, Sorter } from '../../models/filter';

export interface FilterContext {
  filters?: Filter[];
  sort?: Sorter;
  pages?: number;
}
