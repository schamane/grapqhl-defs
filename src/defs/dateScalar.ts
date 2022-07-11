import { gql } from 'apollo-server-express';
import { DateScalarType, UTCDateTimeScalarType } from './models';

const typeDef = gql`
  scalar Date
  scalar UTCDateTime
`;

const resolvers = {
  Date: DateScalarType,
  UTCDateTime: UTCDateTimeScalarType
};

export const DateScalarSchema = { typeDef, resolvers };
