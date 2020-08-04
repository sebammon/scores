import React, { useEffect, useState } from 'react';
import { Button, Typography } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

const { Title } = Typography;

function Score(props) {
    const { handleScoreClick, record, score, max } = props;

    return (
        <div className={'score-cell'}>
            <div className={'score-container'}>
                <Title
                    className={'score'}
                    style={{ color: score > 0 ? 'green' : score < 0 ? '#b90000' : 'grey' }}
                    level={2}
                >
                    {score}
                </Title>
                <div className={`crown-container ${score === max ? 'show jello-horizontal' : 'hide'}`}>
                    <i className={'fas fa-crown crown'} />
                </div>
            </div>
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
