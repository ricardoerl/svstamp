const Tweet = () => {
  return (
    <div className="p-4">
      {/* <div className="p-4 rounded shadow-md hover:shadow-lg transition duration-300 ease-linear"> */}
      <header className="flex items-center">
        <div className="w-12">
          <img src="/twitter.png" alt="Twitter Logo" className="rounded-full" />
        </div>
        <div className="ml-3">
          <h1 className="text-lg font-semibold">Taylor Gonzalez</h1>
          <p className="text-sm text-gray-500 leading-tight">@dope</p>
        </div>
      </header>
      <article className="my-4">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </article>
      <footer>
        <p>Fri May 15 23:30:31 +0000 2020</p>
      </footer>
    </div>
  );
};

export default Tweet;
