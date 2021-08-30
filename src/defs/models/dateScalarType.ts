import { GraphQLScalarType, StringValueNode } from 'graphql';
import { formatISO, isValid, parseISO } from 'date-fns';

export const DateScalarType = new GraphQLScalarType({
  name: 'Date',

  description: 'The `DateTime` scalar represents a date and time following the ISO 8601 standard',

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  serialize(value: any): any {
    return value;
  },

  parseValue(value): string {
    if (!isValid(parseISO(value))) {
      throw new TypeError(`DateTime must be in a recognized RFC2822 or ISO 8601 format ${String(value)}.`);
    }

    return formatISO(parseISO(value));
  },

  parseLiteral(ast: StringValueNode): string {
    return formatISO(parseISO(ast.value));
  }
});
