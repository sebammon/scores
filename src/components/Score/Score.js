import React from 'react';
import { Button, Typography } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import './Score.css';

const { Title } = Typography;

function Score(props) {
    const { handleScoreClick, record, score, max } = props;

    const crownClassName = score === max ? 'show jello-horizontal' : 'hide';

    return (
        <div className={'score-cell'}>
            <div className={`crown-container ${crownClassName}`}>
                <i className={'fas fa-crown crown'} />
            </div>
            <Title
                className={'score'}
                style={{ color: score > 0 ? '#237804' : score < 0 ? '#b90000' : 'grey' }}
                level={2}
            >
                {score}
            </Title>
            <div>
                <Button
                    style={{ marginRight: '2px' }}
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
        </div>
    );
}

export default Score;
