// js버전
/* import { connectDB } from "@/util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';


export const authOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.NEXTAUTH_CLIENTID,
            clientSecret: process.env.NEXTAUTH_CLIENTSECRET,
        }),

        CredentialsProvider({
            //1. 로그인페이지 폼 자동생성해주는 코드 
            name: "credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password" },
            },

            //2. 로그인요청시 실행되는코드
            //직접 DB에서 아이디,비번 비교하고 
            //아이디,비번 맞으면 return 결과, 틀리면 return null 해야함
            async authorize(credentials) {
                let db = (await connectDB).db('forum');
                let user = await db.collection('user_cred').findOne({ email: credentials.email })
                if (!user) {
                    console.log('해당 이메일은 없음');
                    return null
                }
                const pwcheck = await bcrypt.compare(credentials.password, user.password);
                if (!pwcheck) {
                    console.log('비번틀림');
                    return null
                }
                return user
            }
        })
    ],

    //3. jwt 써놔야 잘됩니다 + jwt 만료일설정
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60 //30일
    },


    callbacks: {
        //4. jwt 만들 때 실행되는 코드 
        //user변수는 DB의 유저정보담겨있고 token.user에 뭐 저장하면 jwt에 들어갑니다.
        jwt: async ({ token , user }) => {
            if (user) {
                token.user = {};
                token.user.name = user.name
                token.user.email = user.email
            }
            return token;
        },
        //5. 유저 세션이 조회될 때 마다 실행되는 코드
        session: async ({ session, token }) => {
            session.user = token.user;
            return session;
        },
    },

    adapter: MongoDBAdapter(connectDB),
    secret: process.env.NEXTAUTH_SECRET
};
export default NextAuth(authOptions);  */




// ts버전
import { connectDB } from "@/util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";

// User 타입 정의
interface User {
    name: string;
    email: string;
}


export const authOptions: AuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENTID as string,
            clientSecret: process.env.GITHUB_CLIENTSECRET as string,
        }),

        CredentialsProvider({
            //1. 로그인페이지 폼 자동생성해주는 코드 
            name: "Forum",  // 로그인 버튼에 마지막 이름
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password" },
            },


            //2. 로그인요청시 실행되는코드
            //직접 DB에서 아이디,비번 비교하고 
            //아이디,비번 맞으면 return 결과, 틀리면 return null 해야함
            async authorize(credentials): Promise<any> {
                // if(!credentials || !credentials.email || !credentials.password){
                //     return null as any
                // }
                let db = (await connectDB).db('forum');
                let user = await db.collection('user_cred').findOne({ email: credentials?.email })
                if (!user) {
                    console.log('해당 이메일은 없음');
                    return null
                }
                let password = credentials?.password;
                if (!password) {
                    password = "";
                }
                const pwcheck = await bcrypt.compare(password, user.password);
                if (!pwcheck) {
                    console.log('비번틀림');
                    return null
                }
                if (user) {
                    return user
                } else {
                    return null
                }

            }
        },
        )
    ],

    //3. jwt 써놔야 잘됩니다 + jwt 만료일설정
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60 //30일
    },


    callbacks: {
        jwt: async ({ token, user }: { token: any; user: any }): Promise<any> => {
            if (user) {
                token.user = {};
                token.user.name = user.name || null;
                token.user.email = user.email || null;
            }
            return token;
        },
        session: async ({ session, token }: { session: any; token: any }): Promise<any> => {
            session.user = token.user;
            return session;
        },
    },

    adapter: MongoDBAdapter(connectDB),
    secret: process.env.NEXTAUTH_SECRET
};
export default NextAuth(authOptions); 