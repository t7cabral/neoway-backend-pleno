
'use strict';

import { Router } from 'express';
const path = require('path')
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
    tempFileDir: path.resolve(__dirname, '../../storage')
  }),
  validate_file_upload,
  FileController.upload);

export default router;
