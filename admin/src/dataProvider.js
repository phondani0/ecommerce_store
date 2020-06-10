// in src/dataProvider.js
import {
  buildQuery
} from 'ra-data-graphql-simple';
import gql from 'graphql-tag'

const myBuildQuery = introspection => (fetchType, resource, params) => {
  const builtQuery = buildQuery(introspection)(fetchType, resource, params);
  console.log(fetchType, resource, params);

  if (resource === 'User' && fetchType === 'GET_ONE') {
    console.log(fetchType, resource, params);
    // let _id = +params.id;
    return {
      // Use the default query variables and parseResponse
      ...builtQuery,
      // Override the query
      query: gql `
                query User($id: Int!) {
                  data: User(id: $id) {
                      id
                      first_name
                      last_name
                      email
                      mobile
                      created_at
                      updated_at    
                    }              
                }`,
      variables: {
        id: parseInt(params.id)
      }
    };
  }

  return builtQuery;
};

export default myBuildQuery