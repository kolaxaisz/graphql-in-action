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
    tags: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString))),
      resolve: (source) => source.tags.split(',')
    },
    approachCount: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (source => {
        return source.createdAt.toISOString()
      })
    }
  }
})

export default Task