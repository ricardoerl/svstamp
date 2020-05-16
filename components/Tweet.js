const Tweet = ({ data = {} }) => {
  const {
    user: { screen_name, name },
    id_str,
    full_text,
    created_at,
  } = data;
  return (
    <a href={`https://tweetstamp.org/${id_str}`} className="block p-4">
      <header className="flex items-center">
        <div className="w-12">
          <img src="/twitter.png" alt="Twitter Logo" className="rounded-full" />
        </div>
        <div className="ml-3">
          <h1 className="text-lg font-semibold">{name}</h1>
          <p className="text-sm text-gray-500 leading-tight">@{screen_name}</p>
        </div>
      </header>
      <article className="my-4">
        <p>{full_text}</p>
      </article>
      <footer>
        <p>{created_at}</p>
      </footer>
    </a>
  );
};

export default Tweet;
