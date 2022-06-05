import { useQuery } from 'urql';
import { AnimatedTree } from 'react-tree-graph';
import 'react-tree-graph/dist/style.css';
import { useEffect } from 'react';

const HumpTree = (props) => {
  let done = false;
  const [result, reexecuteQuery] = useQuery({
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

  useEffect(() => {
    if (done || result.fetching) return;

    // Set up to refetch in one second, if the query is idle
    const timerId = setTimeout(() => {
      reexecuteQuery({ requestPolicy: 'network-only' });
    }, 1000);

    return () => clearTimeout(timerId);
  }, [result.fetching, reexecuteQuery, done]);

  const processTransfers = (transfers) => {
    const transfer = findTransferWithId(transfers, props.id);
    if(!transfer)
      return {};

    done = true;

    const mother = findTransferWithId(transfers, transfer.motherId);
    const father = findTransferWithId(transfers, transfer.fatherId);

    return {
      name: transfer.tokenId,
      children: [{
        name: father.tokenId,
      }, {
        name: mother.tokenId,
      }]
    };
  }

  const findTransferWithId = (transfers, tokenId) => {
    return transfers.reverse().find( transfer => transfer.tokenId == tokenId)
  };

  const { data, fetching, error } = result;

  if (!props.id) return "Mint a HUMPS token to see lineage";
  if (fetching) return "Loading...";
  if (error) return <pre>{error.message}</pre>

  return (
    <div>
      <h1>HUMPS Lineage</h1>
      <div>
        <AnimatedTree
          data={processTransfers(data.transfers)}
          height={400}
          width={400}
        />;
      </div>
    </div>
  );
}

export default HumpTree;
