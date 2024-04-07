const express = require('express');
const app = express();

// The service port. In production the frontend code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

app.use(express.static('public'));

const apiRouter = express.Router();
app.use(`/api`, apiRouter);

let vehicles = new Array();

apiRouter.get('/vehicles', (_req, res) => {
  res.send(JSON.stringify(vehicles));
});

apiRouter.post('/vehicle-add', (req, res) => {
  let currentVehicles = addVehicles(req.body);
  main(currentVehicles[0]).catch(console.error);;
  res.send(JSON.stringify(currentVehicles));
});

apiRouter.post('/vehicle-delete', (req, res) => {
  res.send(JSON.stringify(deleteVehicles(req.body)));
});

app.use((_req, res) => { res.sendFile('index.html', { root: 'public' }); });

app.listen(port, () => { console.log(`Listening on port ${port}`); });

function addVehicles(vehicle) {
  vehicles.push(vehicle);
  return vehicles;
}

function deleteVehicles(vehicle) {
  let vehicleIndex = vehicles.indexOf(vehicle);
  const vehiclesIterator = vehicles.entries();
  vehicles = [];
  for (let vehicleInList of vehiclesIterator) { if (vehicleInList[1].ListingID.localeCompare(vehicle.ListingID) !== 0) { vehicles.push(vehicleInList[1]); } }
  return vehicles;
}


const { MongoClient, ServerApiVersion } = require('mongodb');
const config = require('dbConfig.json');

async function main(input) {
  const uri = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  const client = new MongoClient(uri);
  const db = client.db('testDatabase');
  const testCollection = db.collection('testCollection');
  async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch((ex) => {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  });
  await testCollection.insertOne(input);
  const cursor = testCollection.find(query, options);
  const allItems = await cursor.toArray();
  allItems.forEach((i) => console.log(i));
}