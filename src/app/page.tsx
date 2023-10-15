import Link from "next/link";

export default async function Home() {
  return (
    <main className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">No Border Jobs</h1>
          <p className="py-6">
            Jobs in companies that not care where you are from, just how good
            you are!
          </p>

          <Link href="/job/list">
            <button className="btn btn-primary">See Open Positions</button>
          </Link>
        </div>
      </div>
    </main>
  );
}
