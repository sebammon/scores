import React, { useState } from 'react';
import 'antd/dist/antd.css';
import './App.css';
import { Typography } from 'antd';
import ScoreTable from './components/ScoreTable';
import ControlBar from './components/ControlBar';
import { ID } from './utils';

const { Title } = Typography;

const App = () => {
    const [data, setData] = useState([]);

    const handleAdd = () => {
        const len = data.length;
        const sample = {
            key: ID(),
            name: `Name ${len + 1}`,
            participation: 0,
            points: 0,
        };
        setData((prev) => [...prev, sample]);
    };

    const handleReset = () => {
        setData([]);
    };

    const handleDelete = (key) => {
        const newData = data.filter((record) => record.key !== key);
        setData(newData);
    };

    return (
        <div className={'container'}>
            <Title>Scoring App</Title>
            <ControlBar handleAdd={handleAdd} handleReset={handleReset} />
            <ScoreTable data={data} handleDelete={handleDelete} />
        </div>
    );
};

export default App;
