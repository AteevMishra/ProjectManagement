const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
require("dotenv").config();

const port = process.env.PORT || 5000;

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development", //We want to run 'graphiql' only when in development mode, else equate it to 'true'
  })
);

app.listen(port, console.log(`Server is running on port ${port}`));
