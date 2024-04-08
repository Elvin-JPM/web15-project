import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_URL;
export async function postData(endpoint, requestBody, headers) {
  try {
    const response = await axios.post(BASE_URL + endpoint, requestBody, {
      headers: headers,
    });
    return response;
  } catch (error) {
    console.error("Error posting data:", error);
  }
}

export async function getData(endpoint, requestHeaders) {
  try {
    const response = await axios.get(BASE_URL + endpoint, requestHeaders);
    return response.data;
  } catch (error) {
    console.error("Error getting data:", error);
  }
}

export async function deleteData(endpoint, requestHeaders) {
  const headers = requestHeaders;

  try {
    const response = await axios.delete(BASE_URL + endpoint, {
      headers: requestHeaders,
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting data:", error);
  }
}

export async function putData(endpoint, requestBody, requestHeaders) {
  try {
    const response = await axios.put(BASE_URL + endpoint, requestBody, {
      headers: requestHeaders,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating data:", error);
  }
}
