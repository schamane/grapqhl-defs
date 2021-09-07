import { gql } from 'apollo-server-express';
import { SortDirection } from '../models/filter';

const typeDef = gql`
  enum SorterDirection {
    asc
    desc
  }

  input Sorter {
    name: String!
    direction: SorterDirection
  }
`;

const resolvers = {
  SorterDirection: {
    asc: SortDirection.ASC,
    desc: SortDirection.DESC
  }
};

export const SorterScalarSchema = { typeDef, resolvers };
