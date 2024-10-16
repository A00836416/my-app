import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, DatePicker, Switch, Select, message } from 'antd';
import axios from 'axios';

const { Option } = Select;

const TaskManagement = () => {
    const [tasks, setTasks] = useState([]);

    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:3002/api/tareas');
            setTasks(response.data);
        } catch (error) {
            message.error('Error al cargar las tareas');
        } finally {
            setLoading(false);
        }
    };


    const columns = [
        {
            title: 'Tarea',
            dataIndex: 'nombre',
            key: 'nombre',
        },
        {
            title: 'Descripción',
            dataIndex: 'descripcion',
            key: 'descripcion',
        },
        {
            title: 'Duración Estimada (horas)',
            dataIndex: 'duracionEstimada',
            key: 'duracionEstimada',
        },
        {
            title: 'Experiencia Base',
            dataIndex: 'experienciaBase',
            key: 'experienciaBase',
        },
        {
            title: 'Fecha Límite',
            dataIndex: 'fechaLimite',
            key: 'fechaLimite',
            render: (text) => text ? new Date(text).toLocaleDateString() : 'N/A',
        },
        {
            title: 'Es Obligatoria',
            dataIndex: 'esObligatoria',
            key: 'esObligatoria',
            render: (value) => value ? 'Sí' : 'No',
        },
        {
            title: 'Cantidad de Empleados',
            dataIndex: 'cantidadEmpleados',
            key: 'cantidadEmpleados',
        },
    ];

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const handleCreateTask = async (values) => {
        try {
            await axios.post('http://localhost:3002/api/tareas', values);
            message.success('Tarea creada exitosamente');
            setIsModalVisible(false);
            form.resetFields();
            fetchTasks();
        } catch (error) {
            message.error('Error al crear la tarea');
        }
    };


    const forcedLightStyles = {
        backgroundColor: '#ffffff',
        color: '#000000',
        border: '1px solid #d9d9d9',
    };

    return (
        <div>
            <h2>Gestión de Tareas</h2>
            <Button type="primary" onClick={showModal} style={{ marginBottom: 16 }}>
                Añadir Tarea
            </Button>
            <Table
                columns={columns}
                dataSource={tasks}
                rowKey="tareaID"
                loading={loading}
            />
            <Modal
                title="Crear Nueva Tarea"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleCreateTask}

                >
                    <Form.Item
                        name="nombre"
                        label={<span style={{ color: '#000000' }}>Nombre</span>}
                        rules={[{ required: true, message: 'Por favor ingrese el nombre' }]}
                    >
                        <Input
                            placeholder="Ingrese el nombre"
                            style={{
                                ...forcedLightStyles,
                                '::placeholder': { color: '#888888' },
                            }}
                        />
                    </Form.Item>
                    <Form.Item name="descripcion" label="Descripción" rules={[{ required: true }]}>
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item name="duracionEstimada" label="Duración Estimada (horas)" rules={[{ required: true }]}>
                        <InputNumber min={1} />
                    </Form.Item>
                    <Form.Item name="experienciaBase" label="Experiencia Base" rules={[{ required: true }]}>
                        <InputNumber min={0} />
                    </Form.Item>
                    <Form.Item name="fechaLimite" label="Fecha Límite">
                        <DatePicker />
                    </Form.Item>
                    <Form.Item name="esObligatoria" label="Es Obligatoria" valuePropName="checked">
                        <Switch />
                    </Form.Item>
                    {/* <Form.Item name="empleadosIDs" label="Asignar a Empleados">
                        <Select mode="multiple" placeholder="Seleccione empleados">
                            {employees.map(emp => (
                                <Option key={emp.empleadoID} value={emp.empleadoID}>
                                    {`${emp.nombre} ${emp.apellidoPaterno}`}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item> */}
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Crear Tarea
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default TaskManagement;