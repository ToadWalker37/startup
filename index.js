const express = require('express');
const cookieParser = require('cookie-parser');
const apiRouter = express.Router();
const { MongoClient, ServerApiVersion } = require('mongodb');
const config = require('./dbConfig.json');
const ObjectID = require('mongodb').ObjectID;
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const authCookieName = 'token';

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());
app.use(`/api`, apiRouter);

app.post('/auth/create', async (req, res) => {
  if (await getUser(req.body.Username)) { res.status(409).send({ msg: 'Existing user' }); }
  else {
    const user = await createUser(req.body.Username, req.body.Password);
    setAuthCookie(res, user.token);
    res.send(JSON.stringify({ id: user._id }));
  }
});

// loginAuthorization from the given credentials
app.post('/auth/login', async (req, res) => {
  console.log(req.body);

  const user = await getUser(req.body.username);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send(JSON.stringify({ id: user._id }));
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// getMe for the currently authenticated user
app.get('/user/me', async (req, res) => {
  const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
  const client = new MongoClient(url);
  const collection = client.db('authTest').collection('user');
  authToken = req.cookies['token'];
  const user = await collection.findOne({ token: authToken });
  if (user) {
    res.send({ email: user.email });
    return;
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// GetUser returns information about a user
apiRouter.get('/user/:email', async (req, res) => {
  const user = await getUser(req.params.email);
  if (user) {
    const token = req?.cookies.token;
    res.send({ email: user.email, authenticated: token === user.token });
    return;
  }
  res.status(404).send({ msg: 'Unknown' });
});

// secureApiRouter verifies credentials for endpoints
var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

function getUserByToken(token) {
  const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
  const client = new MongoClient(url);
  const collection = client.db('authTest').collection('user');
  return collection.findOne({ token: token });
}

secureApiRouter.use(async (req, res, next) => {
  authToken = req.cookies[authCookieName];
  const user = await getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

secureApiRouter.get('/vehicles', async (_req, res) => {
  let vehicles = await getVehicles();
  res.send(vehicles);
});

secureApiRouter.post('/vehicle', async (req, res) => {
  let vehicle = await getVehicle(req.body);
  res.send(vehicle);
});

secureApiRouter.post('/vehicle-update', async (req, res) => {
  let vehicle = await updateVehicle(req.body);
  res.send(vehicle);
});

secureApiRouter.post('/vehicle-add', (req, res) => {
  addVehicles(req.body).catch(console.error);
});

secureApiRouter.post('/vehicle-delete', (req, res) => {
  res.send(JSON.stringify(deleteVehicles(req.body)));
});

app.use((_req, res) => { res.sendFile('index.html', { root: 'public' }); });

app.listen(port, () => { console.log(`Listening on port ${port}`); });

function getUser(email) {
  const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
  const client = new MongoClient(url);
  const collection = client.db('authTest').collection('user');
  return collection.findOne({ email: email });
}

async function createUser(email, password) {
  const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
  const client = new MongoClient(url);
  const collection = client.db('authTest').collection('user');
  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await collection.insertOne(user);
  return user;
}

function setAuthCookie(res, authToken) {
  res.cookie('token', authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

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

async function getVehicle(id) {
  const uri = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  const client = new MongoClient(uri);
  const db = client.db('testDatabase');
  const testCollection = db.collection('testCollection');
  let vehicle;
  async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
      const cursor = testCollection.find({ ListingID: `${id.vehicleID}`});
      const allItems = await cursor.toArray();
      allItems.forEach((i) => {vehicle = i; });
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
  if (vehicle == null) {
    return JSON.stringify({"header":null});
  }
  else {
    return JSON.stringify(vehicle);
  }
}

async function updateVehicle(vehicle) {
  const uri = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
  const client = new MongoClient(uri);
  const db = client.db('testDatabase');
  const testCollection = db.collection('testCollection');
  await testCollection.updateOne(
    { _id: { $toObjectId : `${vehicle._id}` } },
    { $set: {
      "Mileage" : vehicle.Mileage,
      "Description" : vehicle.Description,
      "Favorites" : vehicle.Favorites,
      "Views" : vehicle.Views
    } },
    { upsert: true }
  );
}

const { WebSocketServer } = require('ws');

function peerProxy(httpServer) {
  // Create a websocket object
  const wss = new WebSocketServer({ noServer: true });

  // Handle the protocol upgrade from HTTP to WebSocket
  httpServer.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, function done(ws) {
      wss.emit('connection', ws, request);
    });
  });

  // Keep track of all the connections so we can forward messages
  let connections = [];

  wss.on('connection', (ws) => {
    const connection = { id: uuid.v4(), alive: true, ws: ws };
    connections.push(connection);

    // Forward messages to everyone except the sender
    ws.on('message', function message(data) {
      connections.forEach((c) => {
        if (c.id !== connection.id) {
          c.ws.send(data);
        }
      });
    });

    // Remove the closed connection so we don't try to forward anymore
    ws.on('close', () => {
      const pos = connections.findIndex((o, i) => o.id === connection.id);

      if (pos >= 0) {
        connections.splice(pos, 1);
      }
    });

    // Respond to pong messages by marking the connection alive
    ws.on('pong', () => {
      connection.alive = true;
    });
  });

  // Keep active connections alive
  setInterval(() => {
    connections.forEach((c) => {
      // Kill any connection that didn't respond to the ping last time
      if (!c.alive) {
        c.ws.terminate();
      } else {
        c.alive = false;
        c.ws.ping();
      }
    });
  }, 10000);
}

module.exports = { peerProxy };

const httpService = app.listen(8080, () => {
  console.log(`Listening on port ${8080}`);
});

peerProxy(httpService);