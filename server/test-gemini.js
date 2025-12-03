import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const generateImage = async () => {
    try {
        const prompt = "A futuristic city with flying cars";
        console.log("Generating image with prompt:", prompt);
        console.log("Using API Key:", process.env.GEMINI_API_KEY ? "Present" : "Missing");

        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp-image-generation:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                contents: [{ parts: [{ text: prompt }] }],
                // generationConfig: {
                //     responseMimeType: "image/jpeg" 
                // }
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        console.log("Response status:", response.status);
        // console.log("Response data:", JSON.stringify(response.data, null, 2));

        if (response.data.candidates &&
            response.data.candidates[0].content &&
            response.data.candidates[0].content.parts &&
            response.data.candidates[0].content.parts[0].inlineData) {

            console.log("Success! Image generated.");
            console.log("Base64 length:", response.data.candidates[0].content.parts[0].inlineData.data.length);
        } else {
            console.log("Unexpected response structure:", JSON.stringify(response.data, null, 2));
        }

    } catch (error) {
        console.error("Error generating image:");
        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Data:", JSON.stringify(error.response.data, null, 2));
        } else {
            console.error(error.message);
        }
    }
};

generateImage();
