// // import { Sparkles, Edit, Hash } from 'lucide-react'
// // import React, { useState } from 'react'
// // import { toast } from 'react-toastify'
// // import axios from 'axios'

// // axios.defaults.baseURL = import.meta.env.VITE_BASE_URL
// // console.log("Axios Base URL:", axios.defaults.baseURL)

// // const GenerateImages = () => {
// //   const ImageStyle = [
// //     'Realistic','Ghibli style','Anime style','Cartoon style',
// //     'Fantasy style','Realistic style','3D style','Portrait style'
// //   ]

// //   const [selectedStyle, setSelectedStyle] = useState('Realistic')
// //   const [input, setInput] = useState('')
// //   const [publish, setPublish] = useState(false)
// //   const [loading, setLoading] = useState(false)
// //   const [content, setContent] = useState("")

// //   const onSubmitHandler = async (e) => {
// //     e.preventDefault()
// //     setLoading(true)

// //     try {
// //       const token = localStorage.getItem("token")
// //       if (!token) {
// //         toast.error("You are not logged in!")
// //         setLoading(false)
// //         return
// //       }

// //       const prompt = `Generate an image of "${input}" in the style "${selectedStyle}"`

// //       const { data } = await axios.post(
// //         "/api/ai/generate-image",
// //         { prompt, publish },
// //         {
// //           headers: { Authorization: `Bearer ${token}` }
// //         }
// //       )

// //       if (data.success) {
// //         setContent(data.content)
// //       } else {
// //         toast.error(data.message)
// //       }
// //     } catch (error) {
// //       toast.error(error.message || "Something went wrong")
// //     }

// //     setLoading(false)
// //   }

// //   return (
// //     <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
// //       <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
// //         <div className='flex items-center gap-3'>
// //           <Sparkles className='w-6 text-[#00AD25]'/>
// //           <h1 className='text-xl font-semibold'>AI Image Generator</h1>
// //         </div>

// //         <p className='mt-6 text-sm font-medium'>Describe Your Image</p>
// //         <textarea
// //           onChange={(e) => setInput(e.target.value)} 
// //           value={input} 
// //           rows={4}
// //           className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300' 
// //           placeholder="Describe what you want to see in the image..." 
// //           required
// //         />

// //         <p className='mt-4 text-sm font-medium'>Style</p>
// //         <div className='mt-3 flex gap-3 flex-wrap sm:max-w-[90%]'>
// //           {ImageStyle.map((item) => (
// //             <span 
// //               key={item}
// //               onClick={() => setSelectedStyle(item)} 
// //               className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${selectedStyle === item ? 'bg-purple-50 text-blue-700' : 'text-gray-500 border-gray-300'}`}
// //             >
// //               {item}
// //             </span>
// //           ))}
// //         </div>

// //         <div className='my-6 flex items-center gap-2'>
// //           <label className='relative inline-flex items-center cursor-pointer'>
// //             <input 
// //               type='checkbox' 
// //               checked={publish} 
// //               onChange={(e) => setPublish(e.target.checked)} 
// //               className='sr-only peer' 
// //             />
// //             <div className='w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-green-500 transition-colors'></div>
// //             <div className={`absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4`}></div>
// //           </label>
// //           <p className='text-sm'>Make this image Public</p>
// //         </div>

// //         <button 
// //           type="submit"
// //           disabled={loading}
// //           className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#C341F6] to-[#8E37EB] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer'
// //         >
// //           {loading ? <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span> : <Hash className='w-5' />}
// //           Generate Image
// //         </button>
// //       </form>

// //       <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]'>
// //         <div className='flex items-center gap-3'>
// //           <Edit className='w-5 h-5 text-[#8E37EB]'/>
// //           <h1 className='text-xl font-semibold'>Generated Images</h1>
// //         </div>

