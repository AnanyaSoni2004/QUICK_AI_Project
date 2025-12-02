import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sql from '../config/db.js'
export const getUserCreations = async (req,res)=>{
  try{
    const {userId}=req.auth()

    const creations=await sql `SELECT * FROM creations WHERE user_id=${userId} ORDER BY
    created_at DESC`;
     res.json({success:true,creations})

  }catch(error){
    res.json({success:false,message:error.message})
  }
}
export const getPublishedCreations = async (req,res)=>{
  try{

    const creations=await sql `SELECT * FROM creations WHERE publish= true ORDER BY
    created_at DESC`;
    res.json({success:true,creations})

  }catch(error){
    res.json({success:false,message:error.message})
  }
}

export const toggleLikeCreation = async (req,res)=>{
  try{
    const {userId}=req.auth()
    const {id}=req.body
    const [creation]=await sql `SELECT * FROM creations WHERE id=${id}`

    if(!creation){
      return res.json({success:false,message:"creation not found"})
    }

    const currentLikes=creation.likes;
    const userIdStr= userId.toString()
    let updatedLikes;
    let message;

    if(currentLikes.includes(useridStr)){
      updatedLikes=currentLikes.filter((user=>user !== userIdStr));
      message='Creation Unliked'
    }else{
      updatedLikes=[...currentLikes, userIdStr]
      message= 'Creation Liked'
    }

    const formattedArray= `{${updatedLikes.json(',')}}`
    await sql`UPDATED creations SET likes = ${formattedArray}::text[] WHERE id=${id}`

    res.json({success:true,message})

  }catch(error){
    res.json({success:false,message:error.message})
  }
}


export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });

    res.json({ message: "Signup successful", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
