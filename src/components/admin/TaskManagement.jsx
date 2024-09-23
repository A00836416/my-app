import React from 'react';
import { Table, Button } from 'antd';

const TaskManagement = () => {
    const columns = [
        {
            title: 'Tarea',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Descripción',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Departamento',
            dataIndex: 'department',
            key: 'department',
        },
    ];

    const data = [
        {
            key: '1',
            name: 'Desarrollar API',
            description: 'Crear endpoints para la nueva funcionalidad',
            department: 'Desarrollo',
        },
        // Añade más datos de ejemplo aquí
    ];

    return (
        <div>
            <h2>Gestión de Tareas</h2>
            <Button type="primary" style={{ marginBottom: 16 }}>
                Añadir Tarea
            </Button>
            <Table columns={columns} dataSource={data} />
        </div>
    );
};

export default TaskManagement;