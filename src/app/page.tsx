import Link from "next/link";

export default async function Home() {
  return (
    <main>
      <h1>Home Page</h1>
      <Link href="/job/new">
        <button className="btn btn-secondary">Post Job</button>
      </Link>
    </main>
  );
}
