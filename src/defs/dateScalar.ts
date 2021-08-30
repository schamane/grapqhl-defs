import { gql } from 'apollo-server-express';
import { DateScalarType, UTCDateTimeScalarType } from './models';

const typeDef = gql`
  scalar Date
  scalar UCTDateTime
`;

const resolvers = {
  Date: DateScalarType,
  UCTDateTime: UTCDateTimeScalarType
};

export const DateScalarSchema = { typeDef, resolvers };
