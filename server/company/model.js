const mongoose = require('mongoose')
const Schema = mongoose.Schema

const newsSchema = new mongoose.Schema({
  og_title: {
    type: String,
    default: ""
  },
  og_description: {
    type: String,
    default: ""
  },
  og_image: {
    type: String,
    default: ""
  },
  note: {
    type: String,
    default: ""
  },
  link: {
    type: String,
    default: ""
  }
})

const eventSchema = new mongoose.Schema({
  location: {
    type: String,
    default: ""
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
    type: String,
    default: ""
  },
  link: {
    type: String,
    default: ""
  }
})

const executiveSchema = new mongoose.Schema({
  title: {
    type: String,
    default: ""
  },
  firstName: {
    type: String,
    default: ""
  },
  lastName: {
    type: String,
    default: ""
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
    type: String,
    default: ""
  },
  companyNameChi: {
    type: String,
    default: ""
  },
  introduction: {
    type: String,
    default: ""
  },
  website: {
    type: String,
    default: ""
  },
  pitch_deck: {
    typs: String
  },
  companyEmail: {
    type: String,
    default: ""
  },
  key_point: [{
    type: String,
    default: ""
  }],
  funding_status: {
    type: String,
    default: ""
  },
  category: [{
    type: String,
    default: ""
  }],
  logo: {
    type: String,
    default: "https://i.imgur.com/m5kOMUt.png"
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
    type: String,
    default: ""
  },
  videoLink: {
    type: String,
    default: ""
  },
  socialLinks: {
    facebook: "",
    instagram: "",
    linkedIn: "",
    twitter: "",
    angelList: "",
    crunchbase: ""
  }
})

const Company = mongoose.model('Company', CompanySchema)

module.exports = Company
