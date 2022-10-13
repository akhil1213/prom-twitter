import React from 'react'
import {Card, Button, Row, Col} from 'antd'

interface Props {
    text:string, 
    id:string,
    onTweetClick: Function,
}
function Tweet({id, text, onTweetClick}: Props) {
    return (
        <Card >
            <p>{text}</p>
            <Row>
                <Col span={4}>
                    <Button onClick={() => onTweetClick("likers", id)}>Get Likers</Button>
                </Col>
                <Col span={4}>
                    <Button onClick={() => onTweetClick("retweeters", id)}>Get Retweeters</Button>
                </Col>
            </Row>
        </Card>

    );
}

export default Tweet;
