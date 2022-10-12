import axios from "axios"

interface Tweet {
    text: string
    id: number
}

export const searchTweetsByKeyWord = async (searchText): Promise<Tweet[]> => {
    const res = await axios.get(
      `http://localhost:4000/search-tweets/${searchText}`
    );
    if (res.status == 200) return res.data;
    throw new Error("Search tweets failed with error message");
}
