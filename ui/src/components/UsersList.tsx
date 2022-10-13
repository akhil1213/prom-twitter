import React from "react"
import { List, Typography, Spin, Modal } from 'antd'
import { useQuery } from 'react-query'
import { User } from "../typings"
import { getRetweets, getLikers } from '../api.tsx'

interface Props {
    users: User[]
    likersFetching?: Boolean
    retweetsFetching?: Boolean
    type: string
}

const { Title } = Typography;

function UsersList({users, likersFetching, retweetsFetching, type}:Props) {
    if (likersFetching || retweetsFetching) return (
        <Spin />
    )
    if (!users) return <p>No {type}!</p>
    return (
        <>
            <Title level={2}>{type}</Title>
            <List
                itemLayout="horizontal"
                dataSource={users}
                renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                    title={item.username}
                    description={item.name}
                    />
                </List.Item>
                )}
            />
        </>
    )
}
export default function UsersListModal({setIsFetchRetweeters, setIsModalOpen, setIsFetchLikers, selectedTweetId, isModalOpen, isFetchLikers, isFetchRetweeters}) {
    const closeModal = () => {
        setIsModalOpen(false); 
        setIsFetchLikers(false); 
        setIsFetchRetweeters(false);
    }
    const { data: retweeters, isFetching: retweetsFetching} = useQuery(["retweets", selectedTweetId], () => getRetweets(selectedTweetId), {
        enabled: !!isFetchRetweeters
    })

    const { data: likers, isFetching: likersFetching} = useQuery(["likers", selectedTweetId], () => getLikers(selectedTweetId), {
        enabled: !!isFetchLikers
    })
    return (
        <Modal open={isModalOpen} onOk={() => closeModal()} onCancel={() => closeModal()}>
            {
                isFetchLikers ? 
                    <UsersList users={likers} type={"likers"} likersFetching={likersFetching} /> 
                :
                    <UsersList users={retweeters} type={"retweeters"} retweetsFetching={retweetsFetching}/>
            }
        </Modal>
    )
}