import { gql } from 'apollo-server-express';
import { FilterOperator } from '../models/filter';

const typeDef = gql`
  enum FilterOperator {
    EQ
    NE
    LT
    LTE
    GT
    GTE
    BT
    CONTAINS
    IN
    NIN
  }

  input Sorter {
    name: String!
    direction: SorterDirection
  }

  input Filter {
    operator: FilterOperator!
    name: String!
    value: FilterValue!
  }
`;

const resolvers = {
  FilterOperator: {
    EQ: FilterOperator.EQ,
    NE: FilterOperator.NE,
    LT: FilterOperator.LT,
    LTE: FilterOperator.LTE,
    GT: FilterOperator.GT,
    GTE: FilterOperator.GTE,
    BT: FilterOperator.BT,
    CONTAINS: FilterOperator.CONTAINS,
    IN: FilterOperator.IN,
    NIN: FilterOperator.NIN
  }
};

export const FilterScalarSchema = { typeDef, resolvers };
