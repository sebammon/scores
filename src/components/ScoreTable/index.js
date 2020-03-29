import React from 'react';
import { Button, Slider, Table } from 'antd';
import { MinusOutlined, PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import './scoreTable.css';

const marks = {
    0: <i style={{ fontSize: '1.5rem' }} className="fas fa-sad-tear"></i>,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: <i style={{ fontSize: '1.5rem' }} className="fas fa-smile"></i>,
};

const columns = (props) => {
    const handleDeleteClick = (key) => () => {
        props.handleDelete && props.handleDelete(key);
    };

    return [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '35%',
            render: (name, record) => {
                return (
                    <span>
                        {name}
                        <span className={'button-container'}>
                            <Button icon={<EditOutlined />} type={'link'} className={'action-button'} />
                            <Button
                                icon={<DeleteOutlined />}
                                type={'link'}
                                className={'action-button'}
                                onClick={handleDeleteClick(record.key)}
                            />
                        </span>
                    </span>
                );
            },
        },
        {
            title: 'Points',
            key: 'points',
            dataIndex: 'points',
            width: '30%',
            render: (score) => {
                return (
                    <div>
                        <span className={'score'}>{score}</span>
                        <Button shape={'circle'} type={'primary'} icon={<PlusOutlined />} />
                        <Button type={'primary'} shape={'circle'} icon={<MinusOutlined />} />
                    </div>
                );
            },
        },
        {
            title: 'Participation',
            key: 'participation',
            dataIndex: 'participation',
            render: (score) => (
                <div style={{ marginRight: '1rem' }}>
                    <Slider tipFormatter={null} marks={marks} step={null} defaultValue={score || 0} min={0} max={5} />
                </div>
            ),
        },
    ];
};

const ScoreTable = (props) => {
    const { data = [] } = props;

    return (
        <div className={'table-container'}>
            <Table size={'middle'} pagination={false} columns={columns(props)} dataSource={data} />
        </div>
    );
};

export default ScoreTable;