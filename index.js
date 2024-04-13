const express = require('express');
const app = express();

// The service port. In production the frontend code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

app.use(express.static('public'));

const apiRouter = express.Router();
app.use(`/api`, apiRouter);

apiRouter.get('/vehicles', async (_req, res) => {
  let vehicles = await getVehicles();
  res.send(vehicles);
});

apiRouter.post('/vehicle-add', (req, res) => {
  addVehicles(req.body).catch(console.error);
});

apiRouter.post('/vehicle-delete', (req, res) => {
  res.send(JSON.stringify(deleteVehicles(req.body)));
});

app.use((_req, res) => { res.sendFile('index.html', { root: 'public' }); });

app.listen(port, () => { console.log(`Listening on port ${port}`); });

const { MongoClient, ServerApiVersion } = require('mongodb');
const config = require('dbConfig.json');

async function addVehicles(vehicle) {
  const uri = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
  const client = new MongoClient(uri);
  const db = client.db('testDatabase');
  const testCollection = db.collection('testCollection');
  await testCollection.insertOne(vehicle);
}

async function deleteVehicles(vehicle) {
  let vehicleIndex = vehicles.indexOf(vehicle);
  const vehiclesIterator = vehicles.entries();
  vehicles = [];
  for (let vehicleInList of vehiclesIterator) { if (vehicleInList[1].ListingID.localeCompare(vehicle.ListingID) !== 0) { vehicles.push(vehicleInList[1]); } }
  return vehicles;
}

async function getVehicles() {
  const uri = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  const client = new MongoClient(uri);
  const db = client.db('testDatabase');
  const testCollection = db.collection('testCollection');
  let vehicles = new Array();
  async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
      const cursor = testCollection.find();
      const allItems = await cursor.toArray();
      allItems.forEach((i) => vehicles.push(i));
      await client.close();
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  await run().catch((ex) => {
    console.log(`Unable to connect to database with ${uri} because ${ex.message}`);
    process.exit(1);
  });
  return JSON.stringify(vehicles);
}