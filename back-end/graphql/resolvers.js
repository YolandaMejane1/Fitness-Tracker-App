import Workout from './models/Workout.js';  

const resolvers = {
  Query: {
    workouts: async () => {
      return await Workout.find();  
    },
  },
  Mutation: {
    addWorkout: async (_, { exercise, reps, date }) => {
      const newWorkout = new Workout({
        exercise,
        reps,
        date,
      });
      await newWorkout.save();  
      return newWorkout;
    },
  },
};
