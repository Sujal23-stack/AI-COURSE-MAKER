"use client";
import React from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const sampleCourses = [
  {
    courseId: "python-basics",
    name: "Python Basics",
    category: "Programming",
    level: "Beginner",
    description:
      "Learn Python from scratch with variables, loops, and functions.",
    noOfChapters: 5,
    userName: "Amit Shah",
    userProfileImage: "https://i.pravatar.cc/150?img=1",
    chapters: [
      {
        name: "Introduction to Python",
        duration: "10 min",
        summary: "What is Python, its history and use cases."
      },
      {
        name: "Variables and Data Types",
        duration: "15 min",
        summary: "Learn about strings, integers, floats, and more."
      },
      {
        name: "Control Flow",
        duration: "12 min",
        summary: "if/else conditions, loops and code blocks."
      },
      {
        name: "Functions",
        duration: "10 min",
        summary: "Define and use your own functions."
      },
      {
        name: "Lists and Dictionaries",
        duration: "13 min",
        summary: "Explore Python collections."
      }
    ]
  },
  // other courses...
];

const CourseDetailPage = () => {
  const { courseId } = useParams();

  const course = sampleCourses.find((c) => c.courseId === courseId);

  if (!course) return <div className="p-10">Course not found.</div>;

  return (
    <div className="px-6 md:px-16 lg:px-32 py-10">
      <h1 className="text-3xl font-bold mb-3">{course.name}</h1>
      <div className="flex gap-3 items-center mb-6">
        <img
          src={course.userProfileImage}
          alt={course.userName}
          className="h-10 w-10 rounded-full"
        />
        <div>
          <p className="font-medium">{course.userName}</p>
          <p className="text-sm text-gray-500">
            {course.category} • {course.level}
          </p>
        </div>
      </div>

      <p className="text-gray-700 mb-6">{course.description}</p>

      <h2 className="text-xl font-semibold mb-2">Chapters</h2>
      <div className="border rounded-lg divide-y">
        {course.chapters.map((chapter, index) => (
          <div
            key={index}
            className="p-4 hover:bg-gray-50 flex justify-between items-center"
          >
            <div>
              <h3 className="font-medium">{index + 1}. {chapter.name}</h3>
              <p className="text-sm text-gray-500">{chapter.summary}</p>
            </div>
            <span className="text-sm text-purple-600">{chapter.duration}</span>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Link href="/dashboard">
          <Button variant="outline">Back to Explore</Button>
        </Link>
      </div>
    </div>
  );
};

export default CourseDetailPage;
