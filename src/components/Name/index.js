import React, { useEffect, useState } from 'react';
import { Button, Input, Typography, Popconfirm } from 'antd';
import { DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import './name.css';

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

    const handleBlur = () => {
        if (record.isNew && !value) {
            handleSave();
        }
    };

    const handleEscape = (e) => {
        if (e.keyCode === 27) {
            props.handleSave(record.key, name);
        }
    };

    return (
        <div className={'flex-container'}>
            {isEditing ? (
                <Input
                    autoFocus={true}
                    className={'name-input'}
                    defaultValue={record.isNew ? undefined : name}
                    placeholder={record.isNew ? 'Enter name' : undefined}
                    allowClear={true}
                    value={value}
                    onChange={handleChange}
                    onPressEnter={handleSave}
                    onBlur={handleBlur}
                    onKeyDown={handleEscape}
                />
            ) : (
                <Title level={2} className={'name'}>
                    {name}
                </Title>
            )}
            <div className={'action-button-container'}>
                {isEditing ? (
                    <Button onClick={handleSave} icon={<SaveOutlined />} type={'link'} className={'action-button'} />
                ) : (
                    <Button onClick={handleEdit} icon={<EditOutlined />} type={'link'} className={'action-button'} />
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
