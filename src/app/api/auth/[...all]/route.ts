import { getAuth } from "@/modules/auth/server";

// Better Auth's endpoints: sign up, sign in, sign out, Google callback, session.
const handle = async (request: Request) => (await getAuth()).handler(request);

export { handle as GET, handle as POST };
