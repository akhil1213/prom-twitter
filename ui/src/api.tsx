import axios from "axios"
import {Tweet, User} from "./typings"

// in production code this should be retrieved from .env file and based on which environment our codebase is in (dev, stage, prod, qa, etc)
const API_URL = "http://localhost:4000/"

export const searchTweetsByKeyWord = async (searchText, paginatedToken): Promise<Tweet[]> => {
    if (searchText === "") return [];
    const url = !paginatedToken ? 
                  `${API_URL}search-tweets/${searchText}` :
                  `${API_URL}search-tweets/${searchText}/${paginatedToken}`
    const res = await axios.get(url);
    if (res.status === 200) {
      return res.data;
    }
    throw new Error("Search tweets failed with error message");
}

export const getRetweets = async (tweetId): Promise<any[]> => {
  const res = await axios.get(
    `${API_URL}retweets/${tweetId}`
  );
  if (res.status === 200) return res.data;
  throw new Error("Get retweets failed with error message");
}


export const getLikers = async (tweetId): Promise<any[]> => {
  const res = await axios.get(
    `${API_URL}retweets/${tweetId}`
  );
  if (res.status === 200) return res.data;
  throw new Error("Get retweets failed with error message");
}
