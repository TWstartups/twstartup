import Company from './model';

export default {
  create: async (req, res) => {
    res.status(200);
  },
  edit: async (req, res) => {
    res.status(200);
  },
  show: async (req, res) => {
    res.status(200);
  },
  showAll: async (req, res) => {
    res.status(200).json({message: 'get all company'});
  }
 
}