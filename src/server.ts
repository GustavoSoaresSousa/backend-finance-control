import { Server } from '@overnightjs/core';
import { Application, NextFunction, Request, Response } from 'express';
import { connect as mongooseConnect, connection } from 'mongoose';
import { FinanceController } from './controllers/planejamento'
import dotenv from 'dotenv';
dotenv.config();

import bodyParser from 'body-parser';
import cors from 'cors'


export class SetupServer extends Server {
  constructor(private port = 8080) {
    super();
  }

  public async init(): Promise<void> {
    this.setupExpress();
    this.setupControllers();
    await this.databaseSetup()
  }

  private setupExpress(): void {
    this.app.use(bodyParser.json());
    this.app.use(cors({origin: '*'}))
    this.setupControllers();
  }

  private setupControllers(): void {
    const financeController = new FinanceController();
    this.addControllers([financeController]);
  }

  public getApp(): Application {
    return this.app;
  }

  private async databaseSetup(): Promise<void> {
    const url = process.env.DATABASE
    await mongooseConnect(url as string)
  }

  public async close(): Promise<void> {
    await connection.close()
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log('Server Listening on port:' + this.port)
    })
  }
}
