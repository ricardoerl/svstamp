import Head from 'next/head';
import Tweet from '../components/Tweet';

const Home = ({ tweets = [] }) => {
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <title>Inicio</title>==
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <link
          href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
          rel="stylesheet"
        ></link>
      </Head>
      <div className="p-5">
        <div className="text-center sm:py-8">
          <h1 className="text-3xl">El Salvador Stamp</h1>
          <p>
            Colección de tweets de El Salvador marcados utilizando{' '}
            <a href="https://tweetstamp.org/" className="text-blue-500">
              @tweet_stamp
            </a>
          </p>
          <form className="max-w-2xl mx-auto mt-6">
            <div className="flex items-center border-b border-b-2 border-gray-300 py-2">
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                placeholder="Pegar enlace de @tweet_stamp"
                aria-label="Enlace de tweet_stamp"
              />
              <button
                className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded"
                type="button"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-6">
          {tweets.map((tweet) => (
            <Tweet data={tweet} key={tweet._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const res = await fetch(`${process.env.API_BASE}/api/tweets`);
  const tweets = await res.json();

  return {
    props: {
      tweets,
    },
  };
}

export default Home;
