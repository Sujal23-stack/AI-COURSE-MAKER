"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

function ChapterPage() {
  const params = useParams();
  const router = useRouter();

  const [chapter, setChapter] = useState(null);
  const [totalChapters, setTotalChapters] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const chapters = JSON.parse(localStorage.getItem("generatedChapters") || "[]");
    const chapterIndex = parseInt(params.chapterIndex);

    if (!isNaN(chapterIndex) && chapters[chapterIndex]) {
      setChapter(chapters[chapterIndex]);
      setTotalChapters(chapters.length);
    }

    setTimeout(() => {
      setLoading(false); // simulate loading delay (optional)
    }, 800); // you can skip this timeout if your loading is instant
  }, [params]);

  const chapterIndex = parseInt(params.chapterIndex);

  const handleNext = () => {
    if (chapterIndex + 1 < totalChapters) {
      router.push(`/create-course/${params.courseId}/chapter/${chapterIndex + 1}`);
    }
  };

  const handlePrevious = () => {
    if (chapterIndex > 0) {
      router.push(`/create-course/${params.courseId}/chapter/${chapterIndex - 1}`);
    }
  };

  if (loading || !chapter) {
    return (
      <div className="flex justify-center items-center h-[90vh] text-xl font-semibold">
        Loading chapter content...
      </div>
    );
  }

  return (
    <div className="px-5 py-5 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4 text-center">{chapter.chapterName}</h2>
      <p className="text-sm text-gray-500 mb-4 text-center">{chapter.about}</p>

      {/* A4 scrollable wrapper */}
      <div
        className="w-full max-w-[850px] h-[calc(100vh-250px)] overflow-y-scroll bg-white shadow-md border px-10 py-6 rounded-lg prose"
        style={{ fontSize: "1rem" }}
        dangerouslySetInnerHTML={{ __html: chapter.htmlContent }}
      />

      {/* Pagination Controls */}
      <div className="mt-6 flex justify-between w-full max-w-[850px]">
        <Button onClick={handlePrevious} disabled={chapterIndex === 0} variant="outline">
          ⬅ Previous
        </Button>
        <Button onClick={handleNext} disabled={chapterIndex + 1 === totalChapters}>
          Next ➡
        </Button>
      </div>
    </div>
  );
}

export default ChapterPage;
