import axios from "axios"

interface Tweet {
    text: string
    id: number
}

export const searchTweetsByKeyWord = async (searchText): Promise<Tweet[]> => {
    const res = await axios.get(
      `http://localhost:4000/search-tweets/${searchText}`
    );
    if (res.status === 200) return res.data;
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
