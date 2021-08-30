import { GraphQLScalarType, ValueNode } from 'graphql';

type FilterValue = boolean | number | string | number[] | string[];

export const FilterValueScalarType = new GraphQLScalarType({
  name: 'FilterValue',

  description: 'The `FilterValue` scalar represents a string, number, or array of strings or numbers',

  serialize(value: unknown): unknown {
    return value;
  },

  parseValue(value: unknown): FilterValue {
    return value as FilterValue;
  },

  parseLiteral(ast: ValueNode): FilterValue {
    return ast as unknown as FilterValue;
  }
});
