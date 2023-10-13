import Link from "next/link";
import { prismaExample } from "@/services/dataBaseService";

export default async function Home() {
  await prismaExample();
  return (
    <main>
      <h1>Home Page</h1>
      <Link href="/job/new">
        <button className="btn btn-secondary">Post Job</button>
      </Link>
    </main>
  );
}
