import { MongoClient } from "mongodb";
import fetch from 'node-fetch'

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const client = await MongoClient.connect(
      "mongodb+srv://mnnaegel:TvfiJ1giDf7YiRUW@cluster0.4nr9a.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();

    const meetupsCollection = db.collection('meetups')
    const result = await meetupsCollection.insertOne(data)

    console.log(result);

    client.close()
    res.status(200).json({message: 'success'})
  }
}

export default handler;
