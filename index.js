const fs = require('fs');
const http = require('http');
const url = require('url');

const replaceTemplate = require('./modules/replaceTemplate');

// const productData = fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (err, data) => JSON.parse(data));
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);
const overviewTemplate = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8');
const productTemplate = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');
const cardTemplate = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8');

const server = http.createServer((req, res) =>
{
  const { pathname, query } = url.parse(req.url, true);
  
  if  (pathname === '/' || pathname === '/overview')
  {
    const productCards = dataObj.map(product => replaceTemplate(cardTemplate, product));
    const overview = overviewTemplate.replace('{%PRODUCT_CARDS%}', productCards.join(''));

    return res.writeHead(200, { 'Content-type': 'text/html' }).end(overview);
  }
  else if (pathname === '/products')
  {
    const product = dataObj.find(el => el.id === +query.id);
    let productDetails = replaceTemplate(productTemplate, product);

    return res.writeHead(200, { 'Content-type': 'text/html' }).end(productDetails);
  }
  else if (pathname === '/api')
  {
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(data);
  }
  else
  {
    res.writeHead(404, { 'Content-type': 'text/html', 'my-custom-header': 'Team zV' });
    res.end('<h1>404: Page not found! 💣</h1>');
  }
});

const port = process.env.PORT || 8000;
server.listen(port, '127.0.0.1', () => console.log(`Listening on port ${port}...`));