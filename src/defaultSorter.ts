import { get, orderBy } from 'lodash';
import { Sorter } from './models/filter';

const toLodashSort = (sortObject: Sorter) => [[get(sortObject, 'name', [])], [get(sortObject, 'direction', [])]] as any[][];

export const defaultSorter = <T>(collection: T[], sorter: Sorter): T[] => orderBy<T>(collection, ...toLodashSort(sorter));
