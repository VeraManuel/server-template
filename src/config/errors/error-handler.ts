import { NextFunction, Request, Response } from 'express';
import Error from './error.model';
import { GeneralError } from './general-error.model';

const notFound = (req: Request, res: Response) => {
  const error: GeneralError = {
    errors: [new Error('Not Found', 'notFound')],
    statusCode: 404,
    message: `${req.path} was not found`,
  };
  res.status(404).json(error);
};

const errorUnhandled = (err: any, res: Response) => {
  const code: number = err.status || 500;
  const body: GeneralError = {
    errors: [new Error(err.message, err.key)],
    statusCode: code,
    message: err.message,
  };
  res.status(code).json(body);
};

const handleErrors = (
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => errorUnhandled(err, res);

const handle = (app: any) => {
  app.use(notFound);
  app.use(handleErrors);
};

export default handle;
