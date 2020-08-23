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
    default: "John"
  },
  lastName: {
    type: String,
    default: "Dow"
  },
  link: {
    type: String,
    default: 'https://www.linkedin.com/'
  },
  image: {
    type: String,
    default: 'https://i.imgur.com/DyEHkEe.png'
  }
})

const socialLinkSchema = new mongoose.Schema({
  facebook: { type: String, default: "https://facebook.com"},
  instagram: { type: String, default: "https://instagram.com"},
  linkedIn: { type: String, default: "https://linkedin.com"},
  twitter: { type: String, default: "https://twitter.com"},
  angelList: { type: String, default: "https://angellist.com"},
  crunchbase:{ type: String, default:  "https://crunchbase.com"}
})

const CompanySchema = mongoose.Schema({
  companyNameEn: {
    type: String,
    default: "[Company Name]"
  },
  companyNameChi: {
    type: String,
    default: ""
  },
  introduction: {
    type: String,
    default: "One liner goes here. (limit to 15 words)"
  },
  website: {
    type: String,
    default: "https://www.google.com/"
  },
  pitch_deck: {
    typs: String
  },
  companyEmail: {
    type: String,
    default: "mycompany@gmail.com"
  },
  keyPoints: [{
    type: String,
    default: "Here comes the key bullet points 1"
  },{
    type: String,
    default: "Here comes the key bullet points 2"
  },{
    type: String,
    default: "Here comes the key bullet points 3"
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
    default: "https://i.imgur.com/afZKccr.png"
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
    default: "https://i.imgur.com/dB33xAg.png"
  },
  videoLink: {
    type: String,
    default: ""
  },
  socialLinks: {
    facebook: { type: String, default: "https://facebook.com"},
    instagram: { type: String, default: "https://instagram.com"},
    linkedIn: { type: String, default: "https://linkedin.com"},
    twitter: { type: String, default: "https://twitter.com"},
    angelList: { type: String, default: "https://angellist.com"},
    crunchbase:{ type: String, default:  "https://crunchbase.com"}
  }
})

const Company = mongoose.model('Company', CompanySchema)

module.exports = Company
