import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Table, Spin, message, Row, Col, Statistic, Progress, Tag, Typography, Avatar, Divider, Space, Button, Tooltip, Popconfirm } from 'antd';
import { UserOutlined, TeamOutlined, TrophyOutlined, ClockCircleOutlined, CalendarOutlined, ExperimentOutlined, ApartmentOutlined, CheckCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { employeeService } from '../../services/employeeService';

const { Title, Text } = Typography;

const EmployeeDetailsPage = () => {
    const [employeeDetails, setEmployeeDetails] = useState(null);
    const [employeeTasks, setEmployeeTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const { employeeId } = useParams();

    useEffect(() => {
        fetchEmployeeData();
    }, [employeeId]);

    const fetchEmployeeData = async () => {
        try {
            setLoading(true);
            const [detailsData, tasksData] = await Promise.all([
                employeeService.getEmployeeDetails(employeeId),

                employeeService.getEmployeeTasks(employeeId)
            ]);
            setEmployeeDetails(detailsData);
            setEmployeeTasks(tasksData);
            console.log(tasksData);
        } catch (error) {
            console.error('Error al cargar la información del empleado:', error);
            message.error('Error al cargar la información del empleado');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyTask = async (tareaId) => {
        try {
            await employeeService.verifyTask(tareaId);
            message.success('Tarea verificada exitosamente');
            fetchEmployeeData(); // Recargar los datos para reflejar el cambio
        } catch (error) {
            console.error('Error al verificar la tarea:', error);
            message.error('Error al verificar la tarea');
        }
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spin size="large" />
            </div>
        );
    }

    if (!employeeDetails) {
        return <div>No se encontraron detalles del empleado</div>;
    }

    const { detalles } = employeeDetails;

    const columns = [
        {
            title: 'Tarea',
            dataIndex: 'tareaNombre',
            key: 'tareaNombre',
            render: (text, record) => (
                <Space direction="vertical" size="small">
                    <Text strong>{text}</Text>

                </Space>
            ),
            width: 150,
        },
        {
            title: 'Información',
            key: 'info',
            render: (_, record) => (
                <Space direction="vertical" size="small" align='start'>
                    <Text><CalendarOutlined /> Inicio: {record.fechaInicio ? new Date(record.fechaInicio).toLocaleDateString() : 'N/A'}</Text>
                    <Text><CalendarOutlined /> Fin: {record.fechaFinalizacion ? new Date(record.fechaFinalizacion).toLocaleDateString() : 'En progreso'}</Text>
                    <Text><ClockCircleOutlined /> {record.diasTranscurridos} días</Text>

                </Space>
            ),
            width: 200,
        },

        {
            title: 'Estado',
            dataIndex: 'estadoTarea',
            key: 'estadoTarea',
            render: (estadoTarea) => <Tag color={estadoTarea === 'Completada' ? 'green' : (estadoTarea === 'Verificada' ? 'gold' : 'blue')}>
                {estadoTarea}
            </Tag>
        },

        {
            title: 'Dimensión',
            dataIndex: 'nombreDimension',
            key: 'nombreDimension',
            render: (dimension) => <Tag color="cyan"><ExperimentOutlined /> {dimension}</Tag>
        },
        {
            title: 'Fase',
            dataIndex: 'faseNombre',
            key: 'faseNombre',
            render: (fase) => <Tag color="orange"><ApartmentOutlined /> {fase}</Tag>
        },
        {
            title: 'Descripción',
            dataIndex: 'tareaDescripcion',
            key: 'tareaDescripcion',
            render: (text) => (
                <Tooltip title={text}>
                    <Text ellipsis={true} style={{ maxWidth: 200 }}>{text}</Text>
                </Tooltip>
            ),
            width: 200,
        },
        {
            title: 'Acción',
            key: 'action',
            render: (_, record) => (
                record.estadoTarea === 'Verified' ?
                    <Tag color="green"><CheckCircleOutlined /> {record.estadoTarea}</Tag>
                    : <Popconfirm
                        title="¿Estás seguro de verificar esta tarea?"
                        onConfirm={() => handleVerifyTask(record.progresoID)}
                        okText="Sí"
                        cancelText="No"
                        disabled={record.estadoTarea !== 'Completed'}
                    >
                        <Button
                            type="primary"
                            icon={<CheckCircleOutlined />}
                            disabled={record.estadoTarea !== 'Completed'}
                        >
                            Verificar
                        </Button>
                    </Popconfirm>
            ),
            width: 100,
        },
    ];

    return (
        <div style={{ padding: '0', minHeight: '100vh' }}>
            <Title level={2}>Detalles del Empleado</Title>
            <Card
                hoverable
                style={{ marginBottom: '24px' }}
                cover={
                    <div style={{ background: '#1890ff', padding: '24px', textAlign: 'center' }}>
                        <Avatar size={100} icon={<UserOutlined />} />
                        <Title level={3} style={{ color: 'white', marginTop: '16px' }}>
                            {`${detalles.nombre} ${detalles.apellidoPaterno} ${detalles.apellidoMaterno}`}
                        </Title>
                    </div>
                }
            >
                <Row gutter={[16, 16]}>
                    <Col span={8}>
                        <Statistic
                            title="Departamento"
                            value={detalles.departamento}
                            prefix={<TeamOutlined style={{ color: '#1890ff' }} />}
                        />
                    </Col>
                    <Col span={8}>
                        <Statistic
                            title="Nivel"
                            value={`${detalles.nivelNombre} (${detalles.nivelNumero})`}
                            prefix={<TrophyOutlined style={{ color: '#faad14' }} />}
                        />
                    </Col>
                    <Col span={8}>
                        <Statistic
                            title="Experiencia Total"
                            value={detalles.experienciaTotal}
                            prefix={<TrophyOutlined style={{ color: '#52c41a' }} />}
                        />
                    </Col>
                </Row>
                <Divider />
                <Row gutter={[16, 16]}>
                    <Col span={8}>
                        <Statistic
                            title="Fase Actual"
                            value={detalles.faseNombre}
                            prefix={<ClockCircleOutlined style={{ color: '#722ed1' }} />}
                        />
                    </Col>
                    <Col span={8}>
                        <Statistic
                            title="Inicio de Fase Actual"
                            value={new Date(detalles.fechaInicioFase).toLocaleDateString()}
                            prefix={<CalendarOutlined style={{ color: '#13c2c2' }} />}
                        />
                    </Col>
                    <Col span={8}>
                        <Statistic
                            title="Días Restantes en Fase"
                            value={detalles.diasRestantesFase}
                            suffix="días"
                            prefix={<CalendarOutlined style={{ color: '#eb2f96' }} />}
                        />
                    </Col>
                </Row>
            </Card>

            <Card
                title={<Title level={4}>Tareas del Empleado</Title>}
                style={{ marginTop: 24 }}
                extra={<Tag color="blue">{employeeTasks.length} tareas</Tag>}
            >
                <Table
                    columns={columns}
                    dataSource={employeeTasks}
                    rowKey="tareaID"
                    pagination={false}
                    scroll={{ x: 'max-content' }}
                />
            </Card>
        </div>
    );
};

export default EmployeeDetailsPage;