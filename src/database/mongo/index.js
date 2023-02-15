import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

const user=process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;

const client = new MongoClient(`mongodb+srv://${user}:${password}@cluster0.4wlknvb.mongodb.net/?retryWrites=true&w=majority`)

let documentCollection

try {
	await client.connect();

	const db = client.db("alura-websockets");
	documentCollection = db.collection("documents")

	console.log("conexao com o banco realizada com sucesso")
} catch (error) {
	console.log(error)
}

export {documentCollection}
