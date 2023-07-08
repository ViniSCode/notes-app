// import { cacheExchange, createClient, fetchExchange, ssrExchange } from "urql";
// const isServerSide = typeof window === "undefined";
// const ssrCache = ssrExchange({ isClient: !isServerSide });

// const client = createClient({
//   url: "https://api-sa-east-1.hygraph.com/v2/clh4y479g5mig01taa2s5djfl/master",
//   exchanges: [
//     // dedupExchange,
//     cacheExchange,
//     ssrCache,
//     fetchExchange,
//   ],
//   fetchOptions: () => {
//     const token = process.env.API_ACCESS_TOKEN;
//     return {
//       headers: { authorization: token ? `Bearer ${token}` : "" },
//     };
//   },
// });

// export { client, ssrCache };
