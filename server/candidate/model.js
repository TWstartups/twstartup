const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CandidateSchema = mongoose.Schema({
  companyNameEn: {
    type: String
  },
  companyNameChi: {
    type: String
  },
  website: {
    type: String
  },
  companyEmail: {
    type: String
  },
  news: {
    type: String
  },
  other: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  approve_status: {
    type: Boolean
  },
  applicant: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  approver: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

const Candidate = mongoose.model('Candidate', CandidateSchema)

module.exports = Candidate
