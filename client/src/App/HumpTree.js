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

  const processTransfers = (transfers) => {
    const transfer = findTransferWithId(transfers, props.id);
    const mother = findTransferWithId(transfers, transfer.motherId);
    const father = findTransferWithId(transfers, transfer.fatherId);

    return `
    Minted: ${transfer.tokenId}
    Father: ${father.tokenId}
    Mother: ${mother.tokenId}
    `;
  }

  const findTransferWithId = (transfers, tokenId) => {
    return transfers.reverse().find( transfer => transfer.tokenId == tokenId)
  };

  const { data, fetching, error } = result;

  if (fetching) return "Loading...";
  if (!props.id) return "Mint a HUMPS token to see lineage";
  if (error) return <pre>{error.message}</pre>

  return (
    <div>
      <h1>HUMPS Lineage</h1>
      <div>
        {processTransfers(data.transfers)}
      </div>
    </div>
  );
}

export default HumpTree;
