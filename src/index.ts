import { SetupServer } from './server'

(async (): Promise<void> => {
  const server = new SetupServer(3001);
  await server.init();
  server.start();
})();