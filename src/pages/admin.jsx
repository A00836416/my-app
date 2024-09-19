import React, { useState, useEffect, useContext } from 'react';
import { Table, Layout, Typography, Button } from 'antd';
import { logout, checkAuthStatus } from '../../src/services/api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../src/App';

const { Header, Content } = Layout;
const { Title } = Typography;

const AdminPage = () => {
    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();
    const { setIsAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        const fetchAuthStatus = async () => {
            try {
                const userData = await checkAuthStatus();
                setUser(userData);
                // Aquí deberías hacer una llamada a la API para obtener las tareas
                // Por ahora, usaremos datos de ejemplo
                setTasks([
                    {
                        key: '1',
                        name: 'Tarea 1',
                        employee: 'Juan Pérez',
                        dueDate: '2023-06-30',
                        status: 'En progreso',
                    },
                    {
                        key: '2',
                        name: 'Tarea 2',
                        employee: 'María García',
                        dueDate: '2023-07-15',
                        status: 'Pendiente',
                    },
                    // Añade más tareas de ejemplo aquí
                ]);
            } catch (error) {
                setIsAuthenticated(false);
                navigate('/login');
            }
        };
        fetchAuthStatus();
    }, [navigate, setIsAuthenticated]);

    const handleLogout = async () => {
        try {
            await logout();
            setIsAuthenticated(false);
            navigate('/login');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const columns = [
        {
            title: 'Nombre de la Tarea',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Empleado Asignado',
            dataIndex: 'employee',
            key: 'employee',
        },
        {
            title: 'Fecha Límite',
            dataIndex: 'dueDate',
            key: 'dueDate',
        },
        {
            title: 'Estado',
            dataIndex: 'status',
            key: 'status',
        },
    ];

    if (!user) return <div>Loading...</div>;

    return (
        <Layout style={{ minHeight: '100vh', backgroundColor: 'white' }}>
            <Header style={{ backgroundColor: 'white', padding: '0 16px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
                <Title level={2} style={{ margin: '16px 0' }}>Panel de Administrador</Title>
            </Header>
            <Content style={{ padding: '16px', maxWidth: '100%' }}>
                <Title level={4} style={{ marginBottom: '16px' }}>Bienvenido, {user.userName}!</Title>
                <Table
                    columns={columns}
                    dataSource={tasks}
                    style={{ width: '100%' }}
                    pagination={{ pageSize: 10 }}
                    scroll={{ x: true }}
                />
                <Button onClick={handleLogout} style={{ marginTop: '20px' }}>
                    Cerrar sesión
                </Button>
            </Content>
        </Layout>
    );
};

export default AdminPage;