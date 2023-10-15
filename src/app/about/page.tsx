const AboutPage = () => {
  return (
    <main className="min-h-screen bg-base-200 flex flex-col gap-3 items-center pt-3">
      <h1>About</h1>
      <p>This is a portal where you can find "work from anywhere" jobs</p>
      <p>
        This is a open source project and you can check the code{" "}
        <a
          href="https://github.com/PedroMarianoAlmeida/nobordersjobs"
          className="underline"
        >
          here
        </a>
      </p>
    </main>
  );
};

export default AboutPage;
