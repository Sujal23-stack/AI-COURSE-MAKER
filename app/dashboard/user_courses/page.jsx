"use client";
import { useUser } from "@clerk/nextjs";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import Link from "next/link";

function DashboardPage() {
  const { user } = useUser();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      if (!user) return;

      try {
        const result = await db
          .select()
          .from(CourseList)
          .where(eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress));
        
        setCourses(result);
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [user]);

  if (loading) return <p className="text-center mt-10">Loading your courses...</p>;

  return (
    <div className="px-6 md:px-20 py-10">
      <h2 className="text-2xl font-bold mb-6">You Created</h2>

      {courses.length === 0 ? (
        <p className="text-gray-500">You haven't created any courses yet.</p>
      ) : (
        <div className="grid gap-4">
          {courses.map((course) => (
            <Link
              href={`/create-course/${course.courseId}`}
              key={course.courseId}
              className="border rounded-lg p-4 hover:bg-gray-50 transition"
            >
              <h3 className="text-xl font-semibold text-purple-600">{course.name}</h3>
              <p className="text-sm text-gray-500">
                {course.level} • {course.category}
              </p>
              <p className="text-xs text-gray-400 mt-1">by {course.userName}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
