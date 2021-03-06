import React from 'react';
import { Slider, Table } from 'antd';
import './ScoreTable.css';
import Name from '../Name';
import face01 from '../../assets/face-icons/face-01.svg';
import face02 from '../../assets/face-icons/face-02.svg';
import face03 from '../../assets/face-icons/face-03.svg';
import face04 from '../../assets/face-icons/face-04.svg';
import face05 from '../../assets/face-icons/face-05.svg';
import Score from '../Score';

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
                <Score score={score} record={record} handleScoreClick={handleScoreClick} max={max} />
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
                scroll={{ y: 'calc(100vh - 210px)' }}
                pagination={false}
                columns={columns(props)}
                dataSource={data}
            />
        </div>
    );
};

export default ScoreTable;
