// NotificationsList.jsx
const NotificationsList = ({ notifications }) => {
    return (
        <ul>
            {notifications.map((notification) => (
                <li key={notification.id}>{notification.message}</li>
            ))}
        </ul>
    );
};

export default NotificationsList;
