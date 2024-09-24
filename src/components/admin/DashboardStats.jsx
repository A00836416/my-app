import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Statistic, Progress, List, Typography } from 'antd';
import { UserOutlined, ProjectOutlined, TrophyOutlined, TeamOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;

const AdminDashboardStats = () => {
    const [stats, setStats] = useState({
        totalEmployees: 0,
        activeTasks: 0,
        completedTasks: 0,
        totalDepartments: 0,
        averageTaskCompletion: 0,
        topPerformers: [],
        departmentProgress: [],
        recentAchievements: []
    });

    useEffect(() => {
        // Aquí deberías hacer una llamada a tu API para obtener los datos reales
        // Por ahora, usaremos datos de ejemplo
        setStats({
            totalEmployees: 150,
            activeTasks: 45,
            completedTasks: 230,
            totalDepartments: 8,
            averageTaskCompletion: 85,
            topPerformers: [
                { name: 'Juan Pérez', score: 95 },
                { name: 'María García', score: 92 },
                { name: 'Carlos Rodríguez', score: 88 }
            ],
            departmentProgress: [
                { name: 'IT', progress: 92 },
                { name: 'Marketing', progress: 88 },
                { name: 'Ventas', progress: 75 }
            ],
            recentAchievements: [
                'Proyecto X completado',
                'Lanzamiento de nueva característica Y',
                'Récord de ventas mensual alcanzado'
            ]
        });
    }, []);

    return (
        <div>
            <Title level={3}>Estadísticas Generales</Title>
            <Row gutter={16}>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Total de Empleados"
                            value={stats.totalEmployees}
                            prefix={<UserOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Tareas Activas"
                            value={stats.activeTasks}
                            prefix={<ProjectOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Tareas Completadas"
                            value={stats.completedTasks}
                            prefix={<ProjectOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Total de Departamentos"
                            value={stats.totalDepartments}
                            prefix={<TeamOutlined />}
                        />
                    </Card>
                </Col>
            </Row>

            <Row gutter={16} style={{ marginTop: '20px' }}>
                <Col span={12}>
                    <Card title="Top Performers">
                        <List
                            dataSource={stats.topPerformers}
                            renderItem={(item, index) => (
                                <List.Item>
                                    <TrophyOutlined style={{ marginRight: '10px', color: index === 0 ? 'gold' : index === 1 ? 'silver' : 'bronze' }} />
                                    {item.name} - {item.score} puntos
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="Progreso por Departamento">
                        {stats.departmentProgress.map(dept => (
                            <div key={dept.name} style={{ marginBottom: '10px' }}>
                                <span>{dept.name}</span>
                                <Progress percent={dept.progress} />
                            </div>
                        ))}
                    </Card>
                </Col>
            </Row>

            <Row gutter={16} style={{ marginTop: '20px' }}>
                <Col span={12}>
                    <Card title="Logros Recientes">
                        <List
                            dataSource={stats.recentAchievements}
                            renderItem={item => (
                                <List.Item>
                                    <ClockCircleOutlined style={{ marginRight: '10px' }} />
                                    {item}
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card>
                        <Statistic
                            title="Promedio de Finalización de Tareas"
                            value={stats.averageTaskCompletion}
                            suffix="%"
                            prefix={<ProjectOutlined />}
                        />
                        <Progress percent={stats.averageTaskCompletion} />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default AdminDashboardStats;