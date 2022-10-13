import { List } from 'antd'
import { User } from "./typings"

interface Props {
    users: User[]
    likersFetching?: Boolean
    retweetsFetching?: Boolean
    type: string
}

export default function UsersList({users, likersFetching, retweetsFetching, type}:Props) {
    if (likersFetching || retweetsFetching) return (
        <p>Loading...</p>
    )
    if (!users) return <p>No {type}!</p>
    // can paginate ..
    return (<List
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
    />)
}