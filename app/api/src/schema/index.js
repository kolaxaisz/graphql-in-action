import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} from "graphql"
import NumbersInRange from './types/numbers-in-range'
import {numbersInRangeObject} from '../utils'

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    currentTime: {
      type: GraphQLString,
      resolve: () => {
        const isoString = new Date().toISOString()

        return isoString.slice(11, 19)
      }
    },
    sumNumbersInRange: {
      type: new GraphQLNonNull(GraphQLInt),
      args: {
        begin: {
          type: new GraphQLNonNull(GraphQLInt),
        },
        end: {
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
      resolve: (source, {begin, end}) => {
        let sum = 0;
        for (let i = begin; i <= end; i++) {
          sum += i;
        }

        return sum;
      }
    },
    numbersInRange: {
      type: NumbersInRange,
      args: {
        begin: {type: new GraphQLNonNull(GraphQLInt)},
        end: {type: new GraphQLNonNull(GraphQLInt)}
      },
      resolve: (source, {begin, end}) => {
        return numbersInRangeObject(begin, end)
      }
    }
  }
})

export const schema = new GraphQLSchema({
  query: QueryType
})


