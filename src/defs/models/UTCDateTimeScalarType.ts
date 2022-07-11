import { GraphQLScalarType, StringValueNode } from 'graphql';
import { formatISO, isValid, parseJSON } from 'date-fns';

export const UTCDateTimeScalarType = new GraphQLScalarType({

  description: 'The `DateTime` scalar represents a date and time following the ISO 8601 standard',

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  serialize(value: any): any {
    return value;
  },

  parseValue(value: number | Date): string {
    if (!isValid(isValid)) {
      throw new TypeError(`DateTime must be in a recognized RFC2822 or ISO 8601 format ${String(value)}.`);
    }

    return formatISO(value);
  },

  parseLiteral(ast: StringValueNode): string {
    return formatISO(parseJSON(ast.value));
  }
});
