import { getDateFormat } from '../utils';

const Tweet = ({ data = {} }) => {
  const {
    user: { screen_name, name, avatar },
    id_str,
    full_text,
    saved_at,
    created_at,
  } = data;
  return (
    <div className="p-4">
      <header className="flex items-center">
        <div className="w-12">
          <img src={avatar} alt={name} className="rounded-full" title={name} />
        </div>
        <a
          href={`https://twitter.com/${screen_name}`}
          className="ml-3"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h1 className="text-lg font-semibold">{name}</h1>
          <p className="text-sm text-gray-700 leading-tight">{`@${screen_name}`}</p>
        </a>
      </header>
      <article className="my-4">
        <p>{full_text}</p>
      </article>
      <footer className="py-2 border-t">
        <p className="text-sm my-1 text-gray-500">
          Publicado:{' '}
          <a
            href={`https://tweetstamp.org/${id_str}`}
            className="inline-block"
            title="Fecha de creación de Tweet"
            target="_blank"
            rel="noopener noreferrer"
          >
            {getDateFormat(created_at)}
          </a>
        </p>
        {saved_at && (
          <p className="text-sm my-1 text-gray-500">
            Archivado: {getDateFormat(saved_at)}
          </p>
        )}
      </footer>
    </div>
  );
};

export default Tweet;
