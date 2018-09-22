const port = process.env.PORT || 5000;
const httpServer = require('http-server');
let server = httpServer.createServer({});
server.listen(port, '0.0.0.0', function () {
  console.log(`Listening on port ${port}. Hit CTRL-C to stop the server.`);
});
