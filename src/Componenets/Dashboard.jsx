import Sidebar from "./Sidebar";
import Tasks from "./Tasks";
import { useNavigate } from "react-router-dom"; 
import { useEffect } from "react";

const Dashboard = () => {

    const nav = useNavigate();

    useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must log in first!");
      nav("/Login");
    }
    }, [nav]);
    
    return (
        <div className="flex">
            <Sidebar/>
            <Tasks/> 
        </div>
      );
}
 
export default Dashboard;