import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Addtask = ({onClose}) => {

    const token = localStorage.getItem("token");

    const nav = useNavigate();

    const [formData,setFormData] = useState({
        title:"",
        description:"",
        date:""
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post("http://localhost:5000/addtask",formData,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("Add Task Response:", res.data);
            alert("Task Added Successfully!");
            nav('/Dashboard');
        }
        catch(err){
            console.log("Add Task Error:", err);
        }

    }   

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Add A Task
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Task Name
                </label>
                <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Something short ...."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                />
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Task Description
                </label>
                <textarea
                    name="description"
                    id="description"
                    value={formData.description}
                    onChange={handleChange}
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
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                />
            </div>

            <button
                type="submit"
                className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200">
                Add Task
            </button>
            </form>
        </div>
        </div>
    );
}
 
export default Addtask;