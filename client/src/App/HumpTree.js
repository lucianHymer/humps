import React from "react";
import { useQuery } from 'urql';

const FILMS_QUERY = `
  {
    transfers(first: 5) {
      id
      from
      to
      tokenId
      dna
      motherId
      fatherId
    }
  }
`;

export default function App() {
  const [result] = useQuery({
    query: FILMS_QUERY,
  });

  const { data, fetching, error } = result;

  if (fetching) return "Loading...";
  if (error) return <pre>{error.message}</pre>

  return (
    <div>
      <h1>My HUMPS</h1>
      <ul>
        {data.transfers.map((transfer) => (
          <li key={transfer.id}>{transfer.tokenId}</li>
        ))}
      </ul>
    </div>
  );
}
