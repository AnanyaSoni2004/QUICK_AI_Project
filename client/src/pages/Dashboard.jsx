// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Dashboard = () => {
//   const [creations, setCreations] = useState([]);
//   const [filter, setFilter] = useState("article");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const token = localStorage.getItem("token"); // <-- JWT stored after login

//   const fetchCreations = async () => {
//     try {
//       setLoading(true);

//       const res = await axios.get("http://localhost:5000/api/creations", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setCreations(res.data);
//       setLoading(false);
//     } catch (err) {
//       setError("Failed to load creations.");
//       setLoading(false);
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchCreations();
//   }, []);

//   // Filter creations by type (article/image/etc)
//   const filteredData = creations.filter((c) => c.type === filter);

//   return (
//     <div className="p-10">
//       <h1 className="text-2xl font-semibold mb-5">Dashboard</h1>

//       {/* Summary Cards */}
//       <div className="flex gap-5 mb-8">
//         <div className="border p-5 rounded-lg w-52 shadow">
//           <p>Total Creations</p>
//           <h2 className="text-3xl font-bold">{creations.length}</h2>
//         </div>

//         <div className="border p-5 rounded-lg w-52 shadow">
//           <p>Active Plan</p>
//           <h2 className="text-3xl font-bold">Free</h2>
//         </div>
//       </div>

//       {/* Filter Dropdown */}
//       <div className="flex justify-between items-center mb-5">
//         <select
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//           className="border p-2 rounded"
//         >
//           <option value="article">ARTICLE</option>
//           <option value="image">IMAGE</option>
//           <option value="blog">BLOG</option>
//         </select>

//         <span className="text-gray-500">
//           Showing {filteredData.length} of {creations.length}
//         </span>
//       </div>

//       {/* Loading */}
//       {loading && <p>Loading...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       {/* No Data */}
//       {!loading && filteredData.length === 0 && (
//         <p className="text-gray-500 text-center mt-10">No creations found.</p>
//       )}

//       {/* Display Creations */}
//       <div className="grid grid-cols-2 gap-5 mt-5">
//         {filteredData.map((item) => (
//           <div
//             key={item._id}
//             className="border p-4 rounded-lg shadow bg-white"
//           >
//             <h3 className="font-semibold mb-2">{item.prompt}</h3>
//             <p className="text-sm text-gray-700">{item.content}</p>

//             <div className="text-xs text-gray-400 mt-3">
//               Type: {item.type} • {new Date(item.createdAt).toLocaleString()}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
// import React, { useState, useEffect } from "react";

// const Dashboard = () => {
//   const [items, setItems] = useState([]);
//   const [input, setInput] = useState("");
//   const [editIndex, setEditIndex] = useState(null);

//   // Load from localStorage
//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem("dashboard-items")) || [];
//     setItems(saved);
//   }, []);

//   // Save to localStorage
//   useEffect(() => {
//     localStorage.setItem("dashboard-items", JSON.stringify(items));
//   }, [items]);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (input.trim() === "") return;

//     if (editIndex !== null) {
//       const updated = [...items];
//       updated[editIndex] = input;
//       setItems(updated);
//       setEditIndex(null);
//     } else {
//       setItems([...items, input]);
//     }

//     setInput("");
//   };

//   const handleDelete = (i) => {
//     setItems(items.filter((_, index) => index !== i));
//   };

//   const handleEdit = (i) => {
//     setInput(items[i]);
//     setEditIndex(i);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-10 flex justify-center">
//       <div className="backdrop-blur-xl bg-white/20 p-8 rounded-3xl shadow-2xl max-w-2xl w-full border border-white/30">
        
//         {/* Title */}
//         <h1 className="text-4xl font-bold text-white drop-shadow mb-8 text-center">
//           ✨ Your Dashboard
//         </h1>

//         {/* Form */}
//         <form
//           onSubmit={handleSubmit}
//           className="flex gap-3 mb-6 p-4 bg-white/30 backdrop-blur-lg rounded-xl border border-white/40 shadow"
//         >
//           <input
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             className="flex-1 p-3 rounded-xl border border-white/50 bg-white/60 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-purple-300 outline-none"
//             placeholder="Add something..."
//           />
//           <button
//             className="px-6 py-3 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-semibold transition transform hover:scale-105"
//           >
//             {editIndex !== null ? "Update" : "Add"}
//           </button>
//         </form>

//         {/* List */}
//         <div className="space-y-4">
//           {items.length === 0 && (
//             <p className="text-white/80 text-center text-lg">No items yet.</p>
//           )}

//           {items.map((item, i) => (
//             <div
//               key={i}
//               className="flex justify-between items-center p-5 bg-white/30 backdrop-blur-lg rounded-xl border border-white/40 shadow hover:shadow-lg transition"
//             >
//               <span className="text-white text-lg font-medium">{item}</span>

//               <div className="flex gap-4">
//                 <button
//                   onClick={() => handleEdit(i)}
//                   className="text-blue-200 hover:text-blue-100 font-semibold"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(i)}
//                   className="text-red-300 hover:text-red-200 font-semibold"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Dashboard;





// import React, { useState, useEffect } from "react";

// const Dashboard = () => {
//   const [items, setItems] = useState([]);
//   const [input, setInput] = useState("");
//   const [editIndex, setEditIndex] = useState(null);

//   const [type, setType] = useState("text"); // NEW → dropdown
//   const [imageFile, setImageFile] = useState(null); // for image uploads

//   // Load items on page load
//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem("dashboard-items")) || [];
//     setItems(saved);
//   }, []);

//   // Save to localStorage
//   useEffect(() => {
//     localStorage.setItem("dashboard-items", JSON.stringify(items));
//   }, [items]);

//   // Convert image to Base64
//   const convertToBase64 = (file) =>
//     new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result);
//       reader.onerror = (err) => reject(err);
//     });

//   // Add / Update item
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (input.trim() === "" && !imageFile) return;

//     let img = null;

//     if (type === "image" && imageFile) {
//       img = await convertToBase64(imageFile);
//     }

//     const newItem = {
//       text: input,
//       type,
//       image: img,
//       createdAt: new Date().toISOString(),
//     };

//     if (editIndex !== null) {
//       const updatedItems = [...items];
//       updatedItems[editIndex] = newItem;
//       setItems(updatedItems);
//       setEditIndex(null);
//     } else {
//       setItems([...items, newItem]);
//     }

//     setInput("");
//     setImageFile(null);
//     setType("text");
//   };

//   const handleDelete = (index) => {
//     setItems(items.filter((_, i) => i !== index));
//   };

//   const handleEdit = (index) => {
//     const item = items[index];
//     setInput(item.text);
//     setType(item.type);
//     setEditIndex(index);
//   };

//   return (
//     <div className="p-10 max-w-xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6">Dashboard – Simple CRUD</h1>

//       {/* Form */}
//       <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-5 p-4 border rounded-lg shadow">
        
//         {/* Dropdown Menu */}
//         <select
//           value={type}
//           onChange={(e) => setType(e.target.value)}
//           className="border p-2 rounded"
//         >
//           <option value="text">Text</option>
//           <option value="image">Image</option>
//         </select>

//         {/* Text Input */}
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           className="border p-2 rounded"
//           placeholder="Enter something..."
//         />

//         {/* Image Upload Only If Type = Image */}
//         {type === "image" && (
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setImageFile(e.target.files[0])}
//             className="border p-2 rounded"
//           />
//         )}

//         <button className="bg-blue-600 text-white px-4 py-2 rounded">
//           {editIndex !== null ? "Update" : "Add"}
//         </button>
//       </form>

//       {/* Item List */}
//       <div className="space-y-3">
//         {items.length === 0 && (
//           <p className="text-gray-500">No items added yet.</p>
//         )}

//         {items.map((item, i) => (
//           <div
//             key={i}
//             className="p-3 border rounded flex justify-between items-center shadow"
//           >
//             <div>
//               <span className="font-semibold">{item.text}</span>

//               {item.type === "image" && item.image && (
//                 <img
//                   src={item.image}
//                   alt="uploaded"
//                   className="w-40 mt-2 rounded border"
//                 />
//               )}

//               <p className="text-xs text-gray-500 mt-1">
//                 Added on: {new Date(item.createdAt).toLocaleString()}
//               </p>
//             </div>

