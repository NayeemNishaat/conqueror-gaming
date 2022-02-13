import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import { verifyLogin } from "../../../lib/auth";

export default NextAuth({
	session: { jwt: true }, // Important: In authorize function the param must be exactly "credentials" for credential based authorization!
	providers: [
		Credentials({
			async authorize(credentials) {
				const result = await verifyLogin(credentials);
				// Important: Point: Remark: If error thrown from verifyLogin() then the execution the current function authorize() is suspended and a response is returned from verifyLogin() itself!

				return result;
			}
		})
	],
	secret: process.env.SECRET
});
