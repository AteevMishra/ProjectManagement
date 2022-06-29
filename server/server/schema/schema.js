const { projects, clients } = require("../sampleData");
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} = require("graphql");

//Client type
const ClientType = new GraphQLObjectType({
  name: "Client",

  //'fields' is a function that returns an object
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

//Project type
const ProjectType = new GraphQLObjectType({
  name: "Project",

  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",

  fields: {
    //To get a single client
    client: {
      //to get the data of ClientType we will provide 'args' on front-end
      type: ClientType,
      args: { id: { type: GraphQLID } }, // take 'id' as argument

      //'resolve' function returns the data that the user wants
      resolve(parent, args) {
        return clients.find((client) => client.id == args.id); //returns data if the id provided by user(args.id) matches id in client in array
      },
    },

    //To get all clients
    clients: {
      type: new GraphQLList(ClientType),

      resolve(parent, args) {
        return clients;
      },
    },

    //To get a single Project
    project: {
      //to get the data of ClientType we will provide 'args' on front-end
      type: ProjectType,
      args: { id: { type: GraphQLID } }, // take 'id' as argument

      //'resolve' function returns the data that the user wants
      resolve(parent, args) {
        return projects.find((client) => projects.id == args.id); //returns data if the id provided by user(args.id) matches id in client in array
      },
    },

    //To get all Projects
    projects: {
      type: new GraphQLList(ProjectType),

      resolve(parent, args) {
        return projects;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
