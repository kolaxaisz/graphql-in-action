import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql'

const Task = new GraphQLObjectType({
  name: 'Task',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    content: {
      type: new GraphQLNonNull(GraphQLString)
    },
    tag: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString)))
    },
    approachCount: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (source => {
        return source.createdAt
      })
    }
  }
})

export default Task