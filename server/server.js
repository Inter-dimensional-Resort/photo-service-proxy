require('newrelic');
const express = require('express');
const proxy = require('http-proxy');
const cors = require('cors');
const app = express();
const PORT = 8080;
const apiProxy = proxy.createProxyServer();
const serverOne = 'http://localhost:3001',
  serverTwo = 'http://localhost:4007',
  serverThree = 'http://localhost:3007',
  serverFour = 'http://localhost:3002';

app.use(cors());

// app.use('/:id', express.static('public'));
app.use(express.static(path.join(__dirname, '/../public')));

app.all('/description/*', (req, res) => {
  console.log('Server 1');
  apiProxy.web(req, res, {target: serverOne});
});

app.all('/reviews/*', (req, res) => {
  console.log('Server 2');
  apiProxy.web(req, res, {target: serverTwo});
});

app.all('/reservation/*', (req, res) => {
  console.log('Server 3');
  apiProxy.web(req, res, {target: serverThree});
});

app.all('/photos/*', (req, res) => {
  console.log('Server 4');
  apiProxy.web(req, res, {target: serverFour});
});

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));


// app.use(cors());

// app.get('/photos/:id', (req, res) => {
//   const { id } = req.params;
//   res.redirect(`http://18.218.52.58:3001/photos/${id}`);
// })

// app.get('/listings/:id', (req, res) => {
//   const { id } = req.params;
//   res.redirect(`http://54.153.105.148:3002/listings/${id}`);
// })

// app.get('/reviews/:id/', (req, res) => {
//   const { id } = req.params;
//   res.redirect(`http://18.218.58.47:3004/reviews/${id}`);
// })

// app.use('/MoreHomes',
//   proxy({
//     target: 'http://3.14.81.50/MoreHomes',
//       pathRewrite: (path, req) => {
//         return path.split('/').slice(2).join('/');
//       }
//     })
// );

// app.use('/booking',
//   proxy({
//     target: 'http://52.53.211.152:3333/booking',
//       pathRewrite: (path, req) => {
//         return path.split('/').slice(2).join('/');
//       }
//     })
// );

// app.use('/room',
//   proxy({
//     target: 'http://52.53.211.152:3333/room',
//       pathRewrite: (path, req) => {
//         return path.split('/').slice(2).join('/');
//       }
//     })
// );

app.listen(port, () => {
    console.log('Server is listening on port 8080')
});