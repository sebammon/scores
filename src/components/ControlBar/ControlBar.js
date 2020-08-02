import React from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const ControlBar = (props) => {
    const handleAddClick = () => {
        props.handleAdd && props.handleAdd();
    };

    const handleResetClick = () => {
        props.handleReset && props.handleReset();
    };

    return (
        <div>
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
