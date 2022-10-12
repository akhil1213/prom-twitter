import React, {useEffect } from 'react'
import axios from 'axios'
import {useQuery} from 'react-query'
import { searchTweetsByKeyWord } from './api.tsx'
import Tweet from './Tweet.tsx'
import { Space } from 'antd'

function Timeline({searchText}:{searchText:string}) {
    const { status, data, isError, isFetching } = useQuery(["timeline", searchText], () => searchTweetsByKeyWord(searchText));
    
    if (isFetching) return <p>Loading...</p>
    if (isError) return <p>There was an error</p>

    return (
        <Space direction="vertical" size="middle" style={{ display: 'flex' }} >
            {data?.map((row,i) => {
                return <Tweet key={row.id} text={row.text}/>
            })}
        </Space>
    );
}

export default Timeline;
