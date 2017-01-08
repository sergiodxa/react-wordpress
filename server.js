const express = require('express');
const next = require('next');
const LRUCache = require('lru-cache');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dir: '.', dev });
const handle = app.getRequestHandler();

const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60,
});

function renderAndCache(req, res, pagePath, queryParams) {
  if (ssrCache.has(req.url)) {
    console.log(`CACHE HIT: ${req.url}`);
    res.send(ssrCache.get(req.url));
    return;
  }

  app.renderToHTML(req, res, pagePath, queryParams)
    .then((html) => {
      console.log(`CACHE MISS: ${req.url}`);
      ssrCache.set(req.url, html);

      res.send(html);
    })
    .catch((err) => {
      app.renderError(err, req, res, pagePath, queryParams);
    });
}

app.prepare()
.then(() => {
  const server = express();

  server.get('/p/:id/:slug', (req, res) => {
    return renderAndCache(req, res, '/post', Object.assign(
      req.query,
      req.params
    ));
  });

  server.get('/', (req, res) => {
    return renderAndCache(req, res, '/', req.query);
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
})
.catch(error => {
  console.error(error);
  process.exit(0);
});
