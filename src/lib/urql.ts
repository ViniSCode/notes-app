import { cacheExchange, createClient, fetchExchange, ssrExchange } from "urql";
const isServerSide = typeof window === "undefined";
const ssrCache = ssrExchange({ isClient: !isServerSide });

const client = createClient({
  url: "https://api-sa-east-1.hygraph.com/v2/clk011n8m0qlj01uh4a4ngtem/master",
  exchanges: [
    // dedupExchange,
    cacheExchange,
    ssrCache,
    fetchExchange,
  ],
  fetchOptions: () => {
    const token = process.env.API_ACCESS_TOKEN;
    return {
      headers: { authorization: token ? `Bearer ${token}` : "" },
    };
  },
});

export { client, ssrCache };
