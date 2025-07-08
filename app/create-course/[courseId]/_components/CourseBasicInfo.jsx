import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react'
import { HiMiniPuzzlePiece } from 'react-icons/hi2';
import EditCourseBasicInfo from './EditCourseBasicInfo';

function CourseBasicInfo({ course }) {
    console.log("Inside courseBasic Info")
    console.log(course);
    return (
        <div className='p-10 border rounded-xl shadow-sm mt-5'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                <div>
                    <h2 className='font-bold text-3xl'>{course?.courseOutput?.courseName} <EditCourseBasicInfo course={course}/></h2>
                    <p className='text-sm text-gray-400 mt-3'>{course?.courseOutput?.description}</p>
                    <h2 className='font-medium mt-2 flex gap-2 items-center text-purple-500'><HiMiniPuzzlePiece />
                        {course?.category}</h2>
                    <Button className='w-full mt-5 bg-purple-500' >Start</Button>
                </div>
                <div>
                    <Image src={'/placeholder3.png'} width={300} height={300} alt='course image'
                        className='w-full rounded-xl h-[250px] object-cover' />
                </div>
            </div>


        </div>
    )
}

export default CourseBasicInfo