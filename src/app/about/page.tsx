const AboutPage = () => {
  return (
    <main className="min-h-screen bg-base-200 flex flex-col gap-3 pt-3 px-5">
      <h1>About</h1>
      <p>
        At No Border Jobs, we{"'"}re on a mission to break down geographical
        barriers and connect talent with global opportunities. Our platform is
        your gateway to a world of remote work possibilities.
      </p>
      <p>
        As an open source project, we believe in transparency and collaboration.
        You can explore the inner workings of our platform by checking out our
        code on{" "}
        <a
          href="https://github.com/PedroMarianoAlmeida/nobordersjobs"
          className="underline"
        >
          our repository
        </a>
        . We{"'"}re committed to creating a community where everyone can
        contribute to shaping the future of work.
      </p>
      <p>
        Join us in redefining the way we work and expanding the horizons of your
        career. With No Border Jobs, your skills know no borders.
      </p>
    </main>
  );
};

export default AboutPage;
