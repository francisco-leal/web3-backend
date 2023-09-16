import 'dotenv/config'
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import { kv } from "@vercel/kv";

// Replace with your own RPC url.
// const transport = http('https://eth-mainnet.g.alchemy.com/v2/...')

const client = createPublicClient({
  chain: mainnet,
  transport: http(),
})

const server = Bun.serve({
  port: 3030,
  async fetch(req) {
    const blockNumber = await client.getBlockNumber();
    const lastBlockNumberString = await kv.get<string>("lastProcessedBlock") || "0";

    const lastBlockNumber = BigInt(lastBlockNumberString);
    await kv.set("lastProcessedBlock", blockNumber.toString());    
    return new Response(`Bun! Last processed block: ${lastBlockNumber} | Current block: ${blockNumber} | Missing: ${blockNumber - lastBlockNumber}`);
  },
});

console.log(`Listening on http://localhost:${server.port} ...`);
