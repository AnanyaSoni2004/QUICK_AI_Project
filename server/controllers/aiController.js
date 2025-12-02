import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";
import axios from "axios";
import sql from "../config/db.js";
import { cloudinary } from "../config/cloudinary.js";
import fs from "fs";
import * as pdfParse from "pdf-parse";

const AI = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export const generateArticle = async (req, res) => {
  try {
    const { userId } = req.auth;
    const { prompt, length } = req.body;
    const { plan, free_usage } = req;

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({ success: false, message: "Limit reached. Upgrade to continue." });
    }

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: length,
    });

    const content =
      response.choices?.[0]?.message?.content ||
      response.choices?.[0]?.content?.[0]?.text ||
      "";

    await sql`
      INSERT INTO creations(user_id, prompt, content, type)
      VALUES(${userId}, ${prompt}, ${content}, 'article')
    `;

    res.json({ success: true, content });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const generateBlogTitle = async (req, res) => {
  try {
    const { userId } = req.auth;
    const { prompt } = req.body;
    const { plan, free_usage } = req;

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({ success: false, message: "Limit reached. Upgrade to continue." });
    }

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 100,
    });

    const content = response.choices[0].message.content;

    await sql`
      INSERT INTO creations(user_id, prompt, content, type)
      VALUES(${userId}, ${prompt}, ${content}, 'blog-title')
    `;

    res.json({ success: true, content });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const generateImage = async (req, res) => {
  try {
    const { userId } = req.auth;
    const { prompt, publish } = req.body;
    const { plan, free_usage } = req;

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

    const base64Image = `data:image/png;base64,${Buffer.from(response.data, "binary").toString("base64")}`;

    const { secure_url } = await cloudinary.uploader.upload(base64Image);

    await sql`
      INSERT INTO creations(user_id, prompt, content, type, publish)
      VALUES(${userId}, ${prompt}, ${secure_url}, 'image', ${publish ?? false})
    `;

    res.json({ success: true, content: secure_url });
  } catch (error) {
    const placeholder = "https://via.placeholder.com/512?text=Image+Unavailable";
    res.json({ success: false, message: error.message, content: placeholder });
  }
};

// export const removeImageBackground = async (req, res) => {
//   try {
//     const { userId } = req.auth;
//     const { image } = req.file;

//     const { secure_url } = await cloudinary.uploader.upload(image, {
//       background_removal: "cloudinary_ai",
//     });

//     await sql`
//       INSERT INTO creations(user_id, prompt, content, type)
//       VALUES(${userId}, ${"Remove background from image"}, ${secure_url}, 'image')
//     `;

//     res.json({ success: true, content: secure_url });
//   } catch (error) {
//     const placeholder = "https://via.placeholder.com/512?text=Image+Unavailable";
//     res.json({ success: false, message: error.message, content: placeholder });
//   }
// };
export const removeImageBackground = async (req, res) => {
  try {
    const { userId } = req.auth;


    if (!req.file) {
      return res.json({ success: false, message: "No image uploaded" });
    }

    // multer saved the file here:
    const imagePath = req.file.path;

    // Upload to Cloudinary with BG removal
    const { secure_url } = await cloudinary.uploader.upload(imagePath, {
      background_removal: "cloudinary_ai",
      resource_type: "image"
    });

    await sql`
      INSERT INTO creations(user_id, prompt, content, type)
      VALUES(${userId}, 'Remove background from image', ${secure_url}, 'image')
    `;

    // delete temporary multer file
    fs.unlinkSync(imagePath);

    res.json({ success: true, content: secure_url });

  } catch (error) {
    console.error("BG Remove Error:", error.message);
    const placeholder = "https://via.placeholder.com/512?text=Image+Unavailable";
    res.json({ success: false, message: error.message, content: placeholder });
  }
};

