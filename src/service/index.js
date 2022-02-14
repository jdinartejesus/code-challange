export const API_URL = "http://178.63.13.157:8090/mock-api/api";

export function getData(path) {
  return fetch(API_URL + path)
    .then((response) => response.json())
    .then(({ data }) => data);
}

export function postData(path, params = {}) {
  const headers = { "Content-type": "application/json; charset=UTF-8" }
  return fetch(API_URL + path, { method: "POST", body: JSON.stringify(params), headers })
    .then((response) => response.json())
    .then(({ data }) => data);
}
