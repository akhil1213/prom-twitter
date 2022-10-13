import React from 'react'
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useQuery } from 'react-query'
import { searchTweetsByKeyWord } from './api.tsx'

function SearchBar({ searchText, setSearchText }:{searchText:string, setSearchText:Function}) {
  const {isFetching} = useQuery(["timeline", searchText], () => searchTweetsByKeyWord(searchText), {
      enabled: !!searchText
  });

  return (
    <div>
      <Input disabled={isFetching} size="large" onChange={(e) => setSearchText(e.target.value)} placeholder="Search Tweets" prefix={<SearchOutlined />} />
    </div>
  );
}

export default SearchBar;
