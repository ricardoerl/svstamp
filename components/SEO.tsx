import Head from 'next/head';

type Props = {
  title?: string;
  description?: string;
  url?: string;
};

const defaultTitle = 'El Salvador Stamp';
const defaultDescription =
  'Archivo de tweets de El Salvador marcados utilizando @tweet_stamp';
const url = 'https://svstamp.com';

const SEO = ({ title = defaultTitle, description = defaultDescription }: Props) => (
  <Head>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{`${title} – ${description}`}</title>
    <meta name="theme-color" content="#ffffff" />
    <meta name="application-name" content={title} />
    <meta name="description" content={description} />
    <meta name="robots" content="index,follow" />
    <meta name="googlebot" content="index,follow" />
    <meta name="google" content="notranslate" />
    <link rel="icon" sizes="192x192" href="/icon.png" />
    <link rel="apple-touch-icon" href="/icon.png" />
    <meta property="og:url" content={url} />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:image" content={`${url}/icon.png`} />
    <meta property="og:image:alt" content={description} />
    <meta property="og:description" content={description} />
    <meta property="og:site_name" content={title} />
    <meta property="og:locale" content="es_SV" />
    <meta property="article:author" content="Ricardo Ramírez" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:creator" content="@ricardoerl" />
    <meta name="twitter:url" content={url} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={`${url}/icon.png`} />
    <meta name="twitter:image:alt" content={title} />
  </Head>
);

export default SEO;
