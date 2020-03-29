import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import './controlBar.css';

const ControlBar = (props) => {
    const handleAddClick = () => {
        props.handleAdd && props.handleAdd();
    };

    const handleResetClick = () => {
        props.handleReset && props.handleReset();
    };

    return (
        <div>
            <Button onClick={handleAddClick} type={'primary'} icon={<PlusOutlined />}>
                Name
            </Button>
            <div className={'right-container'}>
                <Button onClick={handleResetClick} danger={true}>
                    Reset
                </Button>
            </div>
        </div>
    );
};

export default ControlBar;
