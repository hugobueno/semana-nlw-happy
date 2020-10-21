import express from 'express'
import OrphanagesController from './controllers/OrphanagesController'
import multer from 'multer'
import uploadConfig from './configs/upload'

const router = express.Router()
const upload = multer(uploadConfig)



router.post('/orphanage', upload.array('images') , OrphanagesController.create)
router.get('/orphanage', OrphanagesController.index)
router.get('/orphanage/:id', OrphanagesController.show)

export default router

