const BASE_URL = 'https://c19stats.azurewebsites.net/api';

export async function getStats(country) {
    const response = await fetch(`${BASE_URL}/stats/${country}`);
    return response.json();
}

export async function getCountries() {
    const response = await fetch(`${BASE_URL}/countries`);
    return response.json();
}

