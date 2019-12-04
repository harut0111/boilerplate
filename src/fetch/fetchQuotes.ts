import API from "../api";

export default async function fetchQuote() {
  const response = await API.getQuote();
  const result = await response.json();
  if (result.result === "ok") return result.assets;
  else console.log("error of fetchQuote");
}
