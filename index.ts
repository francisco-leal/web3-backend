// 1. Import modules.
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

// 2. Set up your client with desired chain & transport.
const client = createPublicClient({
  chain: mainnet,
  transport: http(),
})

const server = Bun.serve({
  port: 3030,
  async fetch(req) {
    const blockNumber = await client.getBlockNumber()
    return new Response(`Bun! ${blockNumber}`);
  },
});

console.log(`Listening on http://localhost:${server.port} ...`);
