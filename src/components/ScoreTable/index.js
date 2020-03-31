import React from 'react';
import { Button, Slider, Table, Typography } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import './scoreTable.css';
import Name from '../Name';

const { Title } = Typography;

const marks = {
    0: <i style={{ fontSize: '1.5rem', color: 'red' }} className="fas fa-sad-tear" />,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: <i style={{ fontSize: '1.5rem', color: 'green' }} className="fas fa-smile" />,
};

const columns = (props) => {
    const { data = [] } = props;
    const max = data.reduce((max, curr) => (curr.points > max ? curr.points : max), 1);

    const handleDeleteClick = (key) => () => {
        props.handleDelete && props.handleDelete(key);
    };

    const handleScoreClick = (key, val) => () => {
        props.handleScoreChange && props.handleScoreChange(key, val);
    };

    const onParticipatationChange = (key) => (val) => {
        props.handleParticipatationChange && props.handleParticipatationChange(key, val);
    };

    return [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '35%',
            render: (name, record) => (
                <Name {...props} name={name} record={record} handleDeleteClick={handleDeleteClick} />
            ),
        },
        {
            title: 'Points',
            key: 'points',
            dataIndex: 'points',
            width: '30%',
            render: (score, record) => (
                <div>
                    <span className={'score-container'}>
                        <Title
                            style={{ fontWeight: 'bold', color: score > 0 ? 'green' : score < 0 ? 'red' : undefined }}
                            level={2}
                            className={'score'}
                        >
                            {score}
                        </Title>
                    </span>
                    <Button
                        shape={'circle'}
                        type={'primary'}
                        icon={<PlusOutlined />}
                        onClick={handleScoreClick(record.key, 1)}
                    />
                    <Button
                        type={'primary'}
                        shape={'circle'}
                        icon={<MinusOutlined />}
                        onClick={handleScoreClick(record.key, -1)}
                    />
                    {score === max && (
                        <i
                            style={{ fontSize: '1.5rem', color: 'gold', marginLeft: '0.5rem' }}
                            className="fas fa-crown"
                        />
                    )}
                </div>
            ),
        },
        {
            title: 'Participation',
            key: 'participation',
            dataIndex: 'participation',
            render: (score, record) => (
                <div style={{ marginRight: '1rem' }}>
                    <Slider
                        tipFormatter={null}
                        marks={marks}
                        step={null}
                        defaultValue={0}
                        min={0}
                        max={5}
                        value={score}
                        onChange={onParticipatationChange(record.key)}
                    />
                </div>
            ),
        },
    ];
};

const ScoreTable = (props) => {
    const { data = [] } = props;

    return (
        <div className={'table-container'}>
            <Table pagination={false} columns={columns(props)} dataSource={data} />
        </div>
    );
};

export default ScoreTable;
