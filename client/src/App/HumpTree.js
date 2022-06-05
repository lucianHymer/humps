import { useQuery } from 'urql';

const HumpTree = (props) => {
  const [result] = useQuery({
    query: `
    {
      transfers(orderBy: tokenId, where: {to: "${props.account}"}) {
        id
        from
        to
        tokenId
        dna
        motherId
        fatherId
      }
    }
    `
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

export default HumpTree;