export const resumereview = async (req, res) => {
  try {
    const { userId } = req.auth;
    const resume = req.file;

    if (!resume) {
      return res.json({ success: false, message: "No resume uploaded" });
    }

    if (resume.size > 5 * 1024 * 1024) {
      return res.json({
        success: false,
        message: "Resume file size exceeds allowed limit (5MB)",
      });
    }

    const dataBuffer = fs.readFileSync(resume.path);
    const pdfData = await pdfParse.default(dataBuffer);

    const prompt = `
Review the following resume and provide structured feedback:

1. Summary of strengths
2. Key improvements needed
3. Estimated ATS score (0-100)
4. Suggestions to improve formatting
5. Suggestions to improve skills & experience
6. Rewrite the resume summary

Resume Content:
${pdfData.text}
`;

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1500,
    });

    const content =
      response.choices?.[0]?.message?.content ||
      "Unable to generate review.";

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, 'Resume Review', ${content}, 'resume-review')
    `;

    res.json({ success: true, content });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};




















// import dotenv from "dotenv";
// dotenv.config();

// import OpenAI from "openai";
// import axios from "axios";
// import sql from "../config/db.js";
// import { cloudinary } from "../config/cloudinary.js";
// import fs from 'fs'
// import * as pdfParse from "pdf-parse"; 

// const AI = new OpenAI({
//   apiKey: process.env.GEMINI_API_KEY,
//   baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
// });

// // --------------------- Generate Article ---------------------
// export const generateArticle = async (req, res) => {
//   try {
//     const { userId } = req.auth;
//     const { prompt, length } = req.body;
//     const { plan, free_usage } = req;

//     if (plan !== "premium" && free_usage >= 10) {
//       return res.json({ success: false, message: "Limit reached. Upgrade to continue." });
//     }

//     const response = await AI.chat.completions.create({
//       model: "gemini-2.0-flash",
//       messages: [{ role: "user", content: prompt }],
//       temperature: 0.7,
//       max_tokens: length,
//     });

//     const content =
//       response.choices?.[0]?.message?.content ||
//       response.choices?.[0]?.content?.[0]?.text ||
//       "";

//     await sql`
//       INSERT INTO creations(user_id, prompt, content, type)
//       VALUES(${userId}, ${prompt}, ${content}, 'article')
//     `;

//     if (plan !== "premium") {
//       await clerkClient.users.updateUserMetadata(userId, {
//         privateMetadata: { free_usage: free_usage + 1 },
//       });
//     }

//     res.json({ success: true, content });
//   } catch (error) {
//     console.error("Error in generateArticle:", error.message);
//     res.json({ success: false, message: error.message });
//   }
// };

// // --------------------- Generate Blog Title ---------------------
// export const generateBlogTitle = async (req, res) => {
//   try {
//     const { userId } = req.auth;
//     const { prompt } = req.body;
//     const { plan, free_usage } = req;

//     if (plan !== "premium" && free_usage >= 10) {
//       return res.json({ success: false, message: "Limit reached. Upgrade to continue." });
//     }

//     const response = await AI.chat.completions.create({
//       model: "gemini-2.0-flash",
//       messages: [{ role: "user", content: prompt }],
//       temperature: 0.7,
//       max_tokens: 100,
//     });

//     const content = response.choices[0].message.content;

//     await sql`
//       INSERT INTO creations(user_id, prompt, content, type)
//       VALUES(${userId}, ${prompt}, ${content}, 'blog-title')
//     `;

//     if (plan !== "premium") {
//       await clerkClient.users.updateUserMetadata(userId, {
//         privateMetadata: { free_usage: free_usage + 1 },
//       });
//     }

//     res.json({ success: true, content });
//   } catch (error) {
//     console.error("Error in generateBlogTitle:", error.message);
//     res.json({ success: false, message: error.message });
//   }
// };

// // --------------------- Generate Image ---------------------
// export const generateImage = async (req, res) => {
//   try {
//     const { userId } = req.auth;
//     const { prompt, publish } = req.body;
//     const { plan, free_usage } = req;

