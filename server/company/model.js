const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompanySchema = mongoose.Schema({
  company_name_en: {
    type: String,
  },
  company_name_chi: {
    type: String,
  },
  website: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  company_email: {
    type: String,
  },
  events:[{
    type: Schema.Types.ObjectId,
    ref: 'Event'
  }],
  news:[{
    type: Schema.Types.ObjectId,
    ref: 'News'
  }],
  owners:[{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
});

const Company = mongoose.model("Company", CompanySchema);

module.exports = Company;
