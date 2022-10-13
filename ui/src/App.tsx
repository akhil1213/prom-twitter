import React, {useState} from 'react'
import {
  QueryClient,
  QueryClientProvider,
} from "react-query";
import 'antd/dist/antd.css';
import { Row, Col, Tabs } from 'antd';
import SearchBar from './components/SearchBar.tsx'
import Sidebar from './components/Sidebar/Sidebar.tsx';
import Timeline from './components/Timeline.tsx'
import useDebounce from './components/helpers/useDebounce';
const queryClient = new QueryClient();
const TOPICS = ["Top", "Latest", "People", "Photos", "Videos"]

function App() {

  const [searchText, setSearchText] = useState(null)
  const debouncedSearch = useDebounce(searchText, 2000);

  return (
    <QueryClientProvider client={queryClient}>
      <Row>
        <Col span={6}>
            <Sidebar/>
        </Col>
        <Col span={14}>
          <SearchBar searchText={debouncedSearch} setSearchText={setSearchText}/>
          <Tabs
            defaultActiveKey="1"
            tabPosition={"top"}
            style={{  }}
            items={TOPICS.map((topic, i) => {
              const id = String(i);
              return {
                label: topic,
                key: id,
                children: <Timeline searchText={debouncedSearch} /*topic={topic} */ /> ,
              };
            })}
          />
           
        </Col>
              
      </Row>
          
    </QueryClientProvider>
    
  );
}

export default App;
