import React from 'react'
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

function SearchBar({ setSearchText }:{searchText:string, setSearchText:Function}) {
  
  return (
      <Input size="large" onChange={(e) => setSearchText(e.target.value)} placeholder="Search Tweets" prefix={<SearchOutlined />} />
  );
}

export default SearchBar;
