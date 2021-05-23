import { MongoClient } from "mongodb";
// /api/new-meetup
//  POST api/new-meetup
async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    // const client = await MongoClient.connect(
    //   "mongodb+srv://gopinath:hcYsF6eHfYZzcHNf@cluster0.9593i.mongodb.net/meetup?retryWrites=true&w=majority",
    //   { useUnifiedTopology: true }
    // );

    const client = await MongoClient.connect(
      "mongodb+srv://gopinath:YZQYcWzQew6i7u7@cluster0.9593i.mongodb.net/meetups",
      { useUnifiedTopology: true }
    );

    // const client = await MongoClient.connect(
    //   "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false",
    //   { useUnifiedTopology: true }
    // );

    const db = client.db();

    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);
    console.log(result);

    // close connection
    client.close();

    res.status(201).json({ message: "meetup added..." });
  }
}

export default handler;
