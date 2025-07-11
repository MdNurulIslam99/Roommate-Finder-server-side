const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// roommate_finder
// TmhXdDSngIhnCoj3

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.zdrdzae.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)

    const emptyRoomCollection = client
      .db("emptyRoomDB")
      .collection("emptyRoom");

    // userCollection

    const userCollection = client.db("emptyRoomDB").collection("users");

    //  user post related data in database

    // all data get
    app.get("/emptyRoom", async (req, res) => {
      // const cursor = emptyRoomCollection.find();
      // const result = await cursor.toArray();
      const result = await emptyRoomCollection.find().toArray();
      res.send(result);
    });

    // single data get
    app.get("/emptyRoom/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await emptyRoomCollection.findOne(query);
      res.send(result);
    });

    // data post input field and send data to database
    app.post("/emptyRoom", async (req, res) => {
      const roomFinderData = req.body;
      console.log(roomFinderData);
      const result = await emptyRoomCollection.insertOne(roomFinderData);
      res.send(result);
    });

    // updated data
    app.put("/emptyRoom/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedEmptyRoom = req.body;
      const updatedDoc = {
        $set: updatedEmptyRoom,
      };
      const result = await emptyRoomCollection.updateOne(filter, updatedDoc);
      res.send(result);
    });

    // updated a single data

    // app.patch("/emptyRoom/:id", async (req, res) => {
    //   const { like } = req.body.id;
    //   const filter = { like: like };
    //   const updatedDoc = {
    //     $set: {
    //       like: like,
    //     },
    //   };
    //   const result = await emptyRoomCollection.updateOne(filter, updatedDoc);
    //   res.send(result);
    // });

    app.patch("/emptyRoom/:id", async (req, res) => {
      const id = req.params.id;
      const { like } = req.body;

      const result = await emptyRoomCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { like: like } }
      );

      res.send(result);
    });

    //delete data from database

    app.delete("/emptyRoom/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await emptyRoomCollection.deleteOne(query);
      res.send(result);
    });

    // email
    // app.get("/emptyRoom", async (req, res) => {
    //   const { email } = req.query;
    //   const query = email ? { userEmail: email } : {};
    //   const data = await emptyRoomCollection.find(query).toArray();
    //   res.send(data);
    // });

    // user related Apis

    app.get("/users", async (req, res) => {
      // const cursor = emptyRoomCollection.find();
      // const result = await cursor.toArray();
      const result = await userCollection.find().toArray();
      res.send(result);
    });

    // single data get from database
    app.get("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await userCollection.findOne(query);
      res.send(result);
    });

    app.post("/users", async (req, res) => {
      const userProfile = req.body;
      const result = await userCollection.insertOne(userProfile);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("roomMate server is getting user");
});
app.listen(port, () => {
  console.log("room mate server is running on port : ", port);
});
