"use client";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import CourseBasicInfo from "./_components/CourseBasicInfo";
import CourseDetail from "./_components/CourseDetail";
import ChapterList from "./_components/ChapterList";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { generateChapterContent } from "@/configs/AiModel";
import LoadingModal from "@/components/LoadingModal"; // Import modal

function CourseLayout() {
  const { user } = useUser();
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const getCourse = async () => {
      if (params && user) {
        try {
          const result = await db
            .select()
            .from(CourseList)
            .where(
              and(
                eq(CourseList.courseId, params.courseId),
                eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress)
              )
            );
          if (result.length > 0) setCourse(result[0]);
          else setCourse(null);
        } catch (error) {
          console.error("Error fetching course:", error);
          setCourse(null);
        }
      }
    };

    getCourse();
  }, [params, user]);

  const GenerateChapterContent = async () => {
    const chapters = course?.courseOutput?.chapters;
    if (!Array.isArray(chapters)) return;

    setIsLoading(true); // ⬅️ Show loading

    try {
      const chapterOutputs = [];
      for (const chapter of chapters) {
        const htmlContent = await generateChapterContent(course?.name, chapter.chapterName);
        chapterOutputs.push({ ...chapter, htmlContent });
      }

      localStorage.setItem("generatedChapters", JSON.stringify(chapterOutputs));
      router.push(`/create-course/${course.courseId}/chapter/0`);
    } catch (err) {
      console.error("Generation error:", err);
    } finally {
      setIsLoading(false); // ⬅️ Hide loading on error or success
    }
  };

  if (!course) return <div>Loading course...</div>;

  return (
    <div className="mt-10 px-7 md:px-20 lg:px-44 mb-10">
      {isLoading && <LoadingModal />} {/* Show modal during loading */}
      <h2 className="font-bold text-center text-2xl">Course Layout</h2>

      <CourseBasicInfo course={course} />
      <CourseDetail course={course} />
      <ChapterList course={course} />

      <Button onClick={GenerateChapterContent} className="bg-purple-500 my-5">
        Generate Course Content
      </Button>
    </div>
  );
}

export default CourseLayout;
