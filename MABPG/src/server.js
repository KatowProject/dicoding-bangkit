const Hapi = require('@hapi/hapi');

const routes = require('./routes');
const port = 9000;

const init = async () => {
  const server = Hapi.server({
    port,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routes);

  await server.start();

  console.log('\x1b[33m%s\x1b[0m', `Server running on ${server.info.uri} 🚀`);
};

init();