//     if (plan !== "premium" && free_usage >= 10) {
//       return res.json({ success: false, message: "Limit reached. Upgrade to continue." });
//     }

//     const response = await axios.post(
//       "https://api.stability.ai/v1/generation/stable-diffusion-v1-5/text-to-image",
//       {
//         text_prompts: [{ text: prompt }],
//         cfg_scale: 7,
//         clip_guidance_preset: "FAST_BLUE",
//         height: 512,
//         width: 512,
//         samples: 1,
//         steps: 30,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.STABILITYAI_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//         responseType: "arraybuffer",
//       }
//     );

//     const base64Image = `data:image/png;base64,${Buffer.from(response.data, "binary").toString("base64")}`;

//     const { secure_url } = await cloudinary.uploader.upload(base64Image);

//     await sql`
//       INSERT INTO creations(user_id, prompt, content, type, publish)
//       VALUES(${userId}, ${prompt}, ${secure_url}, 'image', ${publish ?? false})
//     `;

//     if (plan !== "premium") {
//       await clerkClient.users.updateUserMetadata(userId, {
//         privateMetadata: { free_usage: free_usage + 1 },
//       });
//     }

//     res.json({ success: true, content: secure_url });
//   } catch (error) {
//     console.error("Error in generateImage:", error.response?.data || error.message);
//     const placeholder = "https://via.placeholder.com/512?text=Image+Unavailable";
//     res.json({ success: false, message: error.message, content: placeholder });
//   }
// };


// // ---------------------remove image background---------------------
// export const removeImageBackground = async (req, res) => {
//   try {
//     const { userId } = req.auth;
//     const { image } = req.body;   
//     const { plan, free_usage } = req;

//     const { secure_url } = await cloudinary.uploader.upload(image, {
//       background_removal: "cloudinary_ai",
//     });


//     await sql`
//       INSERT INTO creations(user_id, prompt, content, type)
//       VALUES(${userId}, ${"Remove background from image"}, ${secure_url}, 'image')
//     `;

   
//     res.json({ success: true, content: secure_url });

//   } catch (error) {
//     console.error("Error in removeImageBackground:", error.message);
//     const placeholder = "https://via.placeholder.com/512?text=Image+Unavailable";
//     res.json({ success: false, message: error.message, content: placeholder });
//   }
// };


// // ---------------resume review--------------------------------------------------
// import * as pdfParse from "pdf-parse";

// export const resumereview = async (req, res) => {
//   try {
//     const { userId } = req.auth;
//     const resume = req.file;

//     if (!resume) {
//       return res.json({ success: false, message: "No resume uploaded" });
//     }

//     if (resume.size > 5 * 1024 * 1024) {
//       return res.json({
//         success: false,
//         message: "Resume file size exceeds allowed limit (5MB)",
//       });
//     }

//     const dataBuffer = fs.readFileSync(resume.path);
//     const pdfData = await pdfParse.default(dataBuffer);

//     const prompt = `
// Review the following resume and provide structured feedback:

// 1. Summary of strengths
// 2. Key improvements needed
// 3. Estimated ATS score (0-100)
// 4. Suggestions to improve formatting
// 5. Suggestions to improve skills & experience
// 6. Rewrite the resume summary

// Resume Content:
// ${pdfData.text}
// `;

//     const response = await AI.chat.completions.create({
//       model: "gemini-2.0-flash",
//       messages: [{ role: "user", content: prompt }],
//       temperature: 0.7,
//       max_tokens: 1500,
//     });

//     const content =
//       response.choices?.[0]?.message?.content ||
//       "Unable to generate review.";

//     await sql`
//       INSERT INTO creations (user_id, prompt, content, type)
//       VALUES (${userId}, 'Resume Review', ${content}, 'resume-review')
//     `;

//     res.json({ success: true, content });

//   } catch (error) {
//     console.error("Error in resumereview:", error.message);
//     res.json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
