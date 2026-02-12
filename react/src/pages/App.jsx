import { useEffect, useState } from "react";
import { getPeople, getVehicles, getPlanets } from "../api/swapi";
import Card from "../components/Card";
import toTitleCase from "../utils/toTitleCase"

export default function App() {
  const [people, setPeople] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      const people = await getPeople();
      const vehicles = await getVehicles();
      const planets = await getPlanets();

      if (people) setPeople(people); else setPeople(null);
      if (vehicles) setVehicles(vehicles); else setVehicles(null);
      if (planets) setPlanets(planets); else setPlanets(null);

      setLoading(false);
    }
    // getData();  // Deactivated for no API calls
  }, []);

  // Default rendering, more readable
  function simpleRendering() {
    return (
      <>
        <h1>People</h1>
        {loading && (
          <h2>Loading data...</h2>
        )}
        {people ? (
          people.map((person, index) => (
            <Card key={index} person={person}></Card>
          ))
        ) : `There is no data for people`}

        <h1>Vehicles</h1>
        {loading && (
          <h2>Loading data...</h2>
        )}
        {vehicles ? (
          vehicles.map((vehicle, index) => (
            <Card key={index} vehicle={vehicle}></Card>
          ))
        ) : `There is no data for vehicles`}

        <h1>Planets</h1>
        {loading && (
          <h2>Loading data...</h2>
        )}
        {planets ? (
          planets.map((planet, index) => (
            <Card key={index} planet={planet}></Card>
          ))
        ) : `There is no data for planets`}
      </>
    );
  }

  // More complex rendering, escalable version
  function modularRendering() {
    const allData = [
      { element: ['people', 'person'], content: people },
      { element: ['vehicles', 'vehicle'], content: vehicles },
      { element: ['planets', 'planet'], content: planets }
    ];

    return (
      <>
        {allData.map(({ element, content }) => (
          <div key={element[0]}>
            <h1>{toTitleCase(element[0])}</h1>
            {loading && (
              <h2>Loading data...</h2>
            )}
            {content ? (
              content.map((value, index) => (
                <Card key={index} {...{ [element[1]]: value }}></Card>
              ))
            ) : `There is no data for ${element[0]}`}
          </div>
        ))}
      </>
    );
  }


  return modularRendering();
}