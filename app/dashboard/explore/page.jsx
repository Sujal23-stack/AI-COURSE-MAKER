"use client";
import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const sampleCourses = [
  {
    courseId: "python-basics",
    name: "Python Basics",
    category: "Programming",
    level: "Beginner",
    description: "Learn Python from scratch with variables, loops, and functions.",
    noOfChapters: 5,
    userName: "Amit Shah",
    userProfileImage: "https://i.pravatar.cc/150?img=1",
  },
  {
    courseId: "web-dev-bootcamp",
    name: "Web Development Bootcamp",
    category: "Full Stack",
    level: "Intermediate",
    description: "HTML, CSS, JavaScript, Node.js & React in one complete course.",
    noOfChapters: 8,
    userName: "Sneha Mehta",
    userProfileImage: "https://i.pravatar.cc/150?img=2",
  },
  {
    courseId: "ai-ml-intro",
    name: "Intro to AI & ML",
    category: "AI & ML",
    level: "Beginner",
    description: "Start your journey into Artificial Intelligence and Machine Learning.",
    noOfChapters: 6,
    userName: "Rohan Desai",
    userProfileImage: "https://i.pravatar.cc/150?img=3",
  },
  {
    courseId: "data-structures-java",
    name: "Data Structures in Java",
    category: "Programming",
    level: "Advanced",
    description: "Master arrays, linked lists, trees, graphs & more in Java.",
    noOfChapters: 9,
    userName: "Kavita Patel",
    userProfileImage: "https://i.pravatar.cc/150?img=4",
  },
  {
    courseId: "uiux-design",
    name: "UI/UX Design Principles",
    category: "Design",
    level: "Intermediate",
    description: "Build stunning and user-friendly designs using Figma & Adobe XD.",
    noOfChapters: 4,
    userName: "Neeraj Joshi",
    userProfileImage: "https://i.pravatar.cc/150?img=5",
  },
  {
    courseId: "ethical-hacking-101",
    name: "Ethical Hacking 101",
    category: "Cybersecurity",
    level: "Beginner",
    description: "Understand ethical hacking, tools, and penetration testing basics.",
    noOfChapters: 7,
    userName: "Anjali Singh",
    userProfileImage: "https://i.pravatar.cc/150?img=6",
  },
];

const ExplorePage = () => {
  return (
    <div className="px-6 md:px-16 lg:px-24 py-10">
      <h1 className="text-3xl font-bold mb-6">Explore Popular Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleCourses.map((course) => (
          <Card key={course.courseId} className="shadow-md">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={course.userProfileImage}
                  alt={course.userName}
                  className="h-10 w-10 rounded-full"
                />
                <div>
                  <h3 className="font-semibold">{course.userName}</h3>
                  <p className="text-sm text-gray-500">{course.category} • {course.level}</p>
                </div>
              </div>
              <h2 className="text-xl font-semibold mb-2">{course.name}</h2>
              <p className="text-gray-600 text-sm mb-4">{course.description}</p>
              <p className="text-sm text-gray-500 mb-3">{course.noOfChapters} Chapters</p>
              <Link href={`/explore/${course.courseId}`}>
                <Button className="w-full">View Details</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExplorePage;
