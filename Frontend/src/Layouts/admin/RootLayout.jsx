import Recent from '../../Components/admin/Recent'
import SideBar from '../../Components/admin/SideBar'
import { Outlet  } from 'react-router-dom'
import { useEffect } from 'react'
import useNotificationStore from '../../Hooks/useNotificationStore'
import ALertMessage from '../../Components/guest/ALertMessage'
import useAlertMessageStore from '../../Hooks/useAlertMessage'

export default function RootLayout2(){
    const { fetchNotifications, addNotification } = useNotificationStore();

    useEffect(() => {
        fetchNotifications();

        const eventSource = new EventSource('http://localhost:3000/notifications/stream');

        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            addNotification(data);
        };

        return () => {
            eventSource.close();
        };
    }, []);
    const {alert} = useAlertMessageStore();

    return(
        <div className="d-flex">
            {alert.visible && (
                <ALertMessage type={alert.type} message={alert.message} />
            )}
            <div style={{maxWidth:"300px"}}>
                <SideBar />
            </div>
            <div className="flex-fill px-3 py-4 " style={{background:"#fbfbfb"}}>
                <Outlet />
            </div>
            <div className="ps-3 pe-4 py-4" style={{maxWidth:"280px"}}>
                <Recent/>
            </div>

        </div>
    )
}