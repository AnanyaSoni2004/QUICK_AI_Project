// import { FileText, Sparkles,Eraser } from 'lucide-react'
// import React,{useState} from 'react'

// const ReviewResume = () => {
//   const [input, setInput] = useState('')
//     const onSubmitHandler = async (e) => {
//         e.preventDefault()
//     }
//   return (
//     <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
//             <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
//                 <div className='flex items-center gap-3'>
//                     <Sparkles className='w-6 text-[#00DA83]'/>
//                     <h1 className='text-xl font-semibold'>Resume Review</h1>
//                 </div>

//                 <p className='mt-6 text-sm font-medium'>Upload Resume</p>
//                 <input 
//                     onChange={(e) => setInput(e.target.files[0])} 
                   
//                     type="file" 
//                     accept='application/pdf'
//                     className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300' 
//                     required
//                 />

//                 <p className='text-xs text-gray-500 font-light mt-1'>Supports PDF resume only</p>

//                 <button className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#FF4938] to-[#FF4938] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer'>
//                     <FileText className='w-5'/>
//                     Review Resume
//                 </button>
//             </form>

//             <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]'>
//                 <div className='flex items-center gap-3'>
//                     <FileText className='w-5 h-5 text-[#8E37EB]'/>
//                     <h1 className='text-xl font-semibold'>Analysis Results</h1>
//                 </div>
//                 <div className='flex-1 flex justify-center items-center'>
//                     <div className='text-sm flex-col items-center gap-5 text-gray-400 flex'>
//                         <FileText className='w-9 h-9'/>
//                         <p>Upload a resume and click "Review Resume" to get started</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//   )
// }

// export default ReviewResume

import { FileText, Sparkles } from 'lucide-react';
import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const ReviewResume = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error('Please upload a PDF resume');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('You are not logged in!');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('resume', file);

      const { data } = await axios.post('/api/ai/resume-review', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (data.success) {
        setAnalysis(data.content);
        toast.success('Resume reviewed successfully!');
      } else {
        toast.error(data.message || 'Failed to review resume');
      }
    } catch (error) {
      toast.error(error.message || 'Something went wrong');
    }

    setLoading(false);
  };

  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
      <ToastContainer />

      <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
        <div className='flex items-center gap-3'>
          <Sparkles className='w-6 text-[#00DA83]' />
          <h1 className='text-xl font-semibold'>Resume Review</h1>
        </div>

        <p className='mt-6 text-sm font-medium'>Upload Resume</p>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type='file'
          accept='application/pdf'
          className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300'
          required
        />
        <p className='text-xs text-gray-500 font-light mt-1'>Supports PDF resume only</p>

        <button
          type='submit'
          disabled={loading}
          className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#FF4938] to-[#FF4938] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer'
        >
          {loading ? (
            <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span>
          ) : (
            <FileText className='w-5' />
          )}
          Review Resume
        </button>
      </form>

      <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px] mt-4'>
        <div className='flex items-center gap-3'>
          <FileText className='w-5 h-5 text-[#8E37EB]' />
          <h1 className='text-xl font-semibold'>Analysis Results</h1>
        </div>

        {analysis ? (
          <div className='mt-3 overflow-y-scroll'>
            <pre className='whitespace-pre-wrap text-sm text-gray-700'>{analysis}</pre>
          </div>
        ) : (
          <div className='flex-1 flex justify-center items-center'>
            <div className='text-sm flex-col items-center gap-5 text-gray-400 flex'>
              <FileText className='w-9 h-9' />
              <p>Upload a resume and click "Review Resume" to get started</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewResume;
