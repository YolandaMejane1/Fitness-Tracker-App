import React from "react";
import { useNavigate } from "react-router-dom";

const exercises = [
  {
    name: "Push-Up",
    target: "Chest, Triceps, Shoulders",
    image: "https://images.pexels.com/photos/4162491/pexels-photo-4162491.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Bodyweight exercise to build upper body strength."
  },
  {
    name: "Squat",
    target: "Quads, Glutes, Hamstrings",
    image: "https://images.pexels.com/photos/1552249/pexels-photo-1552249.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Compound lower body exercise for strength and power."
  },
  {
    name: "Deadlift",
    target: "Back, Glutes, Hamstrings",
    image: "https://images.pexels.com/photos/2261477/pexels-photo-2261477.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Full-body strength exercise focusing on posterior chain."
  },
  {
    name: "Bench Press",
    target: "Chest, Triceps, Shoulders",
    image: "https://images.pexels.com/photos/3837743/pexels-photo-3837743.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Classic compound movement for upper body strength."
  },
  {
    name: "Pull-Up",
    target: "Back, Biceps",
    image: "https://images.pexels.com/photos/4944441/pexels-photo-4944441.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Bodyweight exercise to strengthen the upper back."
  },
  {
    name: "Lunges",
    target: "Quads, Glutes, Hamstrings",
    image: "https://images.pexels.com/photos/4348637/pexels-photo-4348637.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Lower body unilateral movement to build balance and strength."
  },
  {
    name: "Plank",
    target: "Core",
    image: "https://images.pexels.com/photos/917653/pexels-photo-917653.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Isometric core exercise to improve stability."
  },
  {
    name: "Bicep Curl",
    target: "Biceps",
    image: "https://images.pexels.com/photos/4720772/pexels-photo-4720772.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Isolation movement to strengthen the biceps."
  },
  {
    name: "Tricep Dip",
    target: "Triceps",
    image: "https://images.pexels.com/photos/5496589/pexels-photo-5496589.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Bodyweight exercise targeting triceps."
  },
  {
    name: "Shoulder Press",
    target: "Shoulders, Triceps",
    image: "https://images.pexels.com/photos/7289370/pexels-photo-7289370.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Overhead pressing movement to build shoulder strength."
  },
  {
    name: "Pilates",
    target: "Obliques, Core",
    image: "https://images.pexels.com/photos/14843494/pexels-photo-14843494.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Core exercise focusing on core muscle strength."
  },
  {
    name: "Mountain Climbers",
    target: "Core, Cardio",
    image: "https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Full-body cardio movement that targets the core."
  },
  {
    name: "Leg Press",
    target: "Quads, Glutes, Hamstrings",
    image: "https://images.pexels.com/photos/6539793/pexels-photo-6539793.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Machine-based lower body exercise."
  },
  {
    name: "Calf Raise",
    target: "Calves",
    image: "https://images.pexels.com/photos/8436687/pexels-photo-8436687.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Isolation movement to develop calf muscles."
  },
  {
    name: "Lat Pulldown",
    target: "Back, Biceps",
    image: "https://images.pexels.com/photos/7293692/pexels-photo-7293692.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Machine exercise to build upper back."
  },
  {
    name: "Leg Curl",
    target: "Hamstrings",
    image: "https://images.pexels.com/photos/28731788/pexels-photo-28731788/free-photo-of-woman-exercising-on-leg-curl-machine-in-gym.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Isolation movement to strengthen hamstrings."
  }
];

const Exercises = () => {
  const navigate = useNavigate();

  const handleCardClick = (exerciseName) => {
    navigate(`/logworkout?exercise=${encodeURIComponent(exerciseName)}`);
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1667781838690-5f32ea0ccea6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-80"></div>
      <div className="pt-24 px-4 max-w-7xl mx-auto relative z-10">
        <h2 className="text-4xl font-bold text-center mb-10 text-white">Exercises For You</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {exercises.map((exercise, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(exercise.name)}
              className="cursor-pointer bg-red-800 bg-opacity-80 backdrop-blur-md rounded-2xl shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105"
            >
              <img
                src={exercise.image}
                alt={exercise.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-white mb-1">
                  {exercise.name}
                </h3>
                <p className="text-sm text-white mb-1">
                  <strong>Target:</strong> {exercise.target}
                </p>
                <p className="text-sm text-white">{exercise.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Exercises;