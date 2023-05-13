import fastify from 'fastify';
import next from 'next';

import health from './actuator/health';

const port = parseInt(process.env.PORT) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = fastify({
    ignoreTrailingSlash: true,
    logger: true,
  });

  server.get('/actuator/health', health);

  server.get('/', (_req, res) => {
    // This duplicates the logic in src/pages/index.tsx, but that has stopped working for some reason
    res.redirect('/dashboard');
  });

  server.get('/*', (req, res: any) => {
    handle(req.req, res.res);
  });

  server.listen(port, '0.0.0.0', (err) => {
    if (err) {
      throw err;
    }

    // eslint-disable-next-line no-console
    console.log(`> Ready on http://localhost:${port}`);
  });
});
