import React, { useState, useEffect }  from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="pt-18 overflow-x-hidden">
      <section className="relative h-screen flex">
  <div className="w-1/2 h-full pt-0 mt-0 top-0">
    <img
      src="https://images.unsplash.com/photo-1653276526709-c424ad920de6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDh8fHJlZCUyMGd5bSUyMHBlcnNvbnxlbnwwfDF8MHx8fDA%3D"
      alt="Left image"
      className="w-full h-full object-cover"
    />
  </div>

  <div className="w-1/2 h-full relative">
  <div className="fixed right-0 w-1/2 h-screen z-0">
    <div className="absolute inset-0 bg-black opacity-30"></div>
    <img
      src="https://images.unsplash.com/photo-1686757328248-cfe22f6ba269?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      alt="Right image"
      className="w-full h-full object-cover"
    />
  </div>

  <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center z-10 px-4">
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-md">Fitness Journey</h1>
    <p className="mt-4 text-lg md:text-xl lg:text-2xl font-medium drop-shadow-sm">
      Log workouts, stay consistent, and smash your goals.
    </p>
  </div>
</div>
 
</section>

<section className="relative w-screen h-screen flex flex-col md:flex-row text-white overflow-hidden">
  <div className="relative w-full h-1/2 md:w-1/2 md:h-full">
    <img
      src="https://images.unsplash.com/photo-1594381898411-846e7d193883?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGd5bXxlbnwwfDF8MHx8fDA%3D"
      alt="Workout"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-black opacity-50"></div>
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
      <h3 className="text-2xl sm:text-3xl font-semibold mb-2">Start Working Out</h3>
      <a
        href="/logworkout"
        className="mt-4 px-6 py-2 bg-white text-red-800 font-semibold rounded hover:bg-gray-200 transition duration-300"
      >
        Choose an Exercise
      </a>
    </div>
  </div>

  <div className="w-full h-1/2 md:w-1/2 md:h-full flex flex-col justify-center items-center px-6 text-center bg-red-800">
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Choose Your Workout</h2>
    <p className="text-base sm:text-lg md:text-xl max-w-md">
      Explore our list of available exercises and pick one that fits your routine.
    </p>
  </div>
</section>

<section className="relative h-screen bg-black flex items-center justify-center">
  <div className="absolute inset-0 bg-black opacity-60 z-0">
    <video
      className="w-full h-full object-cover"
      autoPlay
      loop
      muted
    >
      <source src="https://videos.pexels.com/video-files/5310858/5310858-uhd_2560_1440_25fps.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>

  <div className="text-center z-10 relative">
    <h2 className="text-5xl font-bold mb-4 text-white">Stay Consistent</h2>
    <p className="text-xl text-white max-w-xl mx-auto">
      Keep logging your workouts to see long-term results!
    </p>
    <Link
      to="/dashboard"
      className="inline-block mt-4 px-8 py-3 bg-white text-red-800 font-semibold text-xl rounded-full hover:bg-red-800 hover:text-white transition duration-300"
    >
      See Dashboard
    </Link>
  </div>
</section>
    
    </div>
  );
};

export default Home;
