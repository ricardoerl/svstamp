export type Stamp = {
  id: string;
  url: string;
};

export type TweetData = {
  _id: string;
  created_at: string;
  saved_at: string;
  full_text: string;
  id_str: string;
  source: string;
  stamp: Stamp;
  user: TweetUser;
};

export type TweetUser = {
  avatar: string;
  id_str: string;
  name: string;
  screen_name: string;
};

export type User = {
  label: string;
  value: string;
};
