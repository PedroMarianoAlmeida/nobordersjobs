import Link from "next/link";

const contributePage = () => {
  return (
    <main className="p-4">
      <h1 className="text-4xl mb-4">Get Involved</h1>
      <p className="mb-1">
        Welcome to our Open Source project! We thrive by building a vibrant and
        supportive community around it.
      </p>

      <h2 className="text-3xl mt-4">Ways to Contribute:</h2>

      <h3 className="text-2xl mt-3">Find Job Opportunities with Us</h3>
      <p className="mb-1">
        We have various sources for discovering job opportunities, including
        global, remote, and borderless positions. However, manually verifying
        all these websites can be time-consuming. If you'd like to assist us in
        this effort, please contact the project creator,{" "}
        <a
          href="https://www.linkedin.com/in/pedroprogrammer/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="underline">Pedro Programmer on LinkedIn</span>
        </a>
        .
      </p>

      <h3 className="text-2xl mt-3">Contribute to the Code</h3>
      <p className="mb-1">
        Our codebase is open to the public, and we welcome Pull Requests on
        <a
          href="https://github.com/PedroMarianoAlmeida/nobordersjobs"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="underline">our GitHub repository</span>
        </a>
        .
      </p>

      <h3 className="text-2xl mt-3">
        Provide Suggestions, Comments, or Report Issues
      </h3>
      <p className="mb-1">
        Even if you're not a coder, you can still contribute by creating issues
        or sharing your suggestions on{" "}
        <a
          href="https://github.com/PedroMarianoAlmeida/nobordersjobs"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="underline">our GitHub repository</span>
        </a>
        .
      </p>

      <h2 className="text-3xl mt-3">Spread the Word</h2>
      <p className="mb-1">
        Help us expand our reach by sharing our project on social media. The
        more people know about us, the better our chances of finding and sharing
        more job opportunities!
      </p>
    </main>
  );
};

export default contributePage;
