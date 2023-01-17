import { NextFunction, Request, Response, Router } from 'express';
import helloService from '../services/hello.service';

class HelloRoute {
  public router = Router();

  constructor() {
    this.createRoutes();
  }

  createRoutes(): void {
    this.router.get('/', this.handleHello.bind(this));
  }

  private handleHello(req: Request, res: Response, next: NextFunction) {
    helloService
      .helloEndpoint()
      .then((response) => res.json(response))
      .catch((err) => next(err));
  }
}

export default new HelloRoute().router;
