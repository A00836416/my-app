import React, { useState, useEffect, useContext } from 'react';
import { Layout, Menu, Typography, Button, message, Card, Avatar, Spin } from 'antd';
import { UserOutlined, ProjectOutlined, TeamOutlined, DashboardOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate, useLocation, Routes, Route, Link } from 'react-router-dom';
import { AuthContext } from '../../src/App';
import { logout, getUserInfo } from '../services/api';
import EmployeeManagement from '../components/admin/EmployeeManagement';
import TaskManagement from '../components/admin/TaskManagement';
import DepartmentManagement from '../components/admin/DepartmentManagement';
import AdminDashboardStats from '../components/admin/DashboardStats';
import logo from '../components/Login/assets/img/kia-logo-nuevo-blanco-1.png';
import EmployeeDetailsPage from '../components/admin/EmployeeDetails';

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

const AdminPage = () => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    const { isAuthenticated, userId, userRole, user, setAuthState } = useContext(AuthContext);

    useEffect(() => {
        const fetchUserInfo = async () => {
            if (isAuthenticated && userId && !user) {
                try {
                    setLoading(true);
                    const userInfo = await getUserInfo(userId);
                    setAuthState(prevState => ({
                        ...prevState,
                        user: userInfo
                    }));
                } catch (error) {
                    console.error("Error al obtener la información del usuario:", error);
                    message.error('No se pudo cargar la información del usuario');
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, [isAuthenticated, userId, user, setAuthState]);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        } else if (userRole !== 'administrador') {
            message.error('No tienes permisos para acceder a esta página');
            navigate('/home');
        }
    }, [isAuthenticated, userRole, navigate]);

    const handleLogout = async () => {
        try {
            await logout();
            message.success('Sesión cerrada exitosamente');
            setAuthState({ isAuthenticated: false, userRole: null, userId: null, user: null });
            navigate('/login');
        } catch (error) {
            message.error('Error al cerrar sesión');
        }
    };

    const menuItems = [
        { key: 'dashboard', icon: <DashboardOutlined />, label: 'Dashboard', path: '/admin' },
        { key: 'employees', icon: <UserOutlined />, label: 'Empleados', path: '/admin/employees' },
        { key: 'tasks', icon: <ProjectOutlined />, label: 'Tareas', path: '/admin/tasks' },
        { key: 'departments', icon: <TeamOutlined />, label: 'Departamentos', path: '/admin/departments' },
    ];

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spin size="large" />
            </div>
        );
    }

    if (!user) {
        return <div>No se pudo cargar la información del usuario</div>;
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider width={200} theme="light" style={{ borderRight: '1px solid #f0f0f0', height: '100vh', position: 'fixed', left: 0, overflowY: 'auto' }}>
                <div style={{ padding: '16px', textAlign: 'center' }}>
                    <img style={{ height: '40px', marginBottom: '16px', objectFit: 'contain' }} src={logo} alt="Logo de la empresa" />
                </div>
                <Menu
                    mode="inline"
                    selectedKeys={[location.pathname]}
                    style={{ borderRight: 0 }}
                >
                    {menuItems.map(item => (
                        <Menu.Item key={item.path} icon={item.icon}>
                            <Link to={item.path}>{item.label}</Link>
                        </Menu.Item>
                    ))}
                </Menu>
            </Sider>
            <Layout style={{ marginLeft: 200 }}>
                <Header style={{
                    background: '#fff',
                    padding: '0 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: '0 1px 4px rgba(0,21,41,.08)',
                    position: 'fixed',
                    width: 'calc(100% - 200px)',
                    zIndex: 2
                }}>
                    <Title level={4} style={{ margin: 0 }}>
                        Panel de Administrador
                    </Title>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar icon={<UserOutlined />} style={{ marginRight: '8px' }} />
                        <span style={{ marginRight: '16px' }}>{`${user.nombre} ${user.apellidoPaterno}`}</span>
                        <Button icon={<LogoutOutlined />} onClick={handleLogout}>
                            Cerrar sesión
                        </Button>
                    </div>
                </Header>
                <Content style={{
                    margin: '64px 16px 0',
                    padding: '24px',
                    minHeight: 'calc(100vh - 64px)',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <Card style={{
                        borderRadius: '8px',
                        boxShadow: '0 1px 2px 0 rgba(0,0,0,0.03)',
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <Routes>
                            <Route path="/" element={<AdminDashboardStats />} />
                            <Route path="/employees" element={<EmployeeManagement />} />
                            <Route path="/employees/:employeeId" element={<EmployeeDetailsPage />} />
                            <Route path="/tasks" element={<TaskManagement />} />
                            <Route path="/departments" element={<DepartmentManagement />} />
                        </Routes>
                    </Card>
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminPage;

// import React, { useState, useEffect, useContext } from 'react';
// import { Table, Layout, Typography, Button, Input, Space, message, Tag } from 'antd';
// import { SearchOutlined, CheckCircleOutlined } from '@ant-design/icons';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../../src/App';

// const { Header, Content } = Layout;
// const { Title } = Typography;

// // Datos dummy actualizados para incluir información de verificación
// const dummyTaskProgress = [
//     {
//         key: '1',
//         employeeName: 'Juan Pérez',
//         taskName: 'Diseño de UI',
//         startDate: '2023-06-01',
//         dueDate: '2023-06-15',
//         status: 'Completada',
//         completedTime: 20,
//         verified: false,
//         verifiedBy: null,
//         verificationDate: null,
//     },
//     {
//         key: '2',
//         employeeName: 'María García',
//         taskName: 'Desarrollo Backend',
//         startDate: '2023-05-15',
//         dueDate: '2023-06-30',
//         status: 'Completada',
//         completedTime: 80,
//         verified: true,
//         verifiedBy: 'Admin',
//         verificationDate: '2023-06-02',
//     },
//     {
//         key: '3',
//         employeeName: 'Carlos Rodríguez',
//         taskName: 'Testing',
//         startDate: '2023-06-10',
//         dueDate: '2023-06-20',
//         status: 'No Iniciada',
//         completedTime: 0,
//         verified: false,
//         verifiedBy: null,
//         verificationDate: null,
//     },
//     {
//         key: '4',
//         employeeName: 'Ana Martínez',
//         taskName: 'Documentación',
//         startDate: '2023-05-20',
//         dueDate: '2023-06-25',
//         status: 'Completada',
//         completedTime: 40,
//         verified: false,
//         verifiedBy: null,
//         verificationDate: null,
//     },
//     {
//         key: '5',
//         employeeName: 'Luis Sánchez',
//         taskName: 'Optimización de Rendimiento',
//         startDate: '2023-06-05',
//         dueDate: '2023-06-18',
//         status: 'En Progreso',
//         completedTime: 15,
//         verified: false,
//         verifiedBy: null,
//         verificationDate: null,
//     },
// ];

// const AdminPage = () => {
//     const [user, setUser] = useState(null);
//     const [taskProgress, setTaskProgress] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate();
//     const { setAuthState } = useContext(AuthContext);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 await new Promise(resolve => setTimeout(resolve, 1000));
//                 setUser({ userName: 'Admin' });
//                 setTaskProgress(dummyTaskProgress);
//             } catch (error) {
//                 message.error('Error al cargar los datos');
//                 setAuthState(prevState => ({ ...prevState, isAuthenticated: false }));
//                 navigate('/login');
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchData();
//     }, [navigate, setAuthState]);

//     const handleLogout = () => {
//         message.info('Sesión cerrada');
//         setAuthState(prevState => ({ ...prevState, isAuthenticated: false, userRole: null }));
//         navigate('/login');
//     };


//     const handleVerifyTask = (key) => {
//         setTaskProgress(prevTasks =>
//             prevTasks.map(task =>
//                 task.key === key
//                     ? {
//                         ...task,
//                         verified: true,
//                         verifiedBy: 'Admin',
//                         verificationDate: new Date().toISOString().split('T')[0],
//                         status: 'Verificada'
//                     }
//                     : task
//             )
//         );
//         message.success('Tarea verificada exitosamente');
//     };

//     const getColumnSearchProps = (dataIndex) => ({
//         filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
//             <div style={{ padding: 8 }}>
//                 <Input
//                     placeholder={`Buscar ${dataIndex}`}
//                     value={selectedKeys[0]}
//                     onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
//                     onPressEnter={() => confirm()}
//                     style={{ width: 188, marginBottom: 8, display: 'block' }}
//                 />
//                 <Space>
//                     <Button
//                         type="primary"
//                         onClick={() => confirm()}
//                         icon={<SearchOutlined />}
//                         size="small"
//                         style={{ width: 90 }}
//                     >
//                         Buscar
//                     </Button>
//                     <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
//                         Reiniciar
//                     </Button>
//                 </Space>
//             </div>
//         ),
//         filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
//         onFilter: (value, record) =>
//             record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '',
//     });

//     const columns = [
//         {
//             title: 'Empleado',
//             dataIndex: 'employeeName',
//             key: 'employeeName',
//             ...getColumnSearchProps('employeeName'),
//         },
//         {
//             title: 'Tarea',
//             dataIndex: 'taskName',
//             key: 'taskName',
//             ...getColumnSearchProps('taskName'),
//         },
//         {
//             title: 'Fecha de Inicio',
//             dataIndex: 'startDate',
//             key: 'startDate',
//             sorter: (a, b) => new Date(a.startDate) - new Date(b.startDate),
//         },
//         {
//             title: 'Fecha Límite',
//             dataIndex: 'dueDate',
//             key: 'dueDate',
//             sorter: (a, b) => new Date(a.dueDate) - new Date(b.dueDate),
//         },
//         {
//             title: 'Estado',
//             dataIndex: 'status',
//             key: 'status',
//             render: (status) => {
//                 let color = 'default';
//                 switch (status) {
//                     case 'Completada': color = 'green'; break;
//                     case 'En Progreso': color = 'blue'; break;
//                     case 'No Iniciada': color = 'orange'; break;
//                     case 'Verificada': color = 'purple'; break;
//                     default: color = 'default';
//                 }
//                 return <Tag color={color}>{status}</Tag>;
//             },
//             filters: [
//                 { text: 'No Iniciada', value: 'No Iniciada' },
//                 { text: 'En Progreso', value: 'En Progreso' },
//                 { text: 'Completada', value: 'Completada' },
//                 { text: 'Verificada', value: 'Verificada' },
//             ],
//             onFilter: (value, record) => record.status === value,
//         },
//         {
//             title: 'Tiempo Completado (horas)',
//             dataIndex: 'completedTime',
//             key: 'completedTime',
//             sorter: (a, b) => a.completedTime - b.completedTime,
//         },
//         {
//             title: 'Verificación',
//             key: 'verification',
//             render: (_, record) => (
//                 <Space size="middle">
//                     {record.verified ? (
//                         <Tag icon={<CheckCircleOutlined />} color="success">
//                             Verificado por {record.verifiedBy} el {record.verificationDate}
//                         </Tag>
//                     ) : record.status === 'Completada' ? (
//                         <Button onClick={() => handleVerifyTask(record.key)} type="primary" size="small">
//                             Verificar
//                         </Button>
//                     ) : (
//                         <Tag color="default">Pendiente</Tag>
//                     )}
//                 </Space>
//             ),
//         },
//     ];

//     if (loading) return <div>Cargando...</div>;

//     return (
//         <Layout style={{ minHeight: '100vh', backgroundColor: 'white' }}>
//             <Header style={{ backgroundColor: 'white', padding: '0 16px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
//                 <Title level={2} style={{ margin: '16px 0' }}>Panel de Administrador</Title>
//             </Header>
//             <Content style={{ padding: '16px', maxWidth: '100%' }}>
//                 <Title level={4} style={{ marginBottom: '16px' }}>Bienvenido, {user.userName}!</Title>
//                 <Table
//                     columns={columns}
//                     dataSource={taskProgress}
//                     style={{ width: '100%' }}
//                     pagination={{ pageSize: 10 }}
//                     scroll={{ x: true }}
//                 />
//                 <Button onClick={handleLogout} style={{ marginTop: '20px' }}>
//                     Cerrar sesión
//                 </Button>
//             </Content>
//         </Layout>
//     );
// };

// export default AdminPage;


