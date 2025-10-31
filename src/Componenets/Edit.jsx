import { useEffect,useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
    const token = localStorage.getItem("token");

    const {id} = useParams();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');

    const nav = useNavigate();

    useEffect(()=>{
        const Fetch = async()=>{
            try{
                const res = await axios.get('https://studies-backend-gamma.vercel.app/edit/'+id,{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setTitle(res.data.title);
                setDescription(res.data.description);
                setDate(res.data.date);
            }
            catch(error){
                console.log(error);
            }
        }
        Fetch();
    },[]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post("http://localhost:5000/edittask/"+id,{title,description,date},{
                headers: {
                    Authorization: `Bearer ${token}`,
                }, 
            });    
            console.log("Edit Task Response:", res.data);
            alert("Task Updated Successfully!");
            nav('/Dashboard');
        }
        catch(err){
            console.log("Edit Task Error:", err);
        }  
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Update Task
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Title
                </label>
                <input
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                required
                placeholder="Something short ...."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                />
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
                </label>
                <textarea
                    name="description"
                    id="description"
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                    required
                    placeholder="Enter task details here..."
                    className="w-full h-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none resize-none"
                ></textarea>
            </div>

            <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Date
                </label>
                <input
                type="date"
                name="date"
                id="date"
                value={date.split("T")[0]}
                onChange={(e)=>setDate(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                />
            </div>

            <button
                type="submit"
                className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200">
                    Save Changes
            </button>
            </form>
        </div>
        </div>
    );
}
 

export default Edit;
