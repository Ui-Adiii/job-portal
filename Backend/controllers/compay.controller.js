import Company from "../models/comany.model.js";

const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "CompanyName is required",
        success: false,
      });
    }
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "You can't Register same company",
        success: false,
      });
    }
    company = await Company.create({
      userId: req.id,
      name: companyName,
    });
    return res.status(201).json({
      message: "Company registered SuccessFully",
      success: true,
      company,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    if (!userId) {
      return res.status(400).json({
        message: "CompanyName is required",
        success: false,
      });
    }
    const companies = await Company.find({ userId }).select('-userId');
    if (!companies) {
      return res.status(404).json({
        message: 'Company not Found',
        success: false,
      });
    }
    return res.status(200).json({
      message: 'Companies are',
      companies,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
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
      return res.status(400).json({
        message: 'Company Not Found',
        success: false,
      });
    }
    return res.status(200).json({
      message: 'Company Found',
      company,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
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
      return res.status(400).json({
        success: false,
        message:"Company not Found"
      })
    }

    if (name) company.name = name;
    if (description) company.description = description;
    if (website) company.website = website;
    if (location) company.location = location;
    await company.save();
    
    return res.status(200).json({
      message: 'Company Updated SuccessFully',
      success: true,
      company
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      success: false,
    });
  }
}

export { registerCompany, getCompany, getCompanyById, updateCompany };
