
'use strict';

import { Router } from 'express';
import validate_file_upload from '../middlewares/validate_file_upload';
import * as FileController from '../controllers/FileController';
const fileUpload = require('express-fileupload');

const router = Router();

router.post('/upload',
  fileUpload({
    createParentPath: true,
    debug: false,
    useTempFiles: true,
    preserveExtension: true,
    tempFileDir: './../storage'
  }),
  validate_file_upload,
  FileController.upload);

export default router;
