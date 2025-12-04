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
import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  // Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("dashboard-items")) || [];
    setItems(saved);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("dashboard-items", JSON.stringify(items));
  }, [items]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (input.trim() === "") return;

    if (editIndex !== null) {
      const updated = [...items];
      updated[editIndex] = input;
      setItems(updated);
      setEditIndex(null);
    } else {
      setItems([...items, input]);
    }

    setInput("");
  };

  const handleDelete = (i) => {
    setItems(items.filter((_, index) => index !== i));
  };

  const handleEdit = (i) => {
    setInput(items[i]);
    setEditIndex(i);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-10 flex justify-center">
      <div className="backdrop-blur-xl bg-white/20 p-8 rounded-3xl shadow-2xl max-w-2xl w-full border border-white/30">
        
        {/* Title */}
        <h1 className="text-4xl font-bold text-white drop-shadow mb-8 text-center">
          ✨ Your Dashboard
        </h1>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex gap-3 mb-6 p-4 bg-white/30 backdrop-blur-lg rounded-xl border border-white/40 shadow"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-3 rounded-xl border border-white/50 bg-white/60 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-purple-300 outline-none"
            placeholder="Add something..."
          />
          <button
            className="px-6 py-3 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-semibold transition transform hover:scale-105"
          >
            {editIndex !== null ? "Update" : "Add"}
          </button>
        </form>

        {/* List */}
        <div className="space-y-4">
          {items.length === 0 && (
            <p className="text-white/80 text-center text-lg">No items yet.</p>
          )}

          {items.map((item, i) => (
            <div
              key={i}
              className="flex justify-between items-center p-5 bg-white/30 backdrop-blur-lg rounded-xl border border-white/40 shadow hover:shadow-lg transition"
            >
              <span className="text-white text-lg font-medium">{item}</span>

              <div className="flex gap-4">
                <button
                  onClick={() => handleEdit(i)}
                  className="text-blue-200 hover:text-blue-100 font-semibold"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(i)}
                  className="text-red-300 hover:text-red-200 font-semibold"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
