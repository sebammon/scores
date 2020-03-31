import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import './App.css';
import { Typography } from 'antd';
import ScoreTable from './components/ScoreTable';
import ControlBar from './components/ControlBar';
import { ID } from './utils';

const { Title } = Typography;

const App = () => {
    const [data, setData] = useState(() => {
        try {
            const item = window.localStorage.getItem('data');
            return item ? JSON.parse(item) : [];
        } catch (error) {
            console.error(error);
            return [];
        }
    });
    const [editingKey, setEditingKey] = useState();

    useEffect(() => {
        window.localStorage.setItem('data', JSON.stringify(data));
    }, [data]);

    const handleAdd = () => {
        const len = data.length;
        const sample = {
            key: ID(),
            name: `Name ${len + 1}`,
            participation: 0,
            points: 0,
            isNew: true,
        };
        setData((prev) => [...prev.map((item) => ({ ...item, isNew: false })), sample]);
        setEditingKey(sample.key);
    };

    const handleReset = () => {
        setData([]);
    };

    const handleDelete = (key) => {
        const newData = data.filter((record) => record.key !== key);
        setData(newData);
    };

    const handleScoreChange = (key, val) => {
        const newData = [...data];
        const idx = newData.findIndex((record) => record.key.toString() === key.toString());
        const item = newData[idx];
        newData.splice(idx, 1, { ...item, points: item.points + val });

        setData(newData);
    };

    const handleParticipatationChange = (key, val) => {
        const newData = [...data];
        const idx = newData.findIndex((record) => record.key.toString() === key.toString());
        const item = newData[idx];
        newData.splice(idx, 1, { ...item, participation: val });

        setData(newData);
    };

    const handleSave = (key, val) => {
        const newData = [...data];
        const idx = newData.findIndex((record) => record.key.toString() === key.toString());
        const item = newData[idx];
        newData.splice(idx, 1, { ...item, name: val, isNew: false });

        setData(newData);
        setEditingKey(undefined);
    };

    const handleEdit = (key) => {
        setEditingKey(key);
        setData((prev) => prev.map((item) => ({ ...item, isNew: false })));
    };

    return (
        <div className={'container'}>
            <Title>Scores</Title>
            <ControlBar handleAdd={handleAdd} handleReset={handleReset} />
            <ScoreTable
                data={data}
                handleDelete={handleDelete}
                handleScoreChange={handleScoreChange}
                handleParticipatationChange={handleParticipatationChange}
                handleSave={handleSave}
                handleEdit={handleEdit}
                editingKey={editingKey}
            />
        </div>
    );
};

export default App;
