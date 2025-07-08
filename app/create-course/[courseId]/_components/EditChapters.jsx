import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { HiPencilSquare } from 'react-icons/hi2'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import { eq } from 'drizzle-orm'


function EditChapters({ course, index }) {
    const [name, setName] = useState(""); // Initialize to empty string
    const [about, setAbout] = useState(""); // Initialize to empty string
    const [chapter, setChapter] = useState(null); // Store the specific chapter being edited

    useEffect(() => {
        if (course?.courseOutput?.chapters && course.courseOutput.chapters[index]) { // Check if chapters exist and index is valid
            const selectedChapter = course.courseOutput.chapters[index];
            setChapter(selectedChapter); // Set the chapter to state.
            setName(selectedChapter.chapterName);
            setAbout(selectedChapter.about);
        } else {
            console.warn("Chapters data not available or invalid index.");
        }
    }, [course, index]); // Add index to the dependency array.

    const onUpdateHandler = async () => {
        if (!chapter) return; // Guard clause if no chapter selected

        const updatedChapters = [...course.courseOutput.chapters]; // Create a copy
        updatedChapters[index] = { ...chapter, chapterName: name, about }; // Update the copy

        try {
            const result = await db.update(CourseList).set({ courseOutput: { ...course.courseOutput, chapters: updatedChapters } }) // Update with the copied array.
                .where(eq(CourseList.courseId, course.courseId))
                .returning({ id: CourseList.id });

            console.log("Update Result:", result);
            // Optionally update the course state in the parent component to reflect changes immediately
            // by calling a callback passed as a prop from parent component.
        } catch (error) {
            console.error("Error updating course:", error);
        }
    };

    if (!chapter) { // Render nothing if chapter is not loaded yet.
        return null;
    }

    return (
        <Dialog>
            <DialogTrigger> <HiPencilSquare />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Chapters</DialogTitle>
                    <DialogDescription>
                        <div className='mt-3'>
                            <label>Chapter Title</label>
                            <Input
                                value={name} // Use value instead of defaultValue
                                onChange={(event) => setName(event?.target.value)}
                            />
                        </div>
                        <div>
                            <label>Description</label>
                            <Textarea
                                className='h-40'
                                value={about} // Use value instead of defaultValue
                                onChange={(event) => setAbout(event?.target.value)}
                            />
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose>
                        <Button onClick={onUpdateHandler}>Update</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default EditChapters