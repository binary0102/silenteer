import axios from "axios"
const HOST = 'http://localhost:5000';
const callApi = function ({ method, endPoint, payload }) {
  let userId = localStorage.getItem("userId");
  
  if (!userId) {
    userId = generatedUserId();
    localStorage.setItem('userId', userId);
  }

  const header = {};
  if (userId) {
    header.userId = userId;
  } 
  const options = {
    method: method,
    url: HOST + endPoint,
    headers: header,
  }
 
  return axios(options)
}
function generatedUserId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}
export const postResetStateColor = async function () {
  return callApi({
    method: "GET",
    endPoint: "/api/reset-transition"
  })
}

export const getStatus = async function (stage) {
  return callApi({
    method: "GET",
    endPoint: "/api/transition/" + stage
  })
}