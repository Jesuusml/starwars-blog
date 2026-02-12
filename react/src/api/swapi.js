import { SWAPI_LINK } from "../config/api";

// CRUD function wrapper
const withErrorHandling = (asyncFn) => {
  return async () => {
    try {
      return await asyncFn();
    }
    catch (error) {
      console.error(error);
      return null;
    }
  };
};

// General 'GET' API call
const genericFetch = async (endpoint) => {
  const response = await fetch(`${SWAPI_LINK}/${endpoint}`);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} - ${response.statusText}`);
  }

  const listData = await response.json();
  const arr = [];

  for (let obj of listData.results) {
    const res = await fetch(obj.url);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} - ${res.statusText}`);
    }

    const data = await res.json();
    arr.push(data.result.properties);
  }
  
  return arr;
};

export const getPeople = withErrorHandling(() => genericFetch('people'));
export const getVehicles = withErrorHandling(() => genericFetch('vehicles'));
export const getPlanets = withErrorHandling(() => genericFetch('planets'));