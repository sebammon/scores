import React, { useState } from 'react';
import 'antd/dist/antd.css';
import './App.css';
import { Typography } from 'antd';
import ScoreTable from './components/ScoreTable';
import ControlBar from './components/ControlBar';

const { Title } = Typography;

const ID = () => {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
};

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
