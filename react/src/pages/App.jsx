import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPeople, getVehicles, getPlanets } from "../api/swapi";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import toTitleCase from "../utils/toTitleCase"

export default function App() {
  const luke = {
    "created": "2026-02-10T23:01:12.206Z",
    "edited": "2026-02-10T23:01:12.206Z",
    "name": "Luke Skywalker",
    "gender": "male",
    "skin_color": "fair",
    "hair_color": "blond",
    "height": "172",
    "eye_color": "blue",
    "mass": "77",
    "homeworld": "https://www.swapi.tech/api/planets/1",
    "birth_year": "19BBY",
    "vehicles": [
      "https://www.swapi.tech/api/vehicles/14",
      "https://www.swapi.tech/api/vehicles/30"
    ],
    "starships": [
      "https://www.swapi.tech/api/starships/12",
      "https://www.swapi.tech/api/starships/22"
    ],
    "films": [
      "https://www.swapi.tech/api/films/1",
      "https://www.swapi.tech/api/films/2",
      "https://www.swapi.tech/api/films/3",
      "https://www.swapi.tech/api/films/6"
    ],
    "url": "https://www.swapi.tech/api/people/1"
  };
  const arr = Array.from({ length: 7 }, () => ({ ...luke }));
  const [people, setPeople] = useState(arr);
  const [vehicles, setVehicles] = useState(arr);
  const [planets, setPlanets] = useState(arr);
  const [loading, setLoading] = useState(false);

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
        <h1>Characters</h1>
        {loading && (
          <h2>Loading data...</h2>
        )}
        {people ? (
          people.map((character, index) => (
            <Card
              key={index}
              character={character}
              detailsView={() => useNavigate(`/details/people/${character.uid}`)}
            />
          ))
        ) : `There is no data for people`}

        <h1>Vehicles</h1>
        {loading && (
          <h2>Loading data...</h2>
        )}
        {vehicles ? (
          vehicles.map((vehicle, index) => (
            <Card
              key={index}
              vehicle={vehicle}
              detailsView={() => useNavigate(`/details/vehicles/${vehicle.uid}`)}
            />
          ))
        ) : `There is no data for vehicles`}

        <h1>Planets</h1>
        {loading && (
          <h2>Loading data...</h2>
        )}
        {planets ? (
          planets.map((planet, index) => (
            <Card
              key={index}
              planet={planet}
              detailsView={() => useNavigate(`/details/planets/${planet.uid}`)}
            />
          ))
        ) : `There is no data for planets`}
      </>
    );
  }

  // More complex rendering, escalable version
  function modularRendering() {
    const allData = [
      { element: ['characters', 'character'], content: people },
      { element: ['vehicles', 'vehicle'], content: vehicles },
      { element: ['planets', 'planet'], content: planets }
    ];

    return (
      <>
        {allData.map(({ element, content }) => (
          <div key={element[0]}>
            <h1>{toTitleCase(element[0])}</h1>
            <div className="cards-row d-flex overflow-auto gap-3 p-4 mb-5">
              {loading && (
                <h2>Loading data...</h2>
              )}
              {content ? (
                content.map((value, index) => (
                  <Card key={index} {...{ [element[1]]: value }} />
                ))
              ) : `There is no data for ${element[0]}`}
            </div>
          </div>
        ))}
      </>
    );
  }


  return (
    <>
      <Navbar />
      <div id="main" className="container">
        {modularRendering()}
      </div>
    </>
  );
}