const mongoose = require('mongoose')
const Schema = mongoose.Schema

const newsSchema = new mongoose.Schema({
  og_title: {
    type: String
  },
  og_description: {
    type: String
  },
  og_image: {
    type: String
  },
  note: {
    type: String
  },
  link: {
    type: String
  }
})

const eventSchema = new mongoose.Schema({
  location: {
    type: String
  },
  from_time: {
    type: Date
  },
  to_time: {
    type: Date
  },
  event_name: {
    type: String
  },
  memo: {
    type: String
  },
  link: {
    type: String
  }
})

const executiveSchema = new mongoose.Schema({
  title: {
    type: String
  },
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  link: {
    type: String
  },
  image: {
    type: String,
    default: ''
  }
})

const CompanySchema = mongoose.Schema({
  companyNameEn: {
    type: String
  },
  companyNameChi: {
    type: String
  },
  introduction: {
    type: String
  },
  website: {
    type: String
  },
  pitch_deck: {
    typs: String
  },
  companyEmail: {
    type: String
  },
  key_point: [{
    type: String
  }],
  funding_status: {
    type: String
  },
  category: [{
    type: String
  }],
  logo: {
    type: String
  },
  events: [eventSchema],
  news: [newsSchema],
  owners: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  candidate: {
    type: Schema.Types.ObjectId,
    ref: 'Candidate'
  },
  executives: [executiveSchema],
  bannerImg: {
    type: String
  },
  video_link: {
    type: String
  }
})

const Company = mongoose.model('Company', CompanySchema)

module.exports = Company
