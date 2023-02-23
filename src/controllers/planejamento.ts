import { Controller, Get, Post, Middleware, Delete, Put } from '@overnightjs/core';
import { Request, Response } from 'express';
import { PlanejamentoModel } from '../models/planejamento';

@Controller('finance')
export class FinanceController{
  @Post('create')
  public async createFinance(req: Request, res: Response): Promise<void> {
    try{
      const planejamentoModel = new PlanejamentoModel(req.body);
      const result = await planejamentoModel.save();
      res.status(201).send(true);
    }catch(error){
      res.status(500).send({msg: 'Error to create new finance', error: error})
    }
  }
  @Get('findAll')
  public async findAll(req: Request, res: Response): Promise<void>{
    try{
      const response = await PlanejamentoModel.find()
      if(!response){
        res.status(404).send('Not exists registers')
      }
      res.status(200).send(response)
    }catch(error){
      res.send(500).send('Error to find finances registers')
    }
  }

  @Put('editOne/:id')
  public async editOne(req: Request, res: Response): Promise<void> {
    try{
      const { id } = req.params;
      const financeUpdated = await PlanejamentoModel.findByIdAndUpdate(id, req.body);
      if(!financeUpdated){
        res.status(404).send('Not exist register by Id informed')
      }
      res.status(200).send(financeUpdated)
    }catch(error){
      res.status(500).send('Error in edit register')
    }
  }

  @Delete('deleteOne/:id')
  public async deleteOne(req: Request, res: Response): Promise<void> {
    try{
      const { id } = req.params;
      const financeDeleted = await PlanejamentoModel.findByIdAndDelete(id);
      if(!financeDeleted){
        res.status(404).send('Not exist register by Id informed')
      }
      res.status(200).send({message: 'Finance Delete with Sucess'})
    }catch(error){
      res.status(500).send('Error to delete register')
    }
  }
}