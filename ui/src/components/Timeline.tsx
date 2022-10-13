import React, {useState, useEffect} from 'react'
import {useInfiniteQuery, useQueryClient} from 'react-query'
import { searchTweetsByKeyWord } from '../api.tsx'
import flattenArray from "../helpers/flattenArray.tsx"
import Tweet from './Tweet.tsx'
import UsersListModal from './UsersList.tsx'
import { Space, Spin, Button } from 'antd'

function Timeline({searchText}:{searchText:string}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFetchRetweeters, setIsFetchRetweeters] = useState(false);
    const [isFetchLikers, setIsFetchLikers] = useState(false);
    const [selectedTweetId, setSelectedTweetId] = useState(null);
    const [paginatedToken, setPaginatedToken] = useState(null);
    const [prevSearchText, setPrevSearchText] = useState(searchText);
    const queryClient = useQueryClient()
    

    const { data: timelineResult, isError, isFetching, hasNextPage, fetchNextPage } = useInfiniteQuery(
        ["timeline", searchText],
        () => searchTweetsByKeyWord(searchText, paginatedToken),
        {
            getNextPageParam: (lastPage, pages) => {
                return lastPage[lastPage.length-1]?.paginationToken;
            },
            initialData: null,
            staleTime: 50000,
        }
    );

    useEffect(() => {
        // reset infinite query when search text changes 
        queryClient.resetQueries(["timeline", prevSearchText])
        fetchNextPage();
        setPrevSearchText(searchText);
    }, [searchText, queryClient, fetchNextPage])

    const onTweetClick = (fetchingType:string, tweetId:string) => {
        if (fetchingType === "likers") {
            setIsFetchLikers(true);
        } else {
            setIsFetchRetweeters(true);
        }
        setSelectedTweetId(tweetId)
        setIsModalOpen(true);
    }

    if (isError) return <p>There was an error</p>

    const usersListModalProps = {
        isModalOpen,
        setIsModalOpen,
        isFetchRetweeters,
        setIsFetchRetweeters,
        isFetchLikers,
        setIsFetchLikers,
        selectedTweetId
    }
    return (
        <Space direction="vertical" size="middle" style={{ display: 'flex', cursor: "pointer" }} >
            {/* Tweets Container */}
            {flattenArray(timelineResult?.pages).map((row,i) => {
                return <Tweet key={row.id} id={row.id} onTweetClick={onTweetClick} text={row.text}/>
            })}
            {
                flattenArray(timelineResult?.pages).length > 0 
                    ?
                        <Button
                            onClick={() => {
                                if (hasNextPage) {
                                    const freshTweets = flattenArray(timelineResult?.pages);
                                    setPaginatedToken(freshTweets[freshTweets.length-1].paginationToken);
                                    fetchNextPage();
                                }
                            }}
                            // Disable the Next Page button until we know a next page is available
                            disabled={!hasNextPage}
                        >
                            Next Page
                        </Button>
                    :
                        null
            }
            
            {isFetching ? <Spin /> : null}
            <UsersListModal {...usersListModalProps} />
        </Space>
    );
}

export default Timeline;
