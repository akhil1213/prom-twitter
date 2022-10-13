import axios from "axios"
import {Tweet} from "./typings"

export const searchTweetsByKeyWord = async (searchText, paginatedToken): Promise<Tweet[]> => {
  console.log(searchText);
    const url = !paginatedToken ? 
                  `http://localhost:4000/search-tweets/${searchText}` :
                  `http://localhost:4000/search-tweets/${searchText}/${paginatedToken}`
    const res = await axios.get(
      url
    );
    if (res.status === 200) {
      return res.data;
    }
    throw new Error("Search tweets failed with error message");
}

export const getRetweets = async (tweetId): Promise<any[]> => {
  const res = await axios.get(
    `http://localhost:4000/retweets/${tweetId}`
  );
  if (res.status === 200) return res.data;
  throw new Error("Get retweets failed with error message");
}


export const getLikers = async (tweetId): Promise<any[]> => {
  const res = await axios.get(
    `http://localhost:4000/retweets/${tweetId}`
  );
  if (res.status === 200) return res.data;
  throw new Error("Get retweets failed with error message");
}
