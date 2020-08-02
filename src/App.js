import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import './App.css';
import { Typography } from 'antd';
import ScoreTable from './components/ScoreTable';
import ControlBar from './components/ControlBar';
import { ID } from './utils';
import logo from './assets/logo.png';

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
    const [editingKey, setEditingKey] = useState('');

    useEffect(() => {
        window.localStorage.setItem('data', JSON.stringify(data));
    }, [data]);

    const handleAdd = () => {
        const len = data.length;
        const sample = {
            key: ID(),
            name: `Name ${len + 1}`,
            effort: 0,
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

    const handleParticipationChange = (key, val) => {
        const newData = [...data];
        const idx = newData.findIndex((record) => record.key.toString() === key.toString());
        const item = newData[idx];
        newData.splice(idx, 1, { ...item, effort: val });

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
        <div>
            <div className={'top-bar'}>
                <div className={'brand'}>
                    <img className={'logo-img'} src={logo} alt={'Scores'} />
                    <Title className={'brand-name'}>Scores</Title>
                </div>
                <div className={'about'}>
                    <a href={'https://gitlab.com/sebammon/scores'} target={'_blank'} rel={'noopener noreferrer'}>
                        <img
                            className={'about-img'}
                            src={'https://cdn.worldvectorlogo.com/logos/gitlab.svg'}
                            alt={'GitLab'}
                        />
                    </a>
                </div>
            </div>
            <div className={'container'}>
                <ControlBar handleAdd={handleAdd} handleReset={handleReset} />
                <ScoreTable
                    data={data}
                    handleDelete={handleDelete}
                    handleScoreChange={handleScoreChange}
                    handleParticipatationChange={handleParticipationChange}
                    handleSave={handleSave}
                    handleEdit={handleEdit}
                    editingKey={editingKey}
                />
            </div>
        </div>
    );
};

export default App;
