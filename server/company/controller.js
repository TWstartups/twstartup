import Company from './model';

export default {
  create: async (req, res) => {
    res.status(200);
  },
  edit: async (req, res) => {
    console.log('in edit')
    const toEdit = req.body.formValues;
    try {
      const editedCompany = await Company.findByIdAndUpdate(req.params.id, toEdit)
      res.status(200).json({company: editedCompany})
    } catch(err) {
      console.log(err);
      res.status(500).json({message: "Somthing went wrong when updating company"});
    }
   
  },
  show: async (req, res) => {
    try {
      const foundCompany = await Company.findById(req.params.id);
      res.status(200).json({company:foundCompany});
    } catch(err) {
      res.status(500).json({message: "something went wrong when getting the company info"});
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