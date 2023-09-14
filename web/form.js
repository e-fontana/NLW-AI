import { server } from "./server.js"

const form = document.querySelector("#form")
const input = document.querySelector("#url")
const content = document.querySelector("#content")

form.addEventListener("submit", async (event) => {
  event.preventDefault()
  content.classList.add("placeholder")

  const videoURL = input.value
  if (!videoURL.includes("youtube.com/shorts/")) {
    return (content.textContent = "URL inválida")
  }

  const params = videoURL.split("/shorts/")[1]
  const videoID = params.split("?si")[0]

  content.textContent = "Obtendo texto do áudio..."
  const transcription = await server.get(`/summary/${videoID}`)
  content.textContent = "Realizando o resumo..."

 const summary = await server.post("/summary", {
    text: transcription.data.result,
  })
  content.textContent = summary.data.result
  content.classList.remove("placeholder")
})
