import React, { Component } from 'react';
import ContentLoader from 'react-content-loader';
import Swal from 'sweetalert2';

import SEO from '../components/SEO';
import Tweet from '../components/Tweet';

import request from '../services/api';
import { validateTweetstampURL, getUsersFromTweets } from '../utils';

const swalOptions = {
  showCancelButton: false,
};

class Home extends Component {
  state = {
    url: '',
    tweets: [],
    tweetstamps: [],
    isLoading: false,
  };

  componentDidMount() {
    this.handleRefresh();
  }

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
      '/api/tweets',
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
      }
    );
  };

  handleUserChange = (event) => {
    const {
      target: { value },
    } = event;
    const { tweets } = this.state;

    this.setState({
      tweetstamps:
        value === 'all'
          ? tweets
          : tweets.filter((tweet) => tweet.user.screen_name === value),
    });
  };

  handleRefresh = async () => {
    // Change loading status
    this.setState({ isLoading: true });

    // Dispatch refresh request
    await request('/api/tweets', {}, (tweets) => {
      this.setState({
        tweets,
        tweetstamps: tweets,
        users: getUsersFromTweets(tweets),
        isLoading: false,
      });
    });
  };

  render() {
    const { url = '', tweetstamps, users = [], isLoading } = this.state;

    return (
      <>
        <SEO />
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
              title="Enlace de tweetstamp.org"
              aria-label="Enlace de tweetstamp.org"
              disabled={isLoading}
              required
            />
            <button
              className="flex-shrink-0 bg-blue-700 hover:bg-blue-800 border-blue-700 hover:border-blue-800 text-sm border-4 text-white py-1 px-2 rounded"
              type="submit"
              disabled={isLoading}
            >
              Guardar
            </button>
          </div>
        </form>
        <div className="p-4">
          <div>
            <p className="block mb-1" htmlFor="user-filter">
              Filtrar por usuario:
            </p>
            <div className="inline-block relative w-64">
              <select
                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                onChange={this.handleUserChange}
              >
                <option value="all">Todos</option>
                {users.map(({ label, value }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 my-6">
          {tweetstamps.length ? (
            tweetstamps.map((tweet) => <Tweet data={tweet} key={tweet._id} />)
          ) : (
            <Loader />
          )}
        </main>
      </>
    );
  }
}

const Loader = () => (
  <>
    <ContentLoader
      speed={2}
      width={400}
      height={160}
      viewBox="0 0 400 160"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      className="p-2"
    >
      <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
      <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
      <rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
      <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
      <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
      <circle cx="20" cy="20" r="20" />
    </ContentLoader>
    <ContentLoader
      speed={2}
      width={400}
      height={160}
      viewBox="0 0 400 160"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      className="p-2"
    >
      <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
      <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
      <rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
      <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
      <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
      <circle cx="20" cy="20" r="20" />
    </ContentLoader>
    <ContentLoader
      speed={2}
      width={400}
      height={160}
      viewBox="0 0 400 160"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      className="p-2"
    >
      <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
      <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
      <rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
      <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
      <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
      <circle cx="20" cy="20" r="20" />
    </ContentLoader>
  </>
);

export default Home;
