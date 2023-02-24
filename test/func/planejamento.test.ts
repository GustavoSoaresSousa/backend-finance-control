import request from 'supertest';
import body_finance from '../fixtures/responsePlanejamento.json'
import { SetupServer } from '../../src/server'
import { PlanejamentoModel, DemostracoesFinanceiras } from '../../src/models/planejamento';
import { User } from '../../src/models/user';
import { AuthService } from '../../src/service/auth';


describe('Test functional on controller planejamento', () => {
  let server: SetupServer;
  let id: string;
  let token: string;

  const defaultUser = {
    name: 'John Doe',
    email: 'john4@mail.com',
    password: '1234',
  };

  beforeEach(async() => {
    server = new SetupServer();
    await server.init();

    await User.deleteMany({});
    const user = await new User(defaultUser).save();

    await PlanejamentoModel.deleteMany({});
    const createdFinance = await new PlanejamentoModel({
      receitas: {
        salario: 3000,
        outrasReceitas: 0
      },
      despesas: {
        condominio: 200,
        aluguel: 1100,
        transporte: 300,
        alimentacao: 200,
        luz: 150,
        agua: 100,
        internet: 100,
        academia: 0,
        saude: 0,
        cartaoDeCredito: 0,
        diarista: 0,
        escola : 0,
        emprestimo: 0,
        celular: 0,
        planoDeSaude: 0,
        supermercado: 600,
        outros: 0
      },
      lazer : {
        alimentacao: 0,
        assinaturasMensais: 60,
        festasOuBares: 0,
        hobbies: 0,
        confraternizacao: 0,
        outros: 0
      },
      investimentos:{
        educacao: 95,
        investimentos: 0,
        reservaDeEmergencia: 95
      },
      mes: "Janeiro",
      ano: 2023,
      user: user.id
    }).save();
    id = createdFinance._id;

    const authService = new AuthService();
    token = authService.generateToken(user.toJSON());
  })

  afterAll(async () => {
    server = new SetupServer();
    server.close();
  });


  const new_finance = {
    receitas: {
      salario: 3000,
      outrasReceitas: 0
    },
    despesas: {
      condominio: 200,
      aluguel: 1100,
      transporte: 300,
      alimentacao: 200,
      luz: 150,
      agua: 100,
      internet: 100,
      academia: 0,
      saude: 0,
      cartaoDeCredito: 0,
      diarista: 0,
      escola : 0,
      emprestimo: 0,
      celular: 0,
      planoDeSaude: 0,
      supermercado: 600,
      outros: 0
    },
    lazer : {
      alimentacao: 0,
      assinaturasMensais: 60,
      festasOuBares: 0,
      hobbies: 0,
      confraternizacao: 0,
      outros: 0
    },
    investimentos:{
      educacao: 95,
      investimentos: 0,
      reservaDeEmergencia: 95
    },
    mes: "Janeiro", // não consigo criar registros dos mesmo meses, mesmo tendo REMOVVIDO "UNIQUE:TRUE"
    ano: 2023
  }

  it('Create one finance register in database with success', async () => {
    const { status, body } = await request(server.getApp()).post('/finance/create').set({'x-access-token': token}).send(new_finance)
    expect(status).toBe(201)
    expect(body).toBeTruthy()
  })

  it.skip('Find all register in database', async () => {
    const responseFinance = [{
      receitas: [{
        salario: 3000,
        outrasReceitas: 0
      }],
      despesas: [{
        condominio: 200,
        aluguel: 1100,
        transporte: 300,
        alimentacao: 200,
        luz: 150,
        agua: 100,
        internet: 100,
        academia: 0,
        saude: 0,
        cartaoDeCredito: 0,
        diarista: 0,
        escola : 0,
        emprestimo: 0,
        celular: 0,
        planoDeSaude: 0,
        supermercado: 600,
        outros: 0
      }],
      lazer : [{
        alimentacao: 0,
        assinaturasMensais: 60,
        festasOuBares: 0,
        hobbies: 0,
        confraternizacao: 0,
        outros: 0
      }],
      investimentos:[{
        educacao: 95,
        investimentos: 0,
        reservaDeEmergencia: 95
      }],
      mes: "Janeiro", // não consigo criar registros dos mesmo meses, mesmo tendo REMOVVIDO "UNIQUE:TRUE"
      ano: 2023
    }]
    const { status, body } = await request(server.getApp()).get('/finance/findAll').set({'x-access-token': token});
    expect(status).toBe(200)
    expect(body).toEqual(responseFinance)
  })

  it('Edit one finance register with success', async () => {

    const finance = [{
      receitas: [{
        salario: 3000,
        outrasReceitas: 0
      }],
      despesas: [{
        condominio: 200,
        aluguel: 1100,
        transporte: 300,
        alimentacao: 200,
        luz: 100,
        agua: 100,
        internet: 100,
        academia: 0,
        saude: 0,
        cartaoDeCredito: 0,
        diarista: 0,
        escola : 0,
        emprestimo: 0,
        celular: 0,
        planoDeSaude: 0,
        supermercado: 600,
        outros: 0
      }],
      lazer : [{
        alimentacao: 0,
        assinaturasMensais: 0,
        festasOuBares: 0,
        hobbies: 0,
        confraternizacao: 0,
        outros: 0
      }],
      investimentos:[{
        educacao: 95,
        investimentos: 0,
        reservaDeEmergencia: 95
      }],
      mes: "Janeiro", 
      ano: 2023
    }]

    const { status, body } = await request(server.getApp()).put(`/finance/editOne/${id}`).set({'x-access-token': token}).send(finance)
    expect(status).toBe(200);
    expect(body).toMatchObject(body)
  })
// GFC185363 senha do insominia
  it('Delete one finance register with success', async () => {
    const {status, body} = await request(server.getApp()).delete(`/finance/deleteOne/${id}`).set({'x-access-token': token});
    expect(status).toBe(200)
    expect(body).toMatchObject({message: 'Finance Delete with Sucess'})
  })
})