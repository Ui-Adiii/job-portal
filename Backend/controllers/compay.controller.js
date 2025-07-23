import Company from "../models/company.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
const registerCompany = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId).select('+password');
    if(!user) {
      return res.json({
        message: "User not found",
        success: false,
      });
    }
    const { companyName ,password} = req.body;
    const isPasswordMatch = await bcrypt.compare(password,user.password);
    if(!isPasswordMatch){
      return res.json({
        message: "Incorrect password",
        success: false,
      });
    }
    if (!companyName) {
      return res.json({
        message: "CompanyName is required",
        success: false,
      });
    }
    if (!password) {
      return res.json({
        message: "Password is required",
        success: false,
      });
    }
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.json({
        message: "You can't Register same company",
        success: false,
      });
    }
    
    company = await Company.create({
      userId,
      name: companyName,
    });
    user.profile.company=company._id;
    await user.save();
    return res.json({
      message: "Company registered SuccessFully",
      success: true,
      company,
    });
  } catch (error) {
    return res.json({
      message: error.message,
      success: false,
    });
  }
};

const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    if (!userId) {
      return res.json({
        message: "CompanyName is required",
        success: false,
      });
    }
    const companies = await Company.find({ userId }).select('-userId');
    if (!companies) {
      return res.json({
        message: 'Company not Found',
        success: false,
      });
    }
    return res.json({
      message: 'Companies are',
      companies,
      success: true,
    });
  } catch (error) {
    return res.json({
      message: error.message,
      success: false,
    });
  }
};

const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.json({
        message: 'Company Not Found',
        success: false,
      });
    }
    return res.json({
      message: 'Company Found',
      company,
      success: true,
    });
  } catch (error) {
    return res.json({
      message: error.message,
      success: false,
    });
  }
}

const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;
        
    
    const company= await Company.findById(req.params.id)
    if (!company) {
      return res.json({
        success: false,
        message:"Company not Found"
      })
    }

    if (name) company.name = name;
    if (description) company.description = description;
    if (website) company.website = website;
    if (location) company.location = location;
    await company.save();
    
    return res.json({
      message: 'Company Updated SuccessFully',
      success: true,
      company
    })
  } catch (error) {
    return res.json({
      message: error.message,
      success: false,
    });
  }
}

export { registerCompany, getCompany, getCompanyById, updateCompany };
