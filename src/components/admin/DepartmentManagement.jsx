import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { departmentService } from '../../services/departmentService';

const DepartmentManagement = () => {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            setLoading(true);
            const data = await departmentService.getDepartments();
            setDepartments(data);
        } catch (error) {
            message.error('Error al cargar los departamentos');
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'nombre',
            key: 'nombre',
        },
        {
            title: 'Descripción',
            dataIndex: 'descripcion',
            key: 'descripcion',
        },
        {
            title: 'Cantidad de Empleados',
            dataIndex: 'cantidadEmpleados',
            key: 'cantidadEmpleados',
            render: (text) => text || 0,
        },
        {
            title: 'Fecha de Creación',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text) => new Date(text).toLocaleDateString(),
        },
    ];

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const handleCreateDepartment = async (values) => {
        try {
            await departmentService.createDepartment(values);
            message.success('Departamento creado exitosamente');
            setIsModalVisible(false);
            form.resetFields();
            fetchDepartments();
        } catch (error) {
            message.error('Error al crear el departamento');
        }
    };

    const forcedLightStyles = {
        backgroundColor: '#ffffff',
        color: '#000000',
        border: '1px solid #d9d9d9',
    };

    return (
        <div style={{ padding: '24px' }}>
            <h2>Gestión de Departamentos</h2>
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={showModal}
                style={{ marginBottom: 16 }}
            >
                Añadir Departamento
            </Button>
            <Table
                columns={columns}
                dataSource={departments}
                rowKey="departamentoID"
                loading={loading}
            />
            <Modal
                title="Crear Nuevo Departamento"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleCreateDepartment}
                >
                    <Form.Item
                        name="nombre"
                        label="Nombre"
                        rules={[{ required: true, message: 'Por favor ingrese el nombre del departamento' }]}
                    >
                        <Input
                            placeholder="Ingrese el nombre"
                            style={{
                                ...forcedLightStyles,
                                '::placeholder': { color: '#888888' },
                            }} />
                    </Form.Item>
                    <Form.Item
                        name="descripcion"
                        label="Descripción"
                        rules={[{ required: true, message: 'Por favor ingrese la descripción del departamento' }]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Crear Departamento
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default DepartmentManagement;