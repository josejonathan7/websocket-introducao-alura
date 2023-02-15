import { emitMessageValue, getDocumentName, excludeDocumentEventEmit } from './socketFrontDocuments.js'

const params = new URLSearchParams(window.location.search)
const documentName = params.get("nome");

const textAreaElement = document.getElementById("editor-texto");
const documentTitle = document.getElementById("titulo-documento");
const buttonElement = document.getElementById("excluir-documento")


documentTitle.textContent = documentName || "Documento sem título"

getDocumentName(documentName)

textAreaElement.addEventListener("keyup", () => {
	emitMessageValue({
		message: textAreaElement.value,
		documentName
	})
})

buttonElement.addEventListener("click", () => {
	excludeDocumentEventEmit(documentName)
})

export function receiveMessagesValueFromBack(message) {
	textAreaElement.value = message
}

export function excludedDocumentRedirect(excludedDocumentName) {
	if(documentName === excludedDocumentName) {
		alert(`O documento ${excludedDocumentName} foi excluido`);
		window.location.href = "/"
	}
}
