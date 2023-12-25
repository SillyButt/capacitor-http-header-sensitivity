const http = require('http');

function requestListener(req, res) {
  const data = {
    name: 'Alex',
    age: 27,
    hasExistentialCrisis: true,
  }

  switch (req.url) {
    case '/content-type-camel-case':
      res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:3000' });
      res.end(JSON.stringify(data));
      break;

    case '/content-type-lower-case':
      res.writeHead(200, { 'content-type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:3000' });
      res.end(JSON.stringify(data));
      break;

    default:
      res.writeHead(404);
      break;
  }
}

const server = http.createServer(requestListener);

const [host, port] = ['192.168.100.3', 8000];
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});


