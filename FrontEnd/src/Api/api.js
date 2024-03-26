import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_URL;

export async function postData(endpoint, requestBody, headers) {
  const body = requestBody;

  try {
    const response = await axios.post(BASE_URL + endpoint, body, {
      headers: headers,
    });
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function getData(endpoint, requestHeaders) {
  try {
    const response = await axios.get(BASE_URL + endpoint, requestHeaders);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function deleteData(endpoint, requestHeaders) {
  const headers = requestHeaders;

  try {
    const response = await axios.delete(BASE_URL + endpoint, headers);
    return response.data;
  } catch (error) {
    console.error("Error deleting data:", error);
  }
}

export async function putData(endpoint, requestBody, requestHeaders) {
  console.log(requestBody, requestHeaders);
  try {
    const response = await axios.put(BASE_URL + endpoint, requestBody, {
      headers: requestHeaders,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating data:", error);
  }
}
