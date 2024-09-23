import React from 'react';
import { Table, Button } from 'antd';

const DepartmentManagement = () => {
    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Descripción',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Número de Empleados',
            dataIndex: 'employeeCount',
            key: 'employeeCount',
        },
    ];

    const data = [
        {
            key: '1',
            name: 'IT',
            description: 'Departamento de Tecnología de la Información',
            employeeCount: 15,
        },
        // Añade más datos de ejemplo aquí
    ];

    return (
        <div>
            <h2>Gestión de Departamentos</h2>
            <Button type="primary" style={{ marginBottom: 16 }}>
                Añadir Departamento
            </Button>
            <Table columns={columns} dataSource={data} />
        </div>
    );
};

export default DepartmentManagement;