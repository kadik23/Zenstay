import { useEffect } from "react";
import useRoomsStore from "../../Hooks/useRoomsStore";

export default function Banner() {
    const rooms = useRoomsStore((state) => state.rooms);
    const fetchRooms = useRoomsStore((state) => state.fetchRooms);

    useEffect(() => {
        fetchRooms();
    }, []);
    return(
        <div>
            <div className="container">
                <div className="banner p-4 p-md-5 rounded-4 text-white text-center">
                    <div>
                        <h1 className="display-5 fw-bold">Book your stay with Zenstay</h1>
                        <p className="lead my-3 fw-700">{rooms && rooms.length} rooms in the Hotel are waiting for you!</p>
                    </div>
                </div>
            </div>
        </div>
    )
}