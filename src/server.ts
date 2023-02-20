import { Server } from '@overnightjs/core';
import { Application, NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'


export class SetupServer extends Server {
  constructor(private port = 8080) {
    super();
  }

  public async init(): Promise<void> {
    this.setupExpress();
    this.setupControllers();
  }

  private setupExpress(): void {
    this.app.use(bodyParser.json());
    this.app.use(cors({origin: '*'}))
    this.setupControllers();
  }

  private setupControllers(): void {
    //this.addControllers([gameController, userController]);
  }

  public getApp(): Application {
    return this.app;
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log('Server Listening on port:' + this.port)
    })
  }
}