import Company from './model'
import _ from 'lodash'


export default {
  create: async (req, res) => {
    res.status(200)
  },
  edit: async (req, res) => {
    console.log('in edit')
    const toEdit = req.body
    console.log(toEdit)
    try {
      console.log('helpoooo')
      const editedCompany = await Company.findByIdAndUpdate(req.params.id, toEdit, { new: true })
      console.log('edit company', editedCompany)
      res.status(200).json({ company: editedCompany })
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: 'Somthing went wrong when updating company' })
    }
  },
  show: async (req, res) => {
    try {
      const foundCompany = await Company.findById(req.params.id)
      res.status(200).json({ company: foundCompany })
    } catch (err) {
      res.status(500).json({ message: 'something went wrong when getting the company info' })
    }
  },
  showAll: async (req, res) => {
    try {
      const allCompany = await Company.find()
      res.status(200).json({ companies: allCompany })
    } catch (err) {
      res.status(500).json({ message: 'something went wrong when getting all company data' })
    }
  },
  imgUpload: async (req, res) => {
    console.log('in img upload')
    const imgURL = req.image
    const { companyId, type } = req.query
    // type = logo || bannerImg || executive
    const { exeIndex } = req.query ? req.query : ''
    try {
      const findCompany = await Company.findById(companyId)

      if (!findCompany) {
        res.status(500).json({ message: 'cannot find the company, try again' })
      }
      if (type === 'logo') {
        findCompany.logo = imgURL
      } else if (type === 'bannerImg') {
        findCompany.bannerImg = imgURL
      } else if (type === 'executive') {
        findCompany.executives[exeIndex].image = imgURL
      }
      await findCompany.save()

      res.status(200).json({ result: imgURL })
    } catch (err) {
      res.status(500).json({ message: 'something went wrong when saving the image' })
    }
  },
  addEvent: async (req, res) => {
    console.log('in add event')
    const toEdit = req.body
    console.log(toEdit)
    try {
      console.log('helpoooo')
      const editedCompany = await Company.findById(req.params.id)
      editedCompany.events.push(toEdit)
      await editedCompany.save()
      const updatedCompany = await Company.findById(req.params.id)
      console.log('edit company', updatedCompany)
      res.status(200).json({ company: updatedCompany })
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: 'Somthing went wrong when adding event' })
    }
  },
  deleteEvent: async (req, res) => {
    console.log('delete event')
    try {
      console.log('start')
      const companyToUpdate = await Company.findById(req.params.compId)
      const newEvents = companyToUpdate.events
      for (let i = 0; i < newEvents.length; i++) {
        const event = newEvents[i];
        if (event._id == req.params.eventId) {
          newEvents.splice(i,1)
        }
      }
      console.log(newEvents)
      companyToUpdate.events = newEvents
      await companyToUpdate.save()
      const updatedCompany = await Company.findById(req.params.compId)
      res.status(200).json({ company: updatedCompany })
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: 'Somthing went wrong when deleting Event' })
    }
  }
}
