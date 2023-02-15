import { insertDocumentLink, removeDocumentLink } from './index.js'
const socket = io()


socket.emit("getDocuments", (documents) => {

	documents.forEach(document => {
		insertDocumentLink(document.name)
	});

})

function emitNewDocument(documentName) {
	socket.emit("addDocument", documentName)
}

socket.on("updateIntefaceDocuments", (documentName) => {
	insertDocumentLink(documentName)
})

socket.on("documentAlreadyExist", (documentName) => {
	alert(`O documento: ${documentName} já existe`)
})

socket.on("excludedDocument", documentName => {
	removeDocumentLink(documentName)
})

export {emitNewDocument}
