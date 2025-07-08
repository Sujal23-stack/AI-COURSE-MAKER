import React from 'react'

function Hero() {
  return (
    <section className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
      <div className="mx-auto max-w-screen-xl px-4 py-20 lg:flex lg:items-center lg:justify-between">
        <div className="max-w-3xl text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient">
            Course Maker AI
            <br />
            <span className="text-white">Learning path powered by AI</span>
          </h1>

          <p className="mt-6 text-lg text-gray-300">
            Experience personalized education through AI-powered course creation.
            Customize your learning journey to align with your unique goals — at your own pace.
          </p>

          <div className="mt-8 flex justify-center lg:justify-start">
            <a
              href="https://ai-course-maker-1qt4.vercel.app/dashboard"
              className="inline-block rounded-md bg-blue-600 px-8 py-3 text-sm font-medium text-white transition hover:bg-blue-700 shadow-lg"
            >
              Get Started
            </a>
          </div>
        </div>

        <div className="hidden lg:block mt-10 lg:mt-0 lg:w-1/3">
          <img
            src="/online-education.png"
            alt="AI Education"
            className="w-full animate-pulse drop-shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
