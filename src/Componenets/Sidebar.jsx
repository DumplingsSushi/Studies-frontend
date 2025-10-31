import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import icon from "../assets/soilder.png";

const Sidebar = () => {
  const nav = useNavigate();

  const [open, setOpen] = useState(true);

  const [id, setId] = useState("");

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const token = localStorage.getItem("token");

  useEffect(()=>{
        const Fetch = async()=>{
            try{
                const res = await axios.get('https://studies-backend-gamma.vercel.app/userdeets',{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    });
                setId(res.data._id);
                setName(res.data.name);
                setEmail(res.data.email);
                console.log(res.data);
            }
            catch(err){
                console.log("Error fetching tasks:", err);
            }
        }
        Fetch();
    },[]);

  function handleCollapse() {
    setOpen(!open);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    nav("/Login");
  }

  return (
    <div className={`${open ? 'w-60' : 'w-13'} h-[95vh] mb-2 px-2 py-2 mx-2 my-1 mt-3 rounded-2xl transition-all duration-500 bg-gradient-to-br from-indigo-100 to-blue-50`}>
        <div className="flex">
            <img
            src={icon}
            alt="✒️"
            className="w-11 h-11 rounded-2xl cursor-pointer"
            onClick={handleCollapse}
            />
            {open && <h1 className="mx-2 ml-4 mt-2.5">{name}</h1>}
        </div>
      {open && <h2 className="mx-5 mt-3">{email}</h2>}
      <div className="flex space-x-3 items-center ml-5 cursor-pointer">
        {open && <button className=" mt-3 border border-gray-400 w-fit px-2 rounded-md bg-orange-200 " onClick={() => { nav(`/Update/${id}`); }}>Edit details</button>}
        {open && <button className=" mt-3 border border-gray-400 w-fit px-2 rounded-md bg-red-200" onClick={handleLogout}>Logout</button>}
      </div>
    </div>
  );
};

export default Sidebar;