// //         {content ? (
// //           <div className='mt-3 h-full overflow-y-scroll flex flex-wrap gap-3'>
// //             {content.map((imgUrl, index) => (
// //               <img key={index} src={imgUrl} alt="Generated" className='w-full rounded-md border border-gray-300' />
// //             ))}
// //           </div>
// //         ) : (
// //           <div className='flex-1 flex justify-center items-center'>
// //             <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
// //               <Edit className='w-9 h-9'/>
// //               <p>Enter a prompt and click "Generate Image" to get started</p>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   )
// // }

// // export default GenerateImages

// import { Sparkles, Edit, Hash } from "lucide-react";
// import React, { useState } from "react";
// import { toast } from "react-toastify";
// import axios from "axios";

// const BACKEND_URL = import.meta.env.VITE_BASE_URL;
// console.log("Axios Base URL:", axios.defaults.baseURL);




// const GenerateImages = () => {

//   const ImageStyle = [
//     "Realistic",
//     "Ghibli style",
//     "Anime style",
//     "Cartoon style",
//     "Fantasy style",
//     "Realistic style",
//     "3D style",
//     "Portrait style",
//   ];

//   const [selectedStyle, setSelectedStyle] = useState("Realistic");
//   const [input, setInput] = useState("");
//   const [publish, setPublish] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [content, setContent] = useState("");

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         toast.error("You are not logged in!");
//         setLoading(false);
//         return;
//       }

//       const prompt = `Generate an image of ${input} in the style ${selectedStyle}`;

//       const { data } = await axios.post(`https://quick-ai-project-1.onrender.com/api/ai/generate-image`,
//         { prompt, publish },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       if (data.success) {
//         setContent(data.content); // same as generate-article
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message || "Something went wrong");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
//       <form
//         onSubmit={onSubmitHandler}
//         className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200"
//       >
//         <div className="flex items-center gap-3">
//           <Sparkles className="w-6 text-[#00AD25]" />
//           <h1 className="text-xl font-semibold">AI Image Generator</h1>
//         </div>

//         <p className="mt-6 text-sm font-medium">Describe Your Image</p>
//         <textarea
//           onChange={(e) => setInput(e.target.value)}
//           value={input}
//           rows={4}
//           className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
//           placeholder="Describe what you want to see in the image..."
//           required
//         />

//         <p className="mt-4 text-sm font-medium">Style</p>
//         <div className="mt-3 flex gap-3 flex-wrap sm:max-w-[90%]">
//           {ImageStyle.map((item) => (
//             <span
//               key={item}
//               onClick={() => setSelectedStyle(item)}
//               className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${selectedStyle === item
//                   ? "bg-purple-50 text-blue-700"
//                   : "text-gray-500 border-gray-300"
//                 }`}
//             >
//               {item}
//             </span>
//           ))}
//         </div>

//         <div className="my-6 flex items-center gap-2">
//           <label className="relative inline-flex items-center cursor-pointer">
//             <input
//               type="checkbox"
//               checked={publish}
//               onChange={(e) => setPublish(e.target.checked)}
//               className="sr-only peer"
//             />
//             <div className="w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-green-500 transition-colors"></div>
//             <div
//               className={`absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4`}
//             ></div>
//           </label>
//           <p className="text-sm">Make this image Public</p>
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#C341F6] to-[#8E37EB] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer"
//         >
//           {loading ? (
//             <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
//           ) : (
//             <Hash className="w-5" />
//           )}
//           Generate Image
//         </button>
//       </form>

// //       <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]">
// //         <div className="flex items-center gap-3">
// //           <Edit className="w-5 h-5 text-[#8E37EB]" />
// //           <h1 className="text-xl font-semibold">Generated Images</h1>
// //         </div>

// //         {content ? (
//           <div className="mt-3 h-full overflow-y-scroll">
//             <img
//               src={content}
//               alt="Generated"
//               className="w-full rounded-md border border-gray-300"
//             />
//           </div>
//         ) : (
//           <div className="flex-1 flex justify-center items-center">
//             <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
//               <Edit className="w-9 h-9" />
//               <p>Enter a prompt and click "Generate Image" to get started</p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default GenerateImages;




