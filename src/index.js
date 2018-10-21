//! USING GRAPHQL-YOGA
import { GraphQLServer, PubSub } from "graphql-yoga";

//! USING DUMMY DB
import db from "./db";

//! USING GRAPHQL
import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";
import Subscription from "./resolvers/Subscription";
import User from "./resolvers/User";
import Post from "./resolvers/Post";
import Comment from "./resolvers/Comment";

//! USING PRISMA
import "./prisma";

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: {
    Query,
    Mutation,
    Subscription,
    User,
    Post,
    Comment
  },
  context: {
    db,
    pubsub
  }
});

server.start(() => {
  console.log("Serving running on localhost 4000!");
});
