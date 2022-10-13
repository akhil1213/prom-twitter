import React, {useState, useEffect} from 'react'
import {useQuery, useInfiniteQuery, useQueryClient} from 'react-query'
import { searchTweetsByKeyWord, getRetweets, getLikers } from './api.tsx'
import flattenArray from "./helpers/flattenArray.tsx"
import Tweet from './Tweet.tsx'
import UsersList from './UsersList.tsx'
import { Space, Modal } from 'antd'

function Timeline({searchText}:{searchText:string}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFetchRetweeters, setIsFetchRetweeters] = useState(false);
    const [isFetchLikers, setIsFetchLikers] = useState(false);
    const [selectedTweetId, setSelectedTweetId] = useState(null);
    const [paginatedToken, setPaginatedToken] = useState(null);
    const queryClient = useQueryClient()
    

    const { data: timelineResult, isError, isFetching, hasNextPage, fetchNextPage } = useInfiniteQuery(
        ["timeline", searchText],
        () => searchTweetsByKeyWord(searchText, paginatedToken),
        {
            getNextPageParam: (lastPage, pages) => {
                return lastPage[lastPage.length-1].paginationToken;
            },
        }
    );

    useEffect(() => {
        queryClient.resetQueries("timeline")
    }, [searchText])

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
    if (isError) return <p>There was an error</p>

    return (
        <Space direction="vertical" size="middle" style={{ display: 'flex', cursor: "pointer" }} >
            {flattenArray(timelineResult?.pages).map((row,i) => {
                return <Tweet key={row.id} id={row.id} onTweetClick={onTweetClick} text={row.text}/>
            })}
            <button
                onClick={() => {
                    if (hasNextPage) {
                        const flattenedTimelineResult = flattenArray(timelineResult?.pages);
                        setPaginatedToken(flattenedTimelineResult[flattenedTimelineResult.length-1].paginationToken);
                        fetchNextPage();
                    }
                }}
                // Disable the Next Page button until we know a next page is available
                disabled={!hasNextPage}
            >
                Next Page
            </button>
            {isFetching ? <span> Loading...</span> : null}{' '}
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
