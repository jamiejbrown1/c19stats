import axios from 'axios';

const BASE_URL = 'https://c19stats.azurewebsites.net/api';

export async function getStats(country) {
    const response = await axios.get(`${BASE_URL}/stats/${country}`);
    return response.data;
}

export async function getCountries() {
    const response = await axios.get(`${BASE_URL}/countries`);
    return response.data;
}
