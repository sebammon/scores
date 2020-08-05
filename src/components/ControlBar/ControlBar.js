import React from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import './ControlBar.css';

const ControlBar = (props) => {
    const handleAddClick = () => {
        props.handleAdd && props.handleAdd();
    };

    const handleResetClick = () => {
        props.handleReset && props.handleReset();
    };

    return (
        <div className={'control-container'}>
            <Button onClick={handleAddClick} type={'primary'} icon={<PlusCircleOutlined />}>
                Name
            </Button>
            <Button style={{ float: 'right' }} onClick={handleResetClick} danger={true}>
                Reset
            </Button>
        </div>
    );
};

export default ControlBar;
