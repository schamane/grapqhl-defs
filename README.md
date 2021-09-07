# Graphql Defs

## Use schema definitions

Add package to your project dependancies

```bash
npm i @schamane/graphql-defs
```

Add exports to your shema index.ts

```typescript
export { SorterScalarSchema, FilterScalarSchema, FilterValueScalarSchema } from '@schamane/graphql-defs';
```

## Example

Use Filters and Sorters with Query

```grapqhl
extend type Query {
    testFilters(filters: [Filter], sort: Sorter): [FilterEntity]!
}
```

Use it in your resolver implementation

```typescript
import { defaultSorter, Filter, Sorter } from '@schamane/graphql-defs';

list(filters: Filter[], sort: Sorter): FilterEntity[] {
    console.log(filters, sort);
    if (sort) {
      console.log('do sort', defaultSorter(this.data, sort));
      return defaultSorter(this.data, sort);
    }
    return this.data;
  }
```
