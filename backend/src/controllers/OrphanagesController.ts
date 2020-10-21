import { Request, Response } from 'express'
import OrPhanetes from '../models/orphaneges'

export default {
    async create(req: Request, res: Response) {
        try {
            const {
                name,
                latitude,
                longitude,
                about,
                instructions,
                open_on_weekends,
                open_hours
            } = req.body

            const files = req.files as Express.Multer.File[]

            let dateImages = files.map((element) => {
                return {                   
                    path: `http://localhost:3004/uploads/${element.filename}` ,
                }
            })

            const createOrphanage = await OrPhanetes.create(
                {
                    name,
                    latitude,
                    longitude,
                    about,
                    instructions,
                    open_on_weekends,
                    open_hours,
                    images: dateImages
                })

            res.status(201).json(createOrphanage)
        } catch (error) {
            console.log(`Error to Create Orphanage ${error}`)
            res.status(401).json({ Error: "Error to Create Orphanage" })
        }
    },
    async index(req: Request, res: Response) {
        try {

            const listOrphanages = await OrPhanetes.find()
            res.status(200).json(listOrphanages)
            console.log(listOrphanages)
        } catch (error) {
            console.log(`Error to list Orphanage ${error}`)
            res.status(401).json({ Error: "Error to list Orphanage" })
        }
    },
    async show(req: Request, res: Response) {
        try {
            const { id } = req.params
            const listOrphanage = await OrPhanetes.findById({ _id: id })
            console.log(listOrphanage)
            res.status(200).json(listOrphanage)

        } catch (error) {
            console.log(`Error to list Orphanage ${error}`)
            res.status(401).json({ Error: "Error to list Orphanage" })
        }
    },
}