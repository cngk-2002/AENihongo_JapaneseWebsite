import express from "express";
import { ApolloServer } from "apollo-server-express";
import * as dotenv from "dotenv";
import path from "path";
import connectDB from "./config/connection.js";
import { typeDefs, resolvers } from "./schemas/index.js";
import { authMiddleware } from "./utils/auth.js";

dotenv.config();

const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(
    express.static(
      path.join(new URL("../client/dist", import.meta.url).pathname)
    )
  );
}

app.get("*", (req, res) => {
  res.sendFile(
    path.join(new URL("../client/dist/index.html", import.meta.url).pathname)
  );
});

const startServer = async (typeDefs, resolvers) => {
  try {
    await server.start();
    server.applyMiddleware({ app });
    connectDB(process.env.MONGODB_URI); // connect to MongoDB
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  } catch (error) {
    console.log(error);
  }
};

startServer(typeDefs, resolvers);
