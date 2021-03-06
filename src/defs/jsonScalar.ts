import { gql } from 'apollo-server-express';
import { GraphQLJSON, GraphQLJSONObject } from 'graphql-scalars';

const typeDef = gql`
  scalar JSON
  scalar JSONObject
`;

const resolvers = {
  JSON: GraphQLJSON,
  JSONObject: GraphQLJSONObject
};

export const JSONScalarSchema = { typeDef, resolvers };
