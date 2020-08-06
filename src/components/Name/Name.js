import React, { useEffect, useState } from 'react';
import { Button, Input, Typography, Popconfirm } from 'antd';
import { DeleteOutlined, EditOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import './Name.css';

const { Title } = Typography;

const Name = (props) => {
    const { record, name, handleDeleteClick, editingKey } = props;
    const [value, setValue] = useState();

    useEffect(() => {
        if (!record.isNew) {
            setValue(name);
        }
    }, [name, record]);

    const isEditing = record.key === editingKey;

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const handleSave = () => {
        props.handleSave && props.handleSave(record.key, record.isNew && !value ? name : value);
    };

    const handleEdit = () => {
        props.handleEdit && props.handleEdit(record.key);
    };

    const handleEscape = (e) => {
        if (e.keyCode === 27) {
            props.handleSave(record.key, name);
        }
    };

    const handleCancel = () => {
        props.handleSave(record.key, name);
    };

    return (
        <div className={'name-cell'}>
            {isEditing ? (
                <Input
                    autoFocus={true}
                    className={'name-input'}
                    defaultValue={record.isNew ? undefined : name}
                    placeholder={record.isNew ? 'Name' : undefined}
                    value={value}
                    onChange={handleChange}
                    onPressEnter={handleSave}
                    onKeyDown={handleEscape}
                />
            ) : (
                <Title level={2} className={'name'}>
                    {name}
                </Title>
            )}
            <div className={'button-container'}>
                {isEditing ? (
                    <React.Fragment>
                        <Button onClick={handleSave} icon={<CheckOutlined />} type={'link'} />
                        <Button onClick={handleCancel} icon={<CloseOutlined />} type={'link'} />
                    </React.Fragment>
                ) : (
                    <Button onClick={handleEdit} icon={<EditOutlined />} type={'link'} />
                )}
                <Popconfirm
                    title={'Delete this name?'}
                    okText="Yes"
                    cancelText="No"
                    onConfirm={handleDeleteClick(record.key)}
                >
                    <Button
                        style={{ color: 'red' }}
                        icon={<DeleteOutlined />}
                        type={'link'}
                        className={'action-button'}
                    />
                </Popconfirm>
            </div>
        </div>
    );
};

export default Name;
