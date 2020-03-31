import React from 'react';
import { Button, Slider, Table, Typography } from 'antd';
import { MinusOutlined, PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import './scoreTable.css';

const { Title } = Typography;

const marks = {
    0: <i style={{ fontSize: '1.5rem', color: 'red' }} className="fas fa-sad-tear"></i>,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: <i style={{ fontSize: '1.5rem', color: 'green' }} className="fas fa-smile"></i>,
};

const columns = (props) => {
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
                <div>
                    <Title level={2} className={'name'}>
                        {name}
                    </Title>
                    <span className={'button-container'}>
                        <Button icon={<EditOutlined />} type={'link'} className={'action-button'} />
                        <Button
                            style={{ color: 'red' }}
                            icon={<DeleteOutlined />}
                            type={'link'}
                            className={'action-button'}
                            onClick={handleDeleteClick(record.key)}
                        />
                    </span>
                </div>
            ),
        },
        {
            title: 'Points',
            key: 'points',
            dataIndex: 'points',
            width: '30%',
            render: (score, record) => (
                <div>
                    <Title
                        style={{ fontWeight: 'bold', color: score > 0 ? 'green' : score < 0 ? 'red' : undefined }}
                        level={2}
                        className={'score'}
                    >
                        {score}
                    </Title>
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
