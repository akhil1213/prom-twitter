import React from 'react'
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

interface Props {
  setSearchText: (text: string) => void
}

function SearchBar({ setSearchText }:Props) {
  
  return (
      <Input size="large" onChange={(e) => setSearchText(e.target.value)} placeholder="Search Tweets" prefix={<SearchOutlined />} />
  );
}

export default SearchBar;
