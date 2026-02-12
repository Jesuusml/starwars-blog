import toTitleCase from "../utils/toTitleCase";

export default function Card(props) {
  // Determines which prop was passed
  const [type, data] = Object.entries(props).find(
    ([key]) => ['character', 'vehicle', 'planet'].includes(key)
  ) || [];

  if (!type || !data) {
    return <p>No valid prop was passed!</p>
  }

  // Only allowed keys are shown
  const allowedKeys = {
    character: ['gender', 'hair_color', 'eye_color'],
    vehicle: ['manufacturer', 'model', 'passengers'],
    planet: ['population', 'terrain', 'climate'],
  };

  return (
    <>
      <div className="card my-auto flex-shrink-0" style={{ width: "18rem" }}>
        {/* <img className="card-img-top" src="/starwars-logo.png" alt="Card image cap" /> */}
        <div className="card-body">
          <h4 className="card-title mb-4">{data.name}</h4>
          <ul>
            {Object.entries(data)
              .filter(([key]) => allowedKeys[type].includes(key))
              .map(([key, value]) => (
                <li key={key}>
                  {toTitleCase(key)}: {value.toString()}
                </li>
              ))}
          </ul>
          <span className="d-flex">
            <a
              href="#"
              className="btn btn-outline-primary me-auto"
              onClick={props.detailsView}
            >
              Learn more!
            </a>
            <button
              className="btn btn-outline-warning"
              onClick={() => null}
            >
              <span>{"<3"}</span>
            </button>
          </span>
        </div>
      </div>
    </>
  );
}