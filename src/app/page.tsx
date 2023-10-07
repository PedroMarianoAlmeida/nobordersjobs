import SignInAndOutTest from "@/components/SignInAndOutTest";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession();
  console.log({ session });
  return (
    <main>
      <h1>Home Page</h1>
      <SignInAndOutTest />
    </main>
  );
}
