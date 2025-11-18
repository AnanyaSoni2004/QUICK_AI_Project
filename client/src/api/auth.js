export const login = async({email,password})=>{
    const response  = await fetch("http://localhost:5001/api/auth/login",{
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify({email,password}),
        method:"POST"
    });
    return response.json()
}

// export const register = async({username,email,password})=>{
//     const response  = await fetch("http://localhost:3000/api/auth/signup",{
//         headers:{
//             "Content-type":"application/json"
//         },
//         body:JSON.stringify({username,email,password}),
//         method:"POST"
//     });
//     return response.json()
// }

export const register = async ({ username, email, password }) => {
    const response = await fetch("http://localhost:5000/api/auth/signup", {
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
      method: "POST",
    });
    return response.json();
  };
  
