import "../../index.css";
export function Task({ number, description }) {
  return (
    <>
        <h2>{number}</h2>
        <p>{description}</p>
    </>
  );
}