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
  fromDay: {
    type: Number
  },
  fromMonth: {
    type: Number
  },
  toDay: {
    type: Number
  },
  toMonth: {
    type: Number
  },
  eventName: {
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
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  link: {
    type: String,
    default: 'https://www.linkedin.com/'
  },
  image: {
    type: String,
    default: 'https://i.imgur.com/6WUcB60.jpg'
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
