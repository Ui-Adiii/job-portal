import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  try {
    const { firstName,lastName, email, phoneNumber, password, role } = req.body;
    if (!firstName || !lastName  || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return res.status(400).json({
        message: "user already exist",
        success: false,
      });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      fullname:{
        firstName,
        lastName,
      },
      email,
      phoneNumber,
      password: hash,
      role,
    });
    res.status(201).json({
      message: "registered successfully",
      success: true,
      user,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with current role.",
        success: false,
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    const { password, ...rest } = user._doc; // Exclude password from the response
    user = { ...rest, token }; // Add token to the user object
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        success: true,
        user
      });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", {
        maxAge: 0,
      })
      .json({
        message: "Logged out Successfully",
        success: true,
      });
  } catch (error) {
    return res.status(400).json({
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
      return res.status(400).json({
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

    return res.status(200).json({
      message: `Profile Updated SuccessFully`,
      success: true,
     rest
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};
const updatePassword = async(req,res)=>{
  try {
    const {id} = req.params;
    const { newPassword } = req.body;
    if ( !newPassword) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    const user = User.findById(id);
    if (!user) {
      return res.status(400).json({
        message: "user not found",
        success: false,
      });
    }
    const hash = bcrypt.hash(password, 10);
    user.password = hash;
    const updatedUser = await User.findByIdAndUpdate(id, { password: hash }, { new: true });
    const { password, ...rest}= updatedUser._doc;
    if (!updatedUser) {
      return res.status(400).json({
        message: "Failed to update password",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Password updated successfully",
      success: true,
      rest,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      success: false,
    });
    
  }
}
export { register, login, logout, updateProfile ,updatePassword};
