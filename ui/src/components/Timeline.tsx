import React, {useState, useEffect} from 'react'
import { useInfiniteQuery, useQueryClient } from 'react-query'
import { searchTweetsByKeyWord } from '../api.tsx'
import flattenArray from "../helpers/flattenArray.tsx"
import Tweet from './Tweet.tsx'
import UsersListModal from './UsersList.tsx'
import { Space, Spin, Button } from 'antd'

function Timeline({searchText}:{searchText:string}) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isFetchRetweeters, setIsFetchRetweeters] = useState<boolean>(false);
    const [isFetchLikers, setIsFetchLikers] = useState<boolean>(false);
    const [selectedTweetId, setSelectedTweetId] = useState<null|string>(null);
    const [paginatedToken, setPaginatedToken] = useState<null|string>(null);
    const [prevSearchText, setPrevSearchText] = useState<null|string>(searchText);
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
    const flattenedTimeline = flattenArray(timelineResult?.pages);

    return (
        <Space direction="vertical" size="middle" style={{ display: 'flex', cursor: "pointer" }} >
            {/* Tweets Container */}
            {flattenedTimeline.map((row,i) => {
                return <Tweet key={row.id} id={row.id} onTweetClick={onTweetClick} text={row.text}/>
            })}
            {
                flattenedTimeline.length > 0 
                    ?
                        <Button
                            onClick={() => {
                                if (hasNextPage) {
                                    setPaginatedToken(flattenedTimeline[flattenedTimeline.length-1].paginationToken);
                                    fetchNextPage();
                                }
                            }}
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
