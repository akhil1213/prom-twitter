import React from 'react'
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useQuery } from 'react-query'
import { searchTweetsByKeyWord } from './api.tsx'

function SearchBar({ setSearchText }:{searchText:string, setSearchText:Function}) {
  
  return (
    <div>
      <Input size="large" onChange={(e) => setSearchText(e.target.value)} placeholder="Search Tweets" prefix={<SearchOutlined />} />
    </div>
  );
}

export default SearchBar;
