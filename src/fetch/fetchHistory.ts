import API from "../api";

export default async function fetchHistory(): Promise<any> {
  const response = await API.getHistory();
  const history = await response.json();
  if (history.result === "ok") return history.deals;
  else console.log("error of fetchHistory");
}
