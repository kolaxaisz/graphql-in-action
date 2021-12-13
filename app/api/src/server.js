import {graphql} from "graphql";
import {schema, rootValue} from './schema'

const executeGraphQLRequest = async (source) => {
  try {
    const resp = await graphql(schema, source, rootValue);
    console.log(resp.data);
  } catch (e) {
    console.error(e);
  }
}

executeGraphQLRequest(process.argv[2]);