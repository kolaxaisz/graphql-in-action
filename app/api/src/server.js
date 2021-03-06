import {graphqlHTTP} from "express-graphql"
import {schema} from './schema'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import pgApiWrapper from './db/pg-api'

import * as config from './config'

async function main() {
  const pgApi = await pgApiWrapper()
  const server = express()
  server.use(cors())
  server.use(morgan('dev'))
  server.use(bodyParser.urlencoded({extended: false}))
  server.use(bodyParser.json())
  server.use('/:fav.ico', (req, res) => res.sendStatus(204))

  server.use('/', graphqlHTTP({
    schema,
    context: {pgApi},
    graphiql: true,
    customFormatErrorFn: (error) => {
      const errorReport = {
        message: error.message,
        locations: error.locations,
        stack: error.stack ? error.stack.split('\n') : [],
        path: error.path
      }
      console.error('GraphQL Error', errorReport)

      return config.isDev
        ? errorReport
        : {
          message: 'Oops! Something went wrong! :('
        }
    }
  }))

  // Run the server
  server.listen(config.port, () => {
    console.log(`Server URL: http://localhost:${config.port}/`)
  })
}

main()


