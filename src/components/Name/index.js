import React, { useState } from 'react';
import { Button, Input, Typography } from 'antd';
import { DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Name = (props) => {
    const { record, name, handleDeleteClick, editingKey } = props;
    const [value, setValue] = useState();

    const isEditing = record.key === editingKey;

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const handleSave = () => {
        props.handleSave && props.handleSave(record.key, value);
    };

    const handleEdit = () => {
        props.handleEdit && props.handleEdit(record.key);
    };

    return (
        <div>
            {isEditing ? (
                <Input
                    autoFocus={true}
                    className={'name-input'}
                    defaultValue={record.isNew ? undefined : name}
                    placeholder={record.isNew ? name : undefined}
                    allowClear={true}
                    value={value}
                    onChange={handleChange}
                    onPressEnter={handleSave}
                />
            ) : (
                <Title level={2} className={'name'}>
                    {name}
                </Title>
            )}
            <span className={'button-container'}>
                {isEditing ? (
                    <Button onClick={handleSave} icon={<SaveOutlined />} type={'link'} className={'action-button'} />
                ) : (
                    <Button onClick={handleEdit} icon={<EditOutlined />} type={'link'} className={'action-button'} />
                )}
                <Button
                    style={{ color: 'red' }}
                    icon={<DeleteOutlined />}
                    type={'link'}
                    className={'action-button'}
                    onClick={handleDeleteClick(record.key)}
                />
            </span>
        </div>
    );
};

export default Name;
