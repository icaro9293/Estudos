const { default: axios } = require("axios");

export const api = axios.create({
    baseURL: "https://server-wallfindd.vercel.app/"
})