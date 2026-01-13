import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";




// Sign-up a new User
export const signup = async(req, res)=>{
    const{fullName , email , password , bio} = req.body;
    try{
        if(!fullName || !email || !password || !bio){
            return res.json({
                success:false,
                message:"Missing Details"
            })
        }
        const user = await User.findOne({email});
        if(user){
            return res.json({
                success: false,
                message: "Account Already Exists"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const newUser = await User.create({
            fullName, email , password: hashedPassword , bio 
        });

        const token = generateToken(newUser._id) 
        res.json({
            success:true,
            userData: newUser,
            token,
            message: "Account Created Successfully"
        })

    }catch(error){
        console.log(error.message);
        res.json({
            success:false,
            message:`Account could not be created ${error.message}`
        })
    }
}




// Controller to Login a User

export const Login = async(req, res)=>{
    try{
        const {email , password} = req.body;
        const userData = await User.findOne({email});

        const isPasswordCorrect = await bcrypt.compare(password , userData.password);

        if(!isPasswordCorrect){
            return res.json({
                success:false,
                message: "Password is Incorrect"
            });
        }

        const token = generateToken(userData._id);
        res.json({
            success:true,
            userData, 
            token , 
            message:"Login Successful"
        });
    }catch(error){
        console.log(error.message);
        res.json({
            success:false,
            message:`Account could not be created ${error.message}`
        })
    }
}




// Controller to check whether user is authenticated

export const checkAuth =(req , res)=>{
    res.json({
        success:true,
        user: req.user
    });
}



// Controller to update User profile details 

export const updateProfile= async(req, res)=>{
    try{
        const {profilePic , bio , fullName} = req.body;

        const userId = req.user._id;

        let updatedUser;
        if(!profilePic){
            updatedUser = await User.findById(userId, {bio, fullName},{new:true});
        }else{
            const uploadedPic = await cloudinary.uploader.upload(profilePic);


            updatedUser = await User.findByIdAndUpdate(userId,{
                profilePic:uploadedPic.secure_url,
                bio,
                fullName  
            },{new:true});
        }

        res.json({
            success:true,
            user:updatedUser
        })

    }catch(error){
        console.log(error.message);
        res.json({
            success:false,
            message: error.message
        });
    }
}