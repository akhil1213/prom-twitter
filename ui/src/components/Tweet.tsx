import React, {useEffect } from 'react'
import axios from 'axios'
import {useQuery} from 'react-query'
import { searchTweetsByKeyWord } from './api.tsx'
import {Card} from 'antd'

function Tweet({id, text}:{text:string, id:number}) {
    return (
        <Card >
            <p>{text}</p>
        </Card>

    );
}

export default Tweet;
