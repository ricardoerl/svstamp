import '../styles/tailwind.css';
import Link from 'next/link';

function MyApp({ Component, pageProps }) {
  return (
    <div className="p-5">
      <header className="text-center sm:pt-8">
        <h1 className="text-3xl">El Salvador Stamp</h1>
        <p>
          Archivo de tweets de El Salvador marcados utilizando{' '}
          <a
            href="https://tweetstamp.org/"
            className="text-blue-700"
            title="Enlace a tweetstamp.org"
          >
            @tweet_stamp
          </a>
        </p>
      </header>
      <Component {...pageProps} />
      <footer className="text-center">
        <p>
          <Link href="/">
            <a className="text-blue-700 mx-2" title="Enlace a código fuente">
              Inicio
            </a>
          </Link>
          &bull;
          <Link href="/info">
            <a className="text-blue-700 mx-2" title="Enlace a código fuente">
              Acerca del proyecto
            </a>
          </Link>
        </p>
        <a
          className="text-blue-700 mx-2"
          href="https://github.com/ricardoerl/stampi"
          title="Enlace a código fuente"
        >
          Código fuente
        </a>
        &bull;
        <a
          className="text-blue-700 mx-2"
          href="https://github.com/ricardoerl/stampi/issues/new"
          title="Enlace a reportar problema"
        >
          Reportar problema
        </a>
      </footer>
    </div>
  );
}

export default MyApp;
