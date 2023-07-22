function test() {}

// import NextAuth from "next-auth/next";
// import GithubProvider from "next-auth/providers/github";
// import GoogleProvider from "next-auth/providers/google";

// export default NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID!,
//       clientSecret: process.env.GOOGLE_SECRET!,
//     }),
//     GithubProvider({
//       clientId: process.env.GITHUB_ID!,
//       clientSecret: process.env.GITHUB_SECRET!,
//     }),
//   ],

//   callbacks: {
//     async signIn({ user, account, profile }) {
//       const email = user.email!;
//       const name = user.name!;

//       return true;
//     },
//   },
//   jwt: {
//     secret: process.env.JWT_SECRET!,
//   },
// });
