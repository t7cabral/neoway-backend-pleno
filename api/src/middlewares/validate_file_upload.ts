'use strict';

import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

const save_file_to_storage = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const files: any = request.files;
    if (!files.file1) {
      return response
        .status(StatusCodes.BAD_REQUEST)
        .json({ error_code: 'ERR_FILE_NOT_FOUND', message: 'File not found' });
    }

    next();
  } catch (err: any) {
    return response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error_code: 'ERR_FILE_DEFAULT', message: 'Internal server error' });
  }
}

export default save_file_to_storage;
