const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  export const generateChapterContent = async (topic, chapterName) => {
  const prompt = `Explain the topic "${topic}" in detail for the chapter "${chapterName}" in according to their topic depth organize properly using your knowledge`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response.text();
    return response;
  } catch (error) {
    console.error('AI generation failed:', error);
    return 'Error generating content';
  }
};
  
export const GenerateCourseLayout_AI = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate a course tutorial on the following details with field as course name, description, along with chapter name, about and duration: category: Real Estate Investing, topic: Fix and Flip, level: Advance, duration: 2 Hours, noOfchapters: 6 in json format"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"courseName\": \"Fix and Flip Mastery: Advanced Strategies for Profit Maximization\",\n  \"category\": \"Real Estate Investing\",\n  \"topic\": \"Fix and Flip\",\n  \"level\": \"Advanced\",\n  \"description\": \"This advanced course delves into the intricacies of fix and flip investing, equipping experienced investors with cutting-edge strategies for maximizing profit margins, minimizing risk, and scaling their flipping businesses. We'll move beyond the basics and explore sophisticated techniques in property valuation, renovation management, financing, and exit strategies. This course assumes a prior understanding of real estate fundamentals and the fix and flip process.\",\n  \"duration\": \"2 Hours\",\n  \"noOfChapters\": 6,\n  \"chapters\": [\n    {\n      \"chapterName\": \"Chapter 1: Advanced Property Valuation and Market Analysis for Flips\",\n      \"about\": \"This chapter explores sophisticated methods for accurately valuing potential flip properties and analyzing market trends to identify lucrative opportunities. We'll cover techniques beyond basic comps, including predictive analytics, submarket analysis, and understanding the impact of emerging trends on property values.\",\n      \"duration\": \"20 Minutes\"\n    },\n    {\n      \"chapterName\": \"Chapter 2: Strategic Renovation Planning and Budgeting for ROI Maximization\",\n      \"about\": \"This chapter focuses on optimizing renovation plans to maximize return on investment. We'll discuss value-add renovations that appeal to specific buyer demographics, cost-effective design strategies, and advanced budgeting techniques to control expenses and prevent cost overruns.\",\n      \"duration\": \"25 Minutes\"\n    },\n    {\n      \"chapterName\": \"Chapter 3: Advanced Financing Strategies for Fix and Flip Deals\",\n      \"about\": \"Explore advanced financing options for fix and flip projects, including private lending, hard money loans, and creative financing techniques. We'll analyze the pros and cons of each option, discuss strategies for negotiating favorable loan terms, and explore alternative financing methods for scaling your business.\",\n      \"duration\": \"20 Minutes\"\n    },\n    {\n      \"chapterName\": \"Chapter 4: Streamlining Renovation Management and Contractor Relations\",\n      \"about\": \"This chapter covers advanced techniques for managing renovation projects efficiently and effectively. We'll discuss strategies for building strong relationships with contractors, implementing project management systems, and utilizing technology to track progress and control costs.\",\n      \"duration\": \"20 Minutes\"\n    },\n    {\n      \"chapterName\": \"Chapter 5: Exit Strategies and Marketing Tactics for Quick and Profitable Sales\",\n      \"about\": \"Learn advanced marketing techniques to attract qualified buyers and sell your flipped properties quickly and for top dollar. We'll explore strategies for staging, online marketing, social media promotion, and negotiating offers to maximize your profit margin.\",\n      \"duration\": \"20 Minutes\"\n    },\n    {\n      \"chapterName\": \"Chapter 6: Legal and Risk Management Considerations for Fix and Flip Investors\",\n      \"about\": \"This chapter focuses on minimizing legal and financial risks associated with fix and flip investing. We'll discuss strategies for structuring your business, obtaining proper insurance coverage, and navigating legal challenges that may arise during the flipping process.  We'll also cover ethical considerations and best practices for responsible investing.\",\n      \"duration\": \"15 Minutes\"\n    }\n  ]\n}\n```\n"},
          ],
        },
      ],
    });
  
    //const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    //console.log(result.response.text());
 