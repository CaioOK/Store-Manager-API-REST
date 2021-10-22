const express = require('express');
const bodyParser = require('body-parser');
const ProductsController = require('./controllers/Products');
const errorMiddleware = require('./middlewares/error');

const app = express();
const PORT = process.env.PORT || 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(bodyParser.json());

app.get('/products', ProductsController.getAll);

app.get('/products/:id', ProductsController.findById);

app.post('/products', ProductsController.insertOne);

app.put('/products/:id', ProductsController.updateOne);

app.delete('/products/:id', ProductsController.deleteOne);

app.use(errorMiddleware);

app.listen(PORT, () => console.log(`Online, port: ${PORT}`));