import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  try {
    const { firstname,lastname, email, phoneNumber, password, role } = req.body;
    if (!firstname || !lastname  || !email || !phoneNumber || !password || !role || firstname.trim() === "" || lastname.trim() === "" || email.trim() === "" || phoneNumber === "" || password.trim() === "" || role === "") {
      return res.json({
        message: "Something is missing",
        success: false,
      });
    }
    if(firstname.length < 3 || lastname.length < 3){
      return res.json({
        message: "First name and last name must be at least 3 characters long",
        success: false,
      });
    }
    if(email.length<7 || email.length>50 || email.includes(" ") || !email.includes("@") || !email.includes(".")){
      return res.json({
        message: "Invalid email",
        success: false,
      });
    }
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!strongPasswordRegex.test(password)) {
      return res.json({
        message: "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
        success: false,
      });
    }
    if (!["recruiter", "employee"].includes(role)) {
      return res.json({
        message: "Invalid role",
        success: false,
      });
    }
    if(phoneNumber.length < 10 || phoneNumber.length > 15 || isNaN(phoneNumber)){
      return res.json({
        message: "Invalid phone number",
        success: false,
      });
    }

    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return res.json({
        message: "user already exist",
        success: false,
      });
    }
    const fullname = {
      firstname,
      lastname,
    }
    const hash =await bcrypt.hash(password, 10);

    const createduser = await User.create({
     fullname,
      email,
      phoneNumber,
      password: hash,
      role,
    }); 
    const token = jwt.sign({ userId: createduser._id},process.env.JWT_SECRET,{
      expiresIn: "1d",
    });
    
   const { password: pass, ...user } = createduser._doc; 
    res.json({
      message: "registered successfully",
      success: true,
      user,
      token,
    });
  } catch (error) {
    return res.json({
      message: error.message,
      success: false,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.json({
        message: "Something is missing",
        success: false,
      });
    }
    
    let fetcheduser = await User.findOne({ email }).select("+password");
    
    if (!fetcheduser) {
      return res.json({
        message: "Incorrect email or password",
        success: false,
      });
    }
   
    const isPasswordMatch = await bcrypt.compare(password,fetcheduser.password);
    
    if (!isPasswordMatch) {
      return res.json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    if (role !== fetcheduser.role) {
      return res.json({
        message: "Account doesn't exist with current role.",
        success: false,
      });
    }

    const token = jwt.sign(
      {
        userId: fetcheduser._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    const { password:pass, ...user } = fetcheduser._doc; 
    return res
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.fullname.firstname}`,
        success: true,
        user
      });
  } catch (error) {
    return res.json({
      message: error.message,
      success: false,
    });
  }
};

const logout = async (req, res) => {
  try {
    return res
      .cookie("token", "", {
        maxAge: 0,
      })
      .json({
        message: "Logged out Successfully",
        success: true,
      });
  } catch (error) {
    return res.json({
      message: error.message,
      success: false,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { firstName ,lastName , email, phoneNumber, bio, skills } = req.body;
    const file = req.file;

    // Cloudinary

    let skillsArray; 
    if (skills) {
      skillsArray = skills.split(",");
    }
      
    const userId = req.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.json({
        message: "user not found",
        success: false,
      });
    }
    // Updated Data
    if (firstName) user.fullname.firstName = firstName;
    if (lastName) user.fullname.lastName = lastName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    // resume

    await user.save();

    const {password ,...rest} = user._doc; 

    return res.json({
      message: `Profile Updated SuccessFully`,
      success: true,
     rest
    });
  } catch (error) {
    return res.json({
      message: error.message,
      success: false,
    });
  }
};
const updatePassword = async(req,res)=>{
  try {    
    const {id} = req.params;    
    const { confirmPassword } = req.body;
    if ( !confirmPassword || confirmPassword.trim() ==='') {
      return res.json({
        message: "Something is missing",
        success: false,
      });
    }
    
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    if(!strongPasswordRegex.test(confirmPassword)) {
      return res.json({
        message: "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
        success: false,
      });
    }
    const user =await User.findById(id).select("+password");
    
    if (!user) {
      return res.json({
        message: "user not found",
        success: false,
      });
    }
    const checkHash = await bcrypt.compare(confirmPassword, user.password);
    
    if(checkHash){
       return res.json({
        message: "Don't gave old password",
        success: false,
      });
    }

    const hash = await bcrypt.hash(confirmPassword, 10);
    if (!hash) {
      return res.json({
        message: "Failed to hash password",
        success: false,
      });
    }
    const updatedUser = await User.findByIdAndUpdate(id, { password: hash }, { new: true });
    if (!updatedUser) {
      return res.json({
        message: "Failed to update password",
        success: false,
      });
    }
    
    const { password:hashed, ...rest}= updatedUser._doc;
    return res.json({
      message: "Password updated successfully",
      success: true,
      rest,
    });
  } catch (error) {
    return res.json({
      message: error.message,
      success: false,
    });
    
  }
}
export { register, login, logout, updateProfile ,updatePassword};
