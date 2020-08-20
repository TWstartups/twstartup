import Company from './model'

export default {
  create: async (req, res) => {
    res.status(200)
  },
  edit: async (req, res) => {
    console.log('in edit')
    const toEdit = req.body
    console.log(toEdit)
    try {
      const editedCompany = await Company.findByIdAndUpdate(req.params.id, toEdit, { new: true })
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
  }

}
