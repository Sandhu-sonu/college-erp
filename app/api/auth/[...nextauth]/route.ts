import NextAuth from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";

import prisma from "@/lib/prisma";

import bcrypt from "bcryptjs";



const handler = NextAuth({

  providers: [

    CredentialsProvider({

      name: "credentials",



      credentials: {

        email: {},

        password: {},

      },



      async authorize(credentials) {

        if (

          !credentials?.email ||

          !credentials?.password

        ) {

          throw new Error(

            "Missing credentials"

          );

        }



        const admin =
          await prisma.admin.findUnique({

            where: {

              email:
                credentials.email,

            },

          });



        if (!admin) {

          throw new Error(

            "Invalid email"

          );

        }



        const passwordMatch =
          await bcrypt.compare(

            credentials.password,

            admin.password

          );



        if (!passwordMatch) {

          throw new Error(

            "Invalid password"

          );

        }



        return {

          id:
            admin.id.toString(),

          name:
            admin.name,

          email:
            admin.email,

          role:
            admin.role,

        };

      },

    }),

  ],



  session: {

    strategy: "jwt",

  },



  callbacks: {

    async jwt({

      token,

      user,

    }) {

      if (user) {

        token.role =
          user.role;

      }



      return token;

    },



    async session({

      session,

      token,

    }) {

      if (session.user) {

        session.user.role =
          token.role as string;

      }



      return session;

    },

  },



  pages: {

    signIn: "/login",

  },



  secret:
    process.env
      .NEXTAUTH_SECRET,

});



export {

  handler as GET,

  handler as POST,

};