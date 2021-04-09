import express from 'express'
const formData = require("express-form-data")

import fileUploadController from '../modules/fileUpload/controller/fileUpload.controller'

const uploadDir: any = process.env['UPLOAD_FOLDER']
const options = {
  uploadDir: uploadDir,
  autoClean: false
}
// var multer  = require('multer')
// var upload = multer({ dest: 'uploads/' })
const router = express.Router()

const fileString = '/fileUpload'
router.post(fileString, formData.parse(options), (req, res, next)=> {
  fileUploadController.upload(req, res, next)
})

const downloadString = '/download'
router.get(downloadString, (req, res, next)=> {
  fileUploadController.download(req, res, next)
})

export default router