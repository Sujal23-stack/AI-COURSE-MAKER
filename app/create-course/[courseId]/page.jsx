"use client"
import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import { useUser } from '@clerk/nextjs';
import { and, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import CourseBasicInfo from './_components/CourseBasicInfo';
import CourseDetail from './_components/CourseDetail';
import ChapterList from './_components/ChapterList';
import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { generateChapterContent } from '@/configs/AiModel';


function CourseLayout() {
    const router=useRouter();

    const { user } = useUser();
    const [course, setCourse] = useState(null);

  const [generatedChapters, setGeneratedChapters] = useState([]);

    const params = useParams();

    useEffect(() => {
        const getCourse = async () => { // Rename to getCourse
            if (params && user) { // Check both params and user
                try {
                    const result = await db.select().from(CourseList)
                        .where(and(eq(CourseList.courseId, params.courseId),
                            eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress)));

                    if (result.length > 0) { // Check if a course was found
                        setCourse(result[0]);
                    } else {
                        // Handle the case where the course is not found.  For example:
                        console.error("Course not found!");
                        // You could also set an error state and display a message to the user.
                        setCourse(null) // Reset course to null if not found.
                    }

                } catch (error) {
                    console.error("Error fetching course:", error);
                    // Handle error, e.g., set an error state
                    setCourse(null); // Reset course to null in case of error.
                }

            }
        };

        getCourse(); // Call the function
    }, [params, user]); // Add user to dependency array

    if (!course) { // Handle the loading or error state
        return <div>Loading...</div>; // Or display an error message
    }const GenerateChapterContent = async () => {
  const chapters = course?.courseOutput?.chapters;
  if (!Array.isArray(chapters)) return;

  const chapterOutputs = [];

  for (const chapter of chapters) {
    const htmlContent = await generateChapterContent(course?.name, chapter.chapterName);
    chapterOutputs.push({ ...chapter, htmlContent });
  }

  // Optional: Store in DB or context — here we store in localStorage temporarily
  localStorage.setItem("generatedChapters", JSON.stringify(chapterOutputs));

  // Redirect to first chapter page
  router.push(`/create-course/${course.courseId}/chapter/0`);
};



    return (
        <div className='mt-10 px-7 md:px-20 lg:px-44 mb-10'>
            <h2 className='font-bold text-center text-2xl'>Course Layout</h2>

            {/* {Basic Info} */}
            <CourseBasicInfo course={course}/>

            {/* Course Detail */}
            <CourseDetail course={course}/>

            {/* List of Lesson */}
            <ChapterList course={course}/>
<Button  onClick={GenerateChapterContent}   className='bg-purple-500 my-5 ml-'>Generate Course Content</Button>
        </div>
    )
}

export default CourseLayout