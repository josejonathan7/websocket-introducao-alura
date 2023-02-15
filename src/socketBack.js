import { io } from './server.js'
import { findDocuments, updateDocument, getDocuments, addNewDocument, excludeDocument } from './documentsDB.js'

io.on("connection", (socket) => {
	socket.on("getDocuments", async (returnDocuments) => {
		const documents = await getDocuments()
		returnDocuments(documents)
	})

	socket.on("addDocument", async (documentName) => {
		const documentAlreadyExist = (await findDocuments(documentName)) !== null;

		if (documentAlreadyExist) {
			socket.emit("documentAlreadyExist", documentName)
		} else {

			const result = await addNewDocument(documentName)

			if(result.acknowledged) {
				io.emit("updateIntefaceDocuments", documentName)
			}
		}
	})

	socket.on("selectDocument", async (documentName, returnMessages) => {
		//criar/conectar o client em uma sala
		socket.join(documentName)

		const document = await findDocuments(documentName)

		if(document) {
			//socket.emit("documentMessages", document.messages)
			returnMessages(document.messages)
		}
	})

	socket.on("textAreaMessage", async ({message, documentName}) => {
		//emit o evento para todos menos para quem emitiu o evento
		//socket.broadcast.emit("textAreaEmitMessages", text)

		/**emitir evento para uma sala especifica (exceto para quem emitiu o evento) onde só os membros da sala escutam o evento
		/*se quiser emitir para todos os membros até para quem emitiu o evento usar a variavel io ao invés de socket
		/** */

		const updatedDocument = await updateDocument(documentName, message)

		console.log(updatedDocument)
		if(updatedDocument.modifiedCount) {
			socket.to(documentName).emit("textAreaEmitMessages", message);
		}

	})

	socket.on("excludeDocument", async (documentName) => {
		const result = await excludeDocument(documentName)

		if (result.deletedCount) {
			io.emit("excludedDocument", documentName)
		}
	})
})


