const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CandidateSchema = mongoose.Schema({
  company_name_en: {
    type: String,
  },
  company_name_chi: {
    type: String,
  },
  website: {
    type: String,
  },
  company_email: {
    type: String,
  },
  news:{
    type: String,
  },
  other: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  approve_status:{
    type: String
  },
  applicant:{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Candidate = mongoose.model("Candidate", CandidateSchema);

module.exports = Candidate;
