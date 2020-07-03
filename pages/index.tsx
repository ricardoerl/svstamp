import React, { Component, ChangeEvent, FormEvent } from 'react';
import Select, { ValueType } from 'react-select';

import Swal, { SweetAlertOptions } from 'sweetalert2';

import SEO from '../components/SEO';
import Tweet from '../components/Tweet';
import Loader from '../components/Loader';

import request from '../services/api';
import { validateTweetstampURL, getUsersFromTweets } from '../utils';
import { TweetData, User } from '../types/index';

const swalOptions = {
  showCancelButton: false,
};

type State = {
  url: string;
  tweets: TweetData[];
  tweetstamps: TweetData[];
  isLoading: boolean;
  users: User[];
};

class Home extends Component {
  state: State = {
    url: '',
    tweets: [],
    tweetstamps: [],
    isLoading: false,
    users: [],
  };

  componentDidMount() {
    this.handleRefresh();
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    this.setState({ url: value });
  };

  handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
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
        } as SweetAlertOptions);

        // Trigger refresh
        if (refresh) {
          this.handleRefresh();
        }
      }
    );
  };

  handleUserChange = (selectedOption: ValueType<User>) => {
    const { tweets } = this.state;
    let tweetstamps = tweets;
    if (selectedOption && selectedOption !== null) {
      const { value } = selectedOption as User;
      tweetstamps = tweets.filter((tweet) => tweet.user.screen_name === value);
    }
    this.setState({
      tweetstamps,
    });
  };

  handleRefresh = async () => {
    // Change loading status
    this.setState({ isLoading: true });

    // Dispatch refresh request
    await request('/api/tweets', {}, (tweets: TweetData[]) => {
      this.setState({
        tweets,
        tweetstamps: tweets,
        users: getUsersFromTweets(tweets),
        isLoading: false,
      });
    });
  };

  render() {
    const { url, tweetstamps, users, isLoading } = this.state;

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
            <label className="block mb-1" htmlFor="user-filter">
              Filtrar por usuario:
            </label>
            <div className="inline-block relative w-64">
              <Select
                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                isClearable={true}
                placeholder="Todos"
                onChange={this.handleUserChange}
                noOptionsMessage={() => 'Usuario No Encontrado'}
                options={users}
              />
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

export default Home;
