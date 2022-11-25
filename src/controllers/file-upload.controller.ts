import {authenticate} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {
  post,
  Request,
  requestBody,
  Response,
  RestBindings,
} from '@loopback/rest';
import multer from 'multer';
import path from 'path';
import {FILE_UPLOAD_SERVICE} from '../keys';
import {FileUploadHandler} from '../types';

@authenticate('jwt')
export class FileUploadController {
  /**
   * Constructor
   * @param handler - Inject an express request handler to deal with the request
   */
  constructor(
    @inject(FILE_UPLOAD_SERVICE) private handler: FileUploadHandler,
  ) {}
  @post('/files', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Files and fields',
      },
    },
  })
  async fileUpload(
    @requestBody.file()
    request: Request,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ): Promise<object> {
    const destination = path.join(
      __dirname,
      `../../${process.env.FOLDER_UPLOAD}`,
    );
    let fileNameSave = '';
    const multerOptions: multer.Options = {
      storage: multer.diskStorage({
        destination,
        filename: (req, file, cb) => {
          const extArray = file.mimetype.split('/');
          const extension = extArray[extArray.length - 1];
          fileNameSave =
            file.originalname.split('.')[0] +
            '-' +
            Date.now() +
            '.' +
            extension;
          cb(null, fileNameSave);
        },
      }),
    };
    const upload = multer(multerOptions);
    return new Promise<object>((resolve, reject) => {
      upload.any()(request, response, err => {
        if (err) return reject(err);
        resolve(FileUploadController.getFilesAndFields(request, fileNameSave));
      });
    });
  }

  /**
   * Get files and fields for the request
   * @param request - Http request
   */
  private static getFilesAndFields(request: Request, fileNameSave: string) {
    const uploadedFiles = request.files;
    const mapper = (f: globalThis.Express.Multer.File) => ({
      fieldname: f.fieldname,
      originalname: f.originalname,
      encoding: f.encoding,
      mimetype: f.mimetype,
      size: f.size,
    });
    let files: object[] = [];
    if (Array.isArray(uploadedFiles)) {
      files = uploadedFiles.map(mapper);
    } else {
      for (const filename in uploadedFiles) {
        files.push(...uploadedFiles[filename].map(mapper));
      }
    }
    return {files, fields: request.body, path: fileNameSave};
  }
}
