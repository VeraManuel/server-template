import Error from './error.model';

export interface GeneralError {
  errors: Error[];
  statusCode: number;
  message: string;
}