//             <div className="flex gap-4">
//               <button onClick={() => handleEdit(i)} className="text-blue-600">
//                 Edit
//               </button>
//               <button onClick={() => handleDelete(i)} className="text-red-600">
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");
  const [type, setType] = useState("text");
  const [file, setFile] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");

  // Load saved items on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("dashboard-items")) || [];
    setItems(saved);
  }, []);

  // Update localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("dashboard-items", JSON.stringify(items));
  }, [items]);

  // Add or update item
  const handleSubmit = (e) => {
    e.preventDefault();

    if (type === "text" && input.trim() === "") return;
    if ((type === "image" || type === "resume") && !file) return;

    let newItem = {
      type,
      text: type === "text" ? input : "",
      file: type !== "text" ? file : null,
      createdAt: new Date().toISOString(),
    };

    if (editIndex !== null) {
      const updated = [...items];
      updated[editIndex] = newItem;
      setItems(updated);
      setEditIndex(null);
    } else {
      setItems([...items, newItem]);
    }

    // Reset fields
    setInput("");
    setFile(null);
    setType("text");
  };

  // Delete item
  const handleDelete = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  // Edit item (opens form at top)
  const handleEdit = (index) => {
    const item = items[index];
    setType(item.type);
    setInput(item.text || "");
    setFile(item.file || null);
    setEditIndex(index);
  };

  // Search + Sort
  const filteredItems = items
    .filter((item) => {
      if (item.type === "text") {
        return item.text.toLowerCase().includes(search.toLowerCase());
      } else {
        return item.type.toLowerCase().includes(search.toLowerCase());
      }
    })
    .sort((a, b) => {
      if (sort === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
    });

  return (
    <div className="p-10 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Personal Dashboard</h1>

      {/* Search + Sort */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search..."
          className="border p-2 rounded w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="border p-5 rounded-lg shadow mb-6">
        <h3 className="font-semibold text-lg mb-3">
          {editIndex !== null ? "Update Item" : "Add New Item"}
        </h3>

        {/* Type Dropdown */}
        <select
          className="border p-2 rounded w-full mb-3"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="text">Text</option>
          <option value="image">Image</option>
          <option value="resume">Resume</option>
        </select>

        {/* Text Input */}
        {type === "text" && (
          <input
            type="text"
            placeholder="Enter text..."
            className="border p-2 rounded w-full mb-3"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        )}

        {/* Image / Resume Upload */}
        {type !== "text" && (
          <input
            type="file"
            className="border p-2 rounded w-full mb-3"
            onChange={(e) => {
              const selected = e.target.files[0];
              if (selected) {
                selected.preview = URL.createObjectURL(selected);
                setFile(selected);
              }
            }}
          />
        )}

        {/* Preview */}
        {type === "image" && file && (
          <img
            src={file.preview}
            alt="preview"
            className="w-32 h-32 object-cover rounded mb-3"
          />
        )}

        {type === "resume" && file && (
          <div className="p-3 bg-gray-200 rounded mb-3">
            <p className="font-semibold">{file.name}</p>
            <p className="text-xs text-gray-600">Resume uploaded</p>
          </div>
        )}

        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </form>

      {/* Items List */}
      <div className="space-y-4">
        {filteredItems.length === 0 && (
          <p className="text-gray-500">No items found.</p>
        )}

        {filteredItems.map((item, index) => (
          <div
            key={index}
            className="p-4 border rounded shadow flex justify-between items-center"
          >
            <div>
              {item.type === "text" && (
                <p className="text-lg">{item.text}</p>
              )}

              {item.type === "image" && (
                <img
                  src={item.file.preview}
                  alt="uploaded"
                  className="w-32 h-32 object-cover rounded"
                />
              )}

              {item.type === "resume" && (
                <div className="p-3 bg-gray-100 rounded">
                  <p className="font-medium">{item.file.name}</p>
                  <a
                    href={item.file.preview}
                    download={item.file.name}
                    className="text-blue-600 text-sm underline"
                  >
                    Download Resume
                  </a>
                </div>
              )}

              <span className="text-xs text-gray-500 block mt-1">
                {new Date(item.createdAt).toLocaleString()}
              </span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleEdit(index)}
                className="text-blue-600"
              >
                Update
              </button>

              <button
                onClick={() => handleDelete(index)}
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
