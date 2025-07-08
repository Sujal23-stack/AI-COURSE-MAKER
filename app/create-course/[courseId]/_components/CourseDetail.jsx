import Image from 'next/image'
import React from 'react'
import { HiClock, HiMiniPlay, HiOutlineBookOpen, HiOutlineChartBar } from 'react-icons/hi2'

function CourseDetail({ course }) {
    return (
        <div className='border p-6 rounded-xl shadow-sm mt-3'>
            <div className='grid grid-cols-2 md:grid-cols-4'>
                <div className='flex gap-2'>
                    <HiOutlineChartBar className='text-4xl text-purple-500' />
                    <div>
                        <h2 className='text-xs text-gray-500'>Skill Level</h2>
                        <h2 className='font-medium text-lg'>{course?.level}</h2>
                    </div>
                </div>
                <div className='flex gap-2'>
                    <HiClock className='text-4xl text-purple-500' />
                    <div>
                        <h2 className='text-xs text-gray-500'>Duration</h2>
                        <h2 className='font-medium text-lg'>{course?.courseOutput?.duration}</h2>
                    </div>
                </div>
                <div className='flex gap-2'>
                    <HiOutlineBookOpen className='text-4xl text-purple-500' />
                    <div>
                        <h2 className='text-xs text-gray-500'>No of Chapters</h2>
                        <h2 className='font-medium text-lg'>{course?.courseOutput?.noOfChapters}</h2>
                    </div>
                </div>
                <div className='flex gap-2'>
                    <HiMiniPlay className='text-4xl text-purple-500' />
                    <div>
                        <h2 className='text-xs text-gray-500'>Video Included?</h2>
                        <h2 className='font-medium text-lg'>{course?.includeVideo}</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseDetail