"use client"
import { Button } from '@/components/ui/button'
import React, { useContext, useEffect, useState } from 'react'
import { HiClipboardDocumentCheck, HiLightBulb, HiMiniSquares2X2 } from 'react-icons/hi2'
import SelectCategory from './_components/SelectCategory'
import TopicDescription from './_components/TopicDescription'
import SelectOption from './_components/SelectOption'
import { UserInputContext } from '../_context/UserInputContext'
import { GenerateCourseLayout_AI } from '@/configs/AiModel'
import LoadingDialog from './_components/LoadingDialog'
import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import uuid4 from 'uuid4'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { generateChapterContent } from '@/configs/AiModel'

function CreateCourse() {
    const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
    const [loading, setLoading] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    
const [generatedChapters, setGeneratedChapters] = useState([]);
    const { user } = useUser();
    const router = useRouter();

    const checkStatus = () => {
        if (userCourseInput?.length === 0) return true;

        if (
            activeIndex === 0 &&
            (!userCourseInput?.category || userCourseInput?.category.length === 0)
        ) return true;

        if (
            activeIndex === 1 &&
            (!userCourseInput?.topic || userCourseInput?.topic.length === 0)
        ) return true;

        if (
            activeIndex === 2 &&
            (!userCourseInput?.level || !userCourseInput?.duration ||
                userCourseInput?.displayVideo === undefined || userCourseInput?.noOfChapters === undefined)
        ) return true;

        return false;
    };

    const StepperOptions = [
        {
            id: 1,
            name: 'Category',
            icon: <HiLightBulb />
        },
        {
            id: 2,
            name: 'Topic & Desc',
            icon: <HiMiniSquares2X2 />
        },
        {
            id: 3,
            name: 'Options',
            icon: <HiClipboardDocumentCheck />
        },
    ];

    useEffect(() => {
        console.log(userCourseInput)
    }, [userCourseInput]);

    const GenerateCourseLayout = async () => {
        setLoading(true);

        const BASIC_PROMPT = "Generate a course tutorial on the following details with field as course name, description, along with chapter name, about and duration: ";
        const USER_INPUT_PROMPT = `category: ${userCourseInput?.category}, topic: ${userCourseInput?.topic}, level: ${userCourseInput?.level}, duration: ${userCourseInput?.duration}, noOfchapters: ${userCourseInput?.noOfChapters} in json format`;
        const FINAL_PROMPT = BASIC_PROMPT + USER_INPUT_PROMPT;

        console.log(FINAL_PROMPT);

        const result = await GenerateCourseLayout_AI.sendMessage(FINAL_PROMPT);
        const parsedResponse = JSON.parse(result.response?.text());
        console.log(parsedResponse);

        setLoading(false);
        SaveCourseLayoutInDb(parsedResponse);
    };

    const SaveCourseLayoutInDb = async (courseLayout) => {
        setLoading(true);
        const uid = uuid4();

        await db.insert(CourseList).values({
            courseId: uid,
            name: userCourseInput?.topic,
            level: userCourseInput?.level,
            category: userCourseInput?.category,
            courseOutput: courseLayout,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            userName: user?.fullName,
            userProfileImage: user?.imageUrl
        });

        console.log("finish");
        setLoading(false);
        router.replace('/create-course/' + uid);
    };

    return (
        <div>
            {/* Stepper */}
            <div className='flex flex-col justify-center items-center mt-10'>
                <h2 className='text-4xl text-primary font-medium'>Create Course</h2>
                <div className='flex mt-10'>
                    {StepperOptions.map((item, index) => (
                        <div key={item.id} className='flex items-center'>
                            <div className='flex flex-col items-center w-[50px] md:w-[100px]'>
                                <div className={`bg-gray-200 text-white p-3 rounded-full
                                    ${activeIndex >= index ? 'bg-purple-500' : ''}`}>
                                    {item.icon}
                                </div>
                                <h2 className='hidden md:block text-sm'>{item.name}</h2>
                            </div>
                            {index !== StepperOptions.length - 1 && (
                                <div className={`h-1 w-[50px] rounded-full lg:w-[170px] bg-gray-300
                                    ${activeIndex > index ? 'bg-purple-500' : ''}`}></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Component Section */}
            <div className='px-10 md:px-20 lg:px-44 mt-10'>
                {activeIndex === 0 ? <SelectCategory /> :
                    activeIndex === 1 ? <TopicDescription /> : <SelectOption />}

                {/* Navigation Buttons */}
                <div className='flex justify-between mt-10'>
                    <Button
                        disabled={activeIndex === 0}
                        variant='outline'
                        onClick={() => setActiveIndex(activeIndex - 1)}
                    >
                        Previous
                    </Button>

                    {activeIndex < 2 && (
                        <Button
                            disabled={checkStatus()}
                            onClick={() => setActiveIndex(activeIndex + 1)}
                        >
                            Next
                        </Button>
                    )}

                    {activeIndex === 2 && (
                        <Button
                            disabled={checkStatus()}
                            onClick={GenerateCourseLayout}
                        >
                            Generate Course Layout
                        </Button>
                    )}
                </div>
            </div>

            <LoadingDialog loading={loading} />
        </div>
    );
}

export default CreateCourse;
