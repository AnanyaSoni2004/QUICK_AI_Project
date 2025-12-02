// import React, { use, useState } from 'react'
// import { Scissors, Sparkles } from 'lucide-react'
// import axios from 'axios'
// import toast from 'react-toastify'

// axios.defaults.baseURL=import.meta.env.VITE_BASE_URL;

// const RemoveObject = () => {
//   const [file, setFile] = useState(null)
//   const [objectName, setObjectName] = useState('')
//   const [loading,setLoading]=useState(false)
//   const [content,setContent]=useState("")


//   const onSubmitHandler = async (e) => {
//     e.preventDefault()
//     try{
//       setLoading(true)
//       if(object.split(' ').length>1){
//         return toast('Please enter only one object name')
//       }

//       const formData=new FormData()
//       formData.append('image',input)

//       const {data}=await axios.post('/api/ai/remove-image-object',
//         formData,{headers:{Authorization:`Bearer ${token}`}}
//       )
//       if(data.success){
//         setContent(data.content)
//       }else{
//         toast.error(data.message)
//       }
//     }catch(error){
// toast.error(data.error)
//     }
//     console.log("File:", file)
//     console.log("Object to remove:", objectName)
//   }

//   return (
//     <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
//       <form
//         onSubmit={onSubmitHandler}
//         className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200"
//       >
//         <div className="flex items-center gap-3">
//           <Sparkles className="w-6 text-[#4A7AFF]" />
//           <h1 className="text-xl font-semibold">Object Removal</h1>
//         </div>

//         <p className="mt-6 text-sm font-medium">Upload image</p>
//         <input
//           onChange={(e) => setFile(e.target.files[0])}
//           type="file"
//           accept="image/*"
//           className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
//           required
//         />

//         <p className="mt-6 text-sm font-medium">Describe the object</p>
//         <textarea
//           onChange={(e) => setObjectName(e.target.value)}
//           value={objectName}
//           rows={4}
//           className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
//           placeholder="e.g., watch or spoon (only one object)"
//           required
//         />

//         <button disabled={loading} className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#417DF6] to-[#8E37EB] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer">
//           {loading?<span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span>:       <Scissors className="w-5" />}
   
//           Remove object
//         </button>
//       </form>

//       <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]">
//         <div className="flex items-center gap-3">
//           <Scissors className="w-5 h-5 text-[#8E37EB]" />
//           <h1 className="text-xl font-semibold">Processed Image</h1>
//         </div>
//         {!content?(
//           <div className="flex-1 flex justify-center items-center">
//           <div className="text-sm flex-col items-center gap-5 text-gray-400 flex">
//             <Scissors className="w-9 h-9" />
//             <p>Upload an image and click "Remove Object" to get started</p>
//           </div>
//         </div>
//         ):(
//           <img src={content} alt="image" className='mt-3 w-full h-full'/>
//         )}
        
//       </div>
//     </div>
//   )
// }

// export default RemoveObject


import React, { useState } from 'react';
import { Scissors, Sparkles } from 'lucide-react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
console.log("Axios Base URL:", axios.defaults.baseURL);

const RemoveObject = () => {
  const [file, setFile] = useState(null);
  const [objectName, setObjectName] = useState('');
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error("You are not logged in!");
        setLoading(false);
        return;
      }

      if (objectName.trim().split(' ').length > 1) {
        toast.error('Please enter only one object name');
        setLoading(false);
        return;
      }

      if (!file) {
        toast.error('Please upload an image');
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append('image', file);
      formData.append('object', objectName);

      const { data } = await axios.post('/api/ai/remove-image-object', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (data.success) {
        setContent(data.content);
        toast.success('Object removed successfully!');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || 'Something went wrong');
    }

    setLoading(false);
  };

  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
      <ToastContainer />
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#4A7AFF]" />
          <h1 className="text-xl font-semibold">Object Removal</h1>
        </div>

        <p className="mt-6 text-sm font-medium">Upload image</p>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          accept="image/*"
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
          required
        />

        <p className="mt-6 text-sm font-medium">Describe the object</p>
        <textarea
          onChange={(e) => setObjectName(e.target.value)}
          value={objectName}
          rows={4}
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
          placeholder="e.g., watch or spoon (only one object)"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#417DF6] to-[#8E37EB] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer"
        >
          {loading ? (
            <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span>
          ) : (
            <Scissors className="w-5" />
          )}
          Remove object
        </button>
      </form>

      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]">
        <div className="flex items-center gap-3">
          <Scissors className="w-5 h-5 text-[#8E37EB]" />
          <h1 className="text-xl font-semibold">Processed Image</h1>
        </div>

        {!content ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-sm flex-col items-center gap-5 text-gray-400 flex">
              <Scissors className="w-9 h-9" />
              <p>Upload an image and click "Remove Object" to get started</p>
            </div>
          </div>
        ) : (
          <img
            src={content}
            alt="Processed"
            className='mt-3 w-full h-full object-contain'
          />
        )}
      </div>
    </div>
  );
};

export default RemoveObject;