// async function GenerateImages(req, res){
//   try {
//     const { userId } = req.auth;
//     const { prompt, publish } = req.body;

//     // ⭐ REPLACED ONLY THIS PART → Gemini image generation
//     const response = await axios.post(
//       "https://generativelanguage.googleapis.com/v1beta/images:generate?key=" + process.env.GEMINI_API_KEY,
//       {
//         'prompt': { text: prompt }
//       }
//     );

//     const base64Image =
//       response.data.generatedImages?.[0]?.image?.base64 ||
//       response.data.generatedImages?.[0]?.image;

//     // Everything else below remains EXACTLY the same ⬇️

//     const image = await cloudinary.uploader.upload(
//       `data:image/png;base64,${base64Image}`
//     );

//     const { secure_url } = image;

//     await sql`
//       INSERT INTO creations(user_id, prompt, content, type, publish)
//       VALUES(${userId}, ${prompt}, ${secure_url}, 'image', ${publish ?? false})
//     `;

//     res.json({
//       success: true,
//       content: secure_url,
//     });
//   } catch (error) {
//     console.log("AI generation error:", error);

//     const placeholderImage = "https://via.placeholder.com/512?text=Image+Unavailable";
//     res.json({
//       success: false,
//       message: "Failed to generate image",
//       content: placeholderImage,
//     });
//   }
// };
// export default GenerateImages;





import { Sparkles, Edit, Hash } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BASE_URL;
console.log("Axios Base URL:", axios.defaults.baseURL);




const GenerateImages = () => {

  const ImageStyle = [
    "Realistic",
    "Ghibli style",
    "Anime style",
    "Cartoon style",
    "Fantasy style",
    "Realistic style",
    "3D style",
    "Portrait style",
  ];

  const [selectedStyle, setSelectedStyle] = useState("Realistic");
  const [input, setInput] = useState("");
  const [publish, setPublish] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You are not logged in!");
        setLoading(false);
        return;
      }

      const prompt = `Generate an image of ${input} in the style ${selectedStyle}`;

      const { data } = await axios.post(`https://quick-ai-project-1.onrender.com/api/ai/generate-image`,
        { prompt, publish },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        setContent(data.content); // same as generate-article
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#00AD25]" />
          <h1 className="text-xl font-semibold">AI Image Generator</h1>
        </div>

        <p className="mt-6 text-sm font-medium">Describe Your Image</p>
        <textarea
          onChange={(e) => setInput(e.target.value)}
          value={input}
          rows={4}
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
          placeholder="Describe what you want to see in the image..."
          required
        />

        <p className="mt-4 text-sm font-medium">Style</p>
        <div className="mt-3 flex gap-3 flex-wrap sm:max-w-[90%]">
          {ImageStyle.map((item) => (
            <span
              key={item}
              onClick={() => setSelectedStyle(item)}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${selectedStyle === item
                ? "bg-purple-50 text-blue-700"
                : "text-gray-500 border-gray-300"
                }`}
            >
              {item}
            </span>
          ))}
        </div>

        <div className="my-6 flex items-center gap-2">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={publish}
              onChange={(e) => setPublish(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-green-500 transition-colors"></div>
            <div
              className={`absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4`}
            ></div>
          </label>
          <p className="text-sm">Make this image Public</p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#C341F6] to-[#8E37EB] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer"
        >
          {loading ? (
            <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
          ) : (
            <Hash className="w-5" />
          )}
          Generate Image
        </button>
      </form>

    <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]">
<div className="flex items-center gap-3">
         <Edit className="w-5 h-5 text-[#8E37EB]" />
           <h1 className="text-xl font-semibold">Generated Images</h1>
       </div>

         {content ? (
          <div className="mt-3 h-full overflow-y-scroll">
            <img
              src={content}
              alt="Generated"
              className="w-full rounded-md border border-gray-300"
            />
          </div>
        ) : (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              <Edit className="w-9 h-9" />
              <p>Enter a prompt and click "Generate Image" to get started</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateImages;


