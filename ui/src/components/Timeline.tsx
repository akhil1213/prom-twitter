import React, {useState} from 'react'
import {useQuery} from 'react-query'
import { searchTweetsByKeyWord, getRetweets, getLikers } from './api.tsx'
import Tweet from './Tweet.tsx'
import UsersList from './UsersList.tsx'
import { Space, Modal } from 'antd'

function Timeline({searchText}:{searchText:string}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFetchRetweeters, setIsFetchRetweeters] = useState(false);
    const [isFetchLikers, setIsFetchLikers] = useState(false);
    const [selectedTweetId, setSelectedTweetId] = useState(null);
    
    const { data, isError, isFetching } = useQuery(["timeline", searchText], () => searchTweetsByKeyWord(searchText));

    const { data: retweeters, isFetching: retweetsFetching} = useQuery(["retweets", selectedTweetId], () => getRetweets(selectedTweetId), {
        enabled: !!isFetchRetweeters
    })

    const { data: likers, isFetching: likersFetching} = useQuery(["likers", selectedTweetId], () => getLikers(selectedTweetId), {
        enabled: !!isFetchLikers
    })

    const onTweetClick = (fetchingType:string, tweetId:string) => {

        if (fetchingType === "likers") {
            setIsFetchLikers(true);
        } else {
            setIsFetchRetweeters(true);
        }
        setSelectedTweetId(tweetId)
        setIsModalOpen(true);
    }
    const closeModal = () => {
        setIsModalOpen(false); 
        setIsFetchLikers(false); 
        setIsFetchRetweeters(false);
    }
    if (isFetching) return <p>Loading...</p>
    if (isError) return <p>There was an error</p>

    return (
        <Space direction="vertical" size="middle" style={{ display: 'flex', cursor: "pointer" }} >
            {data?.map((row,i) => {
                return <Tweet key={row.id} id={row.id} onTweetClick={onTweetClick} text={row.text}/>
            })}
            <Modal open={isModalOpen} onOk={() => closeModal()} onCancel={() => closeModal()}>
                {
                    isFetchLikers ? 
                        <UsersList users={likers} type={"likers"} likersFetching={likersFetching} /> 
                    :
                        <UsersList users={retweeters} type={"retweeters"} retweetsFetching={retweetsFetching}/>
                }
            </Modal>
        </Space>
    );
}

export default Timeline;
