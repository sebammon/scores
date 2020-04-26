import React from 'react';
import { Button, Slider, Table, Typography } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import './scoreTable.css';
import Name from '../Name';
import face01 from './icons/face-01.svg';
import face02 from './icons/face-02.svg';
import face03 from './icons/face-03.svg';
import face04 from './icons/face-04.svg';
import face05 from './icons/face-05.svg';

const { Title } = Typography;

const marks = {
    0: <img className={'face'} src={face01} alt={'Face 01'} />,
    1: <img className={'face'} src={face02} alt={'Face 02'} />,
    2: <img className={'face'} src={face03} alt={'Face 03'} />,
    3: <img className={'face'} src={face04} alt={'Face 04'} />,
    4: <img className={'face'} src={face05} alt={'Face 05'} />,
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

    const onParticipationChange = (key) => (val) => {
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
                    <div className={'score-container'}>
                        <Title
                            className={'score'}
                            style={{ color: score > 0 ? 'green' : score < 0 ? '#b90000' : 'grey' }}
                            level={2}
                        >
                            {score}
                        </Title>
                    </div>
                    <div className={'button-container'}>
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
                    {score === max && (
                        <div className={'crown-container'}>
                            <i className={'fas fa-crown crown'} />
                        </div>
                    )}
                </div>
            ),
        },
        {
            title: 'Effort',
            key: 'effort',
            dataIndex: 'effort',
            render: (score, record) => (
                <Slider
                    className={'effort-slider'}
                    tipFormatter={null}
                    marks={marks}
                    step={null}
                    defaultValue={0}
                    min={0}
                    max={4}
                    value={score}
                    onChange={onParticipationChange(record.key)}
                />
            ),
        },
    ];
};

const ScoreTable = (props) => {
    const { data = [] } = props;

    return (
        <div className={'table-container'}>
            <Table
                scroll={{ y: 'calc(100vh - 200px)' }}
                pagination={false}
                columns={columns(props)}
                dataSource={data}
            />
        </div>
    );
};

export default ScoreTable;
