import React, { useState, useEffect, useContext } from 'react';
import { Table, Button, message, Input, Tag, Modal, Form, Space, Select, DatePicker } from 'antd';
import { SearchOutlined, PlusOutlined, UserOutlined, MailOutlined, BankOutlined, TeamOutlined, EditOutlined, DeleteOutlined, CalendarOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { employeeService } from '../../services/employeeService';
import { departmentService } from '../../services/departmentService';
import { AuthContext } from '../../App';

const { Option } = Select;

const EmployeeManagement = () => {
    const [employees, setEmployees] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { isAuthenticated, user, userRole, setAuthState } = useContext(AuthContext);

    useEffect(() => {
        if (isAuthenticated && user) {
            fetchEmployees();
            fetchDepartments();
            console.log('Usuario autenticado:', user);
            console.log('Rol del usuario:', userRole);
        } else {
            navigate('/login');
        }
    }, [isAuthenticated, user, userRole, navigate]);

    const fetchDepartments = async () => {
        try {
            const data = await departmentService.getDepartments();
            console.log('Departamentos recibidos:', data); // Para depuración
            if (Array.isArray(data)) {
                setDepartments(data);
            } else {
                console.error('Formato de datos inesperado para departamentos:', data);
                setDepartments([]);
            }
        } catch (error) {
            console.error('Error al obtener departamentos:', error);
            message.error('Error al cargar los departamentos');
            setDepartments([]);
        }
    };

    const fetchEmployees = async () => {
        try {
            setLoading(true);
            const data = await employeeService.getEmployees();
            setEmployees(data);
        } catch (error) {
            handleApiError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (value) => {
        setSearchText(value);
    };

    const filteredEmployees = employees.filter(employee =>
        Object.values(employee).some(val =>
            val && val.toString().toLowerCase().includes(searchText.toLowerCase())
        )
    );

    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'nombre',
            key: 'nombre',
            render: (text, record) => (
                <Space>
                    <UserOutlined />
                    {`${record.nombre} ${record.apellidoPaterno} ${record.apellidoMaterno || ''}`}
                </Space>
            ),
            sorter: (a, b) => a.nombre.localeCompare(b.nombre),
        },
        {
            title: 'Correo Electrónico',
            dataIndex: 'correoElectronico',
            key: 'correoElectronico',
            render: (text) => (
                <Space>
                    <MailOutlined />
                    {text}
                </Space>
            ),
        },
        {
            title: 'Posición',
            dataIndex: 'posicion',
            key: 'posicion',
            render: (text) => (
                <Space>
                    <BankOutlined />
                    {text}
                </Space>
            ),
        },
        {
            title: 'Departamento',
            dataIndex: 'departamento',
            key: 'departamento',
            render: (text) => (
                <Space>
                    <TeamOutlined />
                    <Tag color={text ? "blue" : "red"}>{text || 'Sin asignar'}</Tag>
                </Space>
            ),
            filters: [...new Set(employees.map(emp => emp.departamento).filter(Boolean))].map(dept => ({ text: dept, value: dept })),
            onFilter: (value, record) => record.departamento === value,
        },
        {
            title: 'Acciones',
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    <Link to={`/admin/employees/${record.empleadoID}`}>Ver Detalles</Link>
                    <Button type="link" icon={<EditOutlined />}>Editar</Button>
                    <Button type="link" danger icon={<DeleteOutlined />}>Eliminar</Button>
                </Space>
            ),
        },
    ];

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const handleAddEmployee = async (values) => {
        try {
            const employeeData = {
                datosUsuario: {
                    userName: values.userName,
                    contrasena: values.contrasena,
                    nombre: values.nombre,
                    apellidoPaterno: values.apellidoPaterno,
                    apellidoMaterno: values.apellidoMaterno,
                    fechaNacimiento: values.fechaNacimiento.format('YYYY-MM-DD'),
                    correoElectronico: values.correoElectronico
                },
                datosEmpleado: {
                    fechaIngreso: values.fechaIngreso.format('YYYY-MM-DD'),
                    posicion: values.posicion,
                    departamentoID: values.departamentoID,
                    supervisorID: user.id,
                }
            };

            await employeeService.addEmployee(employeeData);
            message.success('Empleado añadido exitosamente');
            setIsModalVisible(false);
            form.resetFields();
            fetchEmployees();
        } catch (error) {
            handleApiError(error);
        }
    };

    const handleApiError = (error) => {
        if (error.response && error.response.status === 401) {
            message.error('Sesión expirada. Por favor, inicie sesión nuevamente.');
            setAuthState(prevState => ({ ...prevState, isAuthenticated: false }));
            navigate('/login');
        } else {
            message.error('Error en la operación');
        }
    };

    return (
        <div style={{ padding: '24px' }}>
            <h2>Gestión de Empleados</h2>
            <div style={{
                display: 'flex',
                marginBottom: '16px',
                border: '1px solid #d9d9d9',
                borderRadius: '6px',
                overflow: 'hidden'
            }}>
                <Input
                    placeholder="Buscar empleados"
                    prefix={<SearchOutlined />}
                    style={{
                        height: '40px',
                        flexGrow: 1,
                        border: 'none',
                        borderRadius: '6px 0 0 6px',
                    }}
                    onChange={(e) => handleSearch(e.target.value)}
                />
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={showModal}
                    style={{
                        height: '40px',
                        borderRadius: '0 6px 6px 0',
                        border: 'none',
                        boxShadow: 'none',
                    }}
                >
                    Añadir Empleado
                </Button>
            </div>
            <Table
                columns={columns}
                dataSource={filteredEmployees}
                rowKey="empleadoID"
                loading={loading}
                pagination={{ pageSize: 10 }}
                scroll={{ x: true }}
            />
            <Modal
                title="Añadir Nuevo Empleado"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleAddEmployee}
                >
                    <Form.Item name="userName" label="Nombre de Usuario" rules={[{ required: true }]}>
                        <Input prefix={<UserOutlined />} />
                    </Form.Item>
                    <Form.Item name="contrasena" label="Contraseña" rules={[{ required: true }]}>
                        <Input.Password prefix={<LockOutlined />} />
                    </Form.Item>
                    <Form.Item name="nombre" label="Nombre" rules={[{ required: true }]}>
                        <Input prefix={<UserOutlined />} />
                    </Form.Item>
                    <Form.Item name="apellidoPaterno" label="Apellido Paterno" rules={[{ required: true }]}>
                        <Input prefix={<UserOutlined />} />
                    </Form.Item>
                    <Form.Item name="apellidoMaterno" label="Apellido Materno">
                        <Input prefix={<UserOutlined />} />
                    </Form.Item>
                    <Form.Item name="fechaNacimiento" label="Fecha de Nacimiento" rules={[{ required: true }]}>
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item name="correoElectronico" label="Correo Electrónico" rules={[{ required: true, type: 'email' }]}>
                        <Input prefix={<MailOutlined />} />
                    </Form.Item>
                    <Form.Item name="fechaIngreso" label="Fecha de Ingreso" rules={[{ required: true }]}>
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item name="posicion" label="Posición" rules={[{ required: true }]}>
                        <Input prefix={<BankOutlined />} />
                    </Form.Item>
                    <Form.Item name="departamentoID" label="Departamento" rules={[{ required: true }]}>
                        <Select placeholder="Seleccione un departamento">
                            {Array.isArray(departments) && departments.map(dept => (
                                <Option key={dept.departamentoID} value={dept.departamentoID}>{dept.nombre}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block >
                            Añadir Empleado
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default EmployeeManagement;