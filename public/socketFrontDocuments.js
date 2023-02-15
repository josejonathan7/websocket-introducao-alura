import { receiveMessagesValueFromBack, excludedDocumentRedirect } from './document.js'

const socket = io()


export function getDocumentName(documentName) {
	socket.emit("selectDocument", documentName, (messages) => {
		receiveMessagesValueFromBack(messages)
	})
}

socket.on("textAreaEmitMessages", (text) => {
	receiveMessagesValueFromBack(text)
})

socket.on("excludedDocument", (documentName) => {
	excludedDocumentRedirect(documentName)
})

export function excludeDocumentEventEmit(documentName) {
	socket.emit("excludeDocument", documentName)
}

export function emitMessageValue(data) {
	socket.emit("textAreaMessage", data)
}
