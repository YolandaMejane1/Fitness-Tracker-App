import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import workoutRoutes from "./routes/workoutRoutes.js";
import cors from "cors";
import { ApolloServer } from "apollo-server-express"; 
import typeDefs from "./graphql/schema.js"; 
import resolvers from "./graphql/resolvers.js"; 

dotenv.config();
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
await server.start();
server.applyMiddleware({ app });

app.use("/api/workouts", workoutRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`GraphQL ready at http://localhost:${PORT}${server.graphqlPath}`);
});
