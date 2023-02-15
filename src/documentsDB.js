import { documentCollection } from './database/mongo/index.js'

async function findDocuments(documentName) {
	const document = await documentCollection.findOne({
		name: documentName
	})

	return document;
}

async function updateDocument(documentName, message) {
	const updatedDocument = await documentCollection.updateOne(
		{
			name: documentName
		},
		{
			$set: {
				messages: message
			}
		}
	);

	return updatedDocument
}

function getDocuments() {
	return documentCollection.find().toArray()
}

async function addNewDocument(documentName) {
	return await documentCollection.insertOne({
		name: documentName,
		messages: ""
	})
}

async function excludeDocument(documentName) {
	return await documentCollection.deleteOne({
		name: documentName
	})
}

export {findDocuments, updateDocument, getDocuments, addNewDocument, excludeDocument}
