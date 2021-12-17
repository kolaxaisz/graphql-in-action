import {
  GraphQLInt, GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  printSchema
} from "graphql"
import NumbersInRange from './types/numbers-in-range'
import {numbersInRangeObject} from '../utils'
import Task from './types/task'

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
        let sum = 0
        for (let i = begin; i <= end; i++) {
          sum += i
        }

        return sum
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
    },
    taskMainList: {
      type: new GraphQLList(new GraphQLNonNull(Task)),
      resolve: async (source, args, {pgPool}) => {
        const pgResp = await pgPool.query(`
          select id, content, tags, approach_count, created_at
          from azdev.tasks
          where is_private = false
          order by created_at desc
          limit 100`
        )

        return pgResp.rows
      }
    }
  }
})

export const schema = new GraphQLSchema({
  query: QueryType
})

console.log(printSchema(schema))


