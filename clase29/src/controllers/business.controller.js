import { businessService } from "../services/business.service.js";

class BusinessController {
    async findAllBusiness(req, res) {
        try {
            const allBusiness = await businessService.findAll()
            res.json({ message: 'All Business', allBusiness })
        } catch (error) {
            res.json({ message: 'Error', error })
        }

    }

    async findOneBusiness(req, res) {
        const { idBusiness } = req.params
        try {
            const oneBusiness = await businessService.findOne(idBusiness)
            res.json({ message: 'Business Found', oneBusiness })

        } catch (error) {
            res.json({ message: 'Error', error })
        }
    }

    async createBusiness(req, res) {
        const { name, products } = req.body
        if (!name || !products) {
            return res.json({ message: 'Incomplete Data' })
        }
        try {
            const newBusiness = await businessService.createOne({name, products})
            res.json({ message: 'Business Created', newBusiness })
        } catch (error) {
            res.json({ message: 'Error', error })
        }
    }

    async deleteBusiness(req, res) {
        const {idBusiness} = res.params
        try {
            const business = await businessService.deleteOne(idBusiness)
            res.json({ message: 'Business Deleted', business })
        } catch (error) {
            res.json({ message: 'Error', error })
        }
    }
}

export const businessController = new BusinessController()