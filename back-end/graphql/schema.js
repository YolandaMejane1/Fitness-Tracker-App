import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Workout {
    id: ID!
    exercise: String!
    reps: String!
    date: String!
  }

  type Query {
    workouts: [Workout]
  }

  type Mutation {
    addWorkout(exercise: String!, reps: String!, date: String!): Workout
  }
`;

export default typeDefs;
