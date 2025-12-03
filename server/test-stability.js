import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const generateImage = async () => {
    try {
        const prompt = "A futuristic city with flying cars";
        console.log("Generating image with prompt:", prompt);
        console.log("Using API Key:", process.env.STABILITYAI_API_KEY ? "Present" : "Missing");

        const response = await axios.post(
            "https://api.stability.ai/v1/generation/stable-diffusion-v1-5/text-to-image",
            {
                text_prompts: [{ text: prompt }],
                cfg_scale: 7,
                clip_guidance_preset: "FAST_BLUE",
                height: 512,
                width: 512,
                samples: 1,
                steps: 30,
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.STABILITYAI_API_KEY}`,
                    "Content-Type": "application/json",
                },
                responseType: "arraybuffer",
            }
        );

        console.log("Response status:", response.status);
        if (response.data) {
            console.log("Success! Image generated.");
            console.log("Data length:", response.data.length);
        }

    } catch (error) {
        console.error("Error generating image:");
        if (error.response) {
            console.error("Status:", error.response.status);
            // console.error("Data:", error.response.data.toString()); // buffer to string might be messy if binary
        } else {
            console.error(error.message);
        }
    }
};

generateImage();
