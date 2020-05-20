import React, { Component } from 'react';
import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import Swal from 'sweetalert2';

import Tweet from '../components/Tweet';

import { request } from '../services/api';
import { validateTweetstampURL } from '../utils';

const swalOptions = {
  showCancelButton: false,
};

class Home extends Component {
  state = {
    url: '',
    tweets: this.props.tweets,
    isLoading: false,
  };

  handleChange = (event) => {
    const {
      target: { value },
    } = event;
    this.setState({ url: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { url } = this.state;

    // Change loading status
    this.setState({ isLoading: true });

    // Validate url
    if (!validateTweetstampURL(url)) {
      Swal.fire({
        ...swalOptions,
        title: 'Enlace no válido',
        text: 'Por favor ingresar un enlace de tweetstamp.org',
        icon: 'error',
      });

      // Reset utl
      this.setState({ url: '', isLoading: false });

      return;
    }

    // Display loading message
    Swal.fire({
      ...swalOptions,
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      title: 'Guardando...',
    });

    // Dispatch submit request
    await request(
      '/api/stamps',
      {
        method: 'POST',
        body: JSON.stringify({ url }),
      },
      ({ message = '', description = '', type = 'info', refresh = false }) => {
        // Change loading status
        this.setState({
          isLoading: false,
          url: '',
        });

        // Display response message
        Swal.fire({
          ...swalOptions,
          icon: type,
          title: message,
          text: description,
        });

        // Trigger refresh
        if (refresh) {
          this.handleRefresh();
        }
      },
    );
  };

  handleRefresh = async () => {
    // Change loading status
    this.setState({ isLoading: true });

    // Dispatch refresh request
    await request(`/api/tweets`, {}, (tweets) => {
      this.setState({ tweets, isLoading: false });
    });
  };

  render() {
    const { url = '', tweets, isLoading } = this.state;
    return (
      <div>
        <Head>
          <meta charSet="utf-8" />
          <title>Inicio</title>==
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <div className="p-5">
          <header className="text-center sm:py-8">
            <h1 className="text-3xl">El Salvador Stamp</h1>
            <p>
              Colección de tweets de El Salvador marcados utilizando{' '}
              <a href="https://tweetstamp.org/" className="text-blue-500">
                @tweet_stamp
              </a>
            </p>
            <form
              onSubmit={this.handleSubmit}
              autoComplete="off"
              className="max-w-2xl mx-auto mt-6"
            >
              <div className="flex items-center border-b border-b-2 border-gray-300 py-2">
                <input
                  name="stampLink"
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  type="url"
                  value={url}
                  onChange={this.handleChange}
                  placeholder="Pegar enlace de @tweet_stamp"
                  aria-label="Enlace de tweetstamp.org"
                  disabled={isLoading}
                  required
                />
                <button
                  className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded"
                  type="submit"
                  disabled={isLoading}
                >
                  Guardar
                </button>
              </div>
            </form>
          </header>
          <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 my-6">
            {tweets.map((tweet) => (
              <Tweet data={tweet} key={tweet._id} />
            ))}
          </main>
          <footer className="text-center">
            <a
              className="text-blue-500 mx-2"
              href="https://github.com/ricardoerl/stampi"
            >
              Código fuente
            </a>
            &bull;
            <a
              className="text-blue-500 mx-2"
              href="https://github.com/ricardoerl/stampi/issues/new"
            >
              Reportar problema
            </a>
          </footer>
        </div>
      </div>
    );
  }
}

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
