import Github from "next-auth/providers/github";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries";
import { client } from "./sanity/lib/client";
import { writeClient } from "./sanity/lib/write-client";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import NextAuth from "next-auth";

interface ExtendedToken extends JWT {
  account: any;
  profile: any;
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Github],
  callbacks: {
    async signIn({
      user: { name, email, image },
      profile: { id, login, bio }
    }: {
      user: { name: string; email: string; image: string };
      profile: { id: string; login: string; bio: string | null };
    }) {
      const existingUser = await client.withConfig({useCdn:false}).fetch(AUTHOR_BY_GITHUB_ID_QUERY, {id: id});

      if(!existingUser){
        await writeClient.create({
          _type:"author",
          id:id,
          name:name,
          username:login,
          email:email,
          image:image,
          bio:bio || ""
        });
      }
      return true;
    },
    async jwt({ token, account, profile }: { token: ExtendedToken; account: any; profile: any }) {
      if(account && profile){
        const user = await client.withConfig({useCdn:false}).fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
          id:profile?.id
        });

        token.id = user?._id;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      Object.assign(session, {id:token.id});
      return session;
    }
  }
});
