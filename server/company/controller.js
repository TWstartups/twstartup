import Company from './model';

export default {
  create: async (req, res) => {
    res.status(200);
  },
  edit: async (req, res) => {
    res.status(200);
  },
  show: async (req, res) => {
    try {
      const foundCompany = await Company.findById(req.params.id);
      res.status(200).json({company:foundCompany});
    } catch(err) {
      res.status(200);
    }
  },
  showAll: async (req, res) => {
    try{
      const allCompany = await Company.find();
      res.status(200).json({companies:allCompany});
    } catch (err) {
      res.status(500).json({message:"something went wrong when getting all company data"});
    }
  }
 
}