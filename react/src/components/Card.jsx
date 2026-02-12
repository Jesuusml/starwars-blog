export default function Card(props) {
  // Determines which prop was passed
  const [type, data] = Object.entries(props).find(
    ([key]) => ['person', 'vehicle', 'planet'].includes(key)
  ) || [];

  if (!type || !data) {
    return <p>No valid prop was passed!</p>
  }

  // Only allowed keys are shown
  const allowedKeys = {
    person: ['gender', 'hair_color', 'eye_color'],
    vehicle: ['manufacturer', 'model', 'passengers'],
    planet: ['population', 'terrain', 'climate'],
  };
  
  return (
    <>
      <h2>{data.name}</h2>
      <ul>
        {Object.entries(data)
          .filter(([key]) => allowedKeys[type].includes(key))
          .map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {value.toString()}
            </li>
          ))}
      </ul>
    </>
  );
}