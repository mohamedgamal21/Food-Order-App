import express from 'express';
import bodyParser from 'body-parser';
import { promises as fs } from 'node:fs';

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
// app.use('/images', express.static('public/images'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/meals', async (req, res) => {
  try {
    const meals = await fs.readFile('./data/available-meals.json', 'utf8');
    res.json(JSON.parse(meals));
  } catch (error) {
    res.status(500).json({ message: 'Failed to load meals' });
  }
});

app.post('/orders', async (req, res) => {
  const orderData = req.body.order;

  if (!orderData || !orderData.items || orderData.items.length === 0) {
    return res.status(400).json({ message: 'Missing data.' });
  }

  const { email, name, street, 'postal-code': postalCode, city } = orderData.customer;

  if (!email || !email.includes('@') || !name?.trim() || !street?.trim() || !postalCode?.trim() || !city?.trim()) {
    return res.status(400).json({
      message: 'Missing data: Email, name, street, postal code, or city is missing.',
    });
  }

  const newOrder = { ...orderData, id: (Math.random() * 1000).toString() };

  try {
    const orders = await fs.readFile('./data/orders.json', 'utf8');
    const allOrders = JSON.parse(orders);
    allOrders.push(newOrder);
    await fs.writeFile('./data/orders.json', JSON.stringify(allOrders));
    res.status(201).json({ message: 'Order created!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to process order' });
  }
});

app.use((req, res) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  res.status(404).json({ message: 'Not found' });
});

app.listen(3000);


