import axios from "axios";
import { useEffect , useState } from "react";
import { useNavigate } from "react-router-dom";


const Tasks = () => {
    const token = localStorage.getItem("token");

    const [tasks,setTasks] = useState([]);

    const [search, setSearch] = useState("");

    const [reload, setReload] = useState(false);

    const nav= useNavigate();

    useEffect(()=>{
        const Fetch = async()=>{
            try{
                const res = await axios.get('http://localhost:5000/',{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    });
                setTasks(res.data);
                console.log(res.data);
            }
            catch(err){
                console.log("Error fetching tasks:", err);
            }
        }
        Fetch();
    },[reload]);

    const handelDelete = async(id)=>{
        try{
            await axios.delete("http://localhost:5000/del/"+id,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Deleted Record !!");
            setReload(!reload);
        }
        catch(error){
            console.log(error)
        }
    }

    const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase()) ||
    task.description.toLowerCase().includes(search.toLowerCase())
    );    

    return (
        <div className=" bg-gradient-to-br from-indigo-100 to-blue-50 w-full h-sereen rounded-2xl mx-2 my-2 mt-3">
            <div className="w-1/2 my-6 mx-auto">
                <input
                type="text"
                placeholder="Search tasks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
            </div>
            <div className="justify-center items-center mx-4 my-4">
                <div className="flex flex-wrap gap-4">
                    {filteredTasks.map((task) => (
                        <div
                        key={task._id}
                        className="bg-gradient-to-br from-indigo-200 to-blue-100 border border-gray-400 shadow-lg p-4 rounded-xl w-72 h-52 mt-2 relative"
                        >
                        <div className="flex justify-between items-start">
                            <h1 className="font-semibold text-lg text-gray-800">{task.title}</h1>
                            <p className="text-gray-600 text-sm">{task.date.split("T")[0]}</p>
                        </div>
                        <div className="mt-4">
                            <p className="text-gray-700">{task.description}</p>
                        </div>
                        <div className="flex items-center justify-end space-x-4 absolute bottom-4 right-4">
                            <button
                            className="border border-gray-400 px-2 rounded-md bg-blue-500 hover:cursor-pointer hover:text-lg"
                            onClick={() => nav(`/Edit/${task._id}`)}
                            >
                            Edit
                            </button>
                            <button
                            className="border border-gray-400 px-2 rounded-md bg-blue-500 hover:cursor-pointer hover:text-lg"
                            onClick={() => handelDelete(task._id)}
                            >
                            Delete
                            </button>
                        </div>
                        </div>
                    ))}
                    <div
                        onClick={() => nav('/Addtask')}
                        className="bg-gradient-to-br from-indigo-200 to-blue-100 border shadow-lg p-4 rounded-xl w-72 h-52 mt-2 flex flex-col items-center justify-center hover:scale-105 duration-300 hover:cursor-pointer"
                    >
                    <div className="flex flex-col items-center group">
                        <h1 className="text-5xl mx-auto group-hover:text-6xl transition-all duration-300">➕</h1>
                        <p className="text-gray-600 text-sm opacity-0 group-hover:opacity-100 mt-3 transition-opacity duration-300">
                            Add Task
                        </p>
                    </div>
                    </div>
                </div>

            </div>
        </div>
      );
}
 
export default Tasks;