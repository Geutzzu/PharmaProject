import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';
import dotenv from 'dotenv';



dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

let database;

const uri = "mongodb+srv://Geutzzu:Tab15987463@cluster0.q0w5fj6.mongodb.net/";


console.log(uri);

console.log("Connecting to MongoDB...");

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });

    database = client.db("Formula1DB")
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    // Wait for the query to complete before logging the result
    const result = await client.db("Formula1DB").collection("drivers").find().toArray();
    console.log(result);
  
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}


var PORT = 5500; /// 5500

// start the Express server
app.listen(PORT, () => {
    run().catch(console.dir);
    console.log(`Server listening on port ${PORT}`);
  });


// GET all constructors
app.get("/getConstructors", async (req, res) => {
  try {
    let collection = await database.collection("constructors");
    let constructors = await collection.find().toArray();
    res.status(200).send(constructors);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching constructors");
  }
});

///GET all drivers from a team
app.get("/drivers/:constructorId", async (req, res) => {
  const constructorId = req.params.constructorId;

  let collection = await database.collection("drivers");
  let drivers = await collection.find({ constructorId: new ObjectId(constructorId) }).toArray();

  res.send(drivers).status(200);
});

// GET a driver by ID
app.get("/getDriver/:driverId", async (req, res) => {
  const driverId = req.params.driverId;

  let collection = await database.collection("drivers");
  let driver = await collection.findOne({ _id: new ObjectId(driverId) });

  res.send(driver).status(200);
});


// GET a constructor by ID
app.get("/getConstructor/:constructorId", async (req, res) => {
  const constructorId = req.params.constructorId;

  let collection = await database.collection("constructors");
  let constructor = await collection.findOne({ _id: new ObjectId(constructorId) });

  res.send(constructor).status(200);
});


// POST a new driver
app.post("/addDriver", async (req, res) => {
  const { firstName, lastName, constructorId, nationality, age, stats } = req.body;

  const constructorObjectId = new ObjectId(constructorId);

  const newDocument = {
      firstName,
      lastName,
      constructorId: constructorObjectId,
      nationality,
      age,
      stats
  }
  let collection = await database.collection("drivers");
  let result = await collection.insertOne(newDocument);
  res.send(result).status(201);
});


// POST a new constructor
app.post("/addConstructor", async (req, res) => {
  const { name, constructorsChampionships, teamPrincipal, driverIds } = req.body;

  ///const driverObjectIds = driverIds.map(id => new ObjectId(id)); Am vrut sa folosesc idurile aici dar nu are mult sens (doar daca vrei read mai rapid la pret de write mai lent)

  const newConstructor = {
    name,
    constructorsChampionships,
    teamPrincipal,
    ///driverIds: driverObjectIds
  }

  let collection = await database.collection("constructors");
  let result = await collection.insertOne(newConstructor);
  res.send(result).status(201);
});

// PATCH (update) a driver by ID
app.patch("/updateDriver/:driverId", async (req, res) => {
  try {
      const { driverId, newFirstName, newLastName, newNationality, newAge, newStats } = req.body;

      const query = { _id: new ObjectId(driverId) };
      const updates = {
          $set: {
              firstName: newFirstName,
              lastName: newLastName,
              nationality: newNationality,
              age: newAge,
              stats: newStats
          },
      };

      let collection = await database.collection("drivers");
      let result = await collection.updateOne(query, updates);
      res.send(result).status(200);
  } catch (err) {
      console.error(err);
      res.status(500).send("Error updating driver");
  }
});




// PATCH a team principal by team ID
app.patch("/updateTeamPrincipal/:teamId", async (req, res) => {
  try {
    const { teamId, newPrincipal } = req.body;

    console.log(teamId, newPrincipal);


    const query = { _id: new ObjectId(teamId) };
    const updates = {
      $set: {
        'teamPrincipal.firstName': newPrincipal.firstName,
        'teamPrincipal.lastName': newPrincipal.lastName,
        'teamPrincipal.age': newPrincipal.age,
      },
    };

    let collection = await database.collection("constructors");
    let result = await collection.updateOne(query, updates);
    console.log(result);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating team principal");
  }
});

// PATCH a constructor by ID
app.patch("/updateTeam/:teamId", async (req, res) => {
    try {

        console.log(req.body);
        console.log(req.params)

        const { teamId: teamId, name: name, constructorsChampionships: constructorsChampionships } = req.body;

        console.log(teamId, name, constructorsChampionships);

        const query = { _id: new ObjectId(teamId) };
        const updates = {
            $set: {
                'name': name,
                'constructorsChampionships': constructorsChampionships,
            },
        };

        let collection = await database.collection("constructors");
        let result = await collection.updateOne(query, updates);
        console.log(result);
        res.send(result).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating team");
    }
});


// DELETE a driver by ID
app.delete("/deleteDriver/:driverId", async (req, res) => {
  const driverId = req.params.driverId;

  let collection = await database.collection("drivers");
  let result = await collection.deleteOne({ _id: new ObjectId(driverId) });

  res.send(result).status(200);
});




// DELETE a constructor by ID
app.delete("/deleteConstructor/:constructorId", async (req, res) => {
  const constructorId = req.params.constructorId;

  let collection = await database.collection("constructors");
  let result = await collection.deleteOne({ _id: new ObjectId(constructorId) });

  res.send(result).status(200);
});

