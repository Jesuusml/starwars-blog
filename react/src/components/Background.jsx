export default function Background() {
  return (
    <div className="stars-layer">
      {Array.from({ length: 10 }).map((_, i) => (
        <div className={`layer${i + 1}`} key={i}></div>
      ))}
    </div>
  );
}