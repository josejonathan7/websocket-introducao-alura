import { emitNewDocument } from './socketFrontIndex.js';

const documentListElement = document.getElementById("lista-documentos")
const formElement = document.getElementById("form-adiciona-documento")
const inputElement = document.getElementById("input-documento")

formElement.addEventListener("submit", (event) => {
	event.preventDefault()

	emitNewDocument(inputElement.value)
	inputElement.value = ""
})


function insertDocumentLink(documentName) {
	documentListElement.innerHTML += `
		<a
			href="./documento.html?nome=${documentName}"
			class="list-group-item list-group-item-action"
			id="document-${documentName}"
		>
			${documentName}
		</a>
	`
}

function removeDocumentLink(documentName) {
	console.log(documentName)
	const documentFromRemove = document.getElementById(`document-${documentName}`)

	documentListElement.removeChild(documentFromRemove)
}

export {insertDocumentLink, removeDocumentLink}
