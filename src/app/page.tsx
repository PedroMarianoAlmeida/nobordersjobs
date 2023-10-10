import Link from "next/link";

export default async function Home() {
  return (
    <main>
      <h1>Home Page</h1>
      <Link href="/post-job">
        <button className="btn btn-primary">Post Job</button>
      </Link>
    </main>
  );
}
