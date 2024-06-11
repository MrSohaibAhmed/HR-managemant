
import { useState } from "react";
import TitleCard from "../../../components/Cards/TitleCard";

function AnnouncementForm() {

    const [formData, setFormData] = useState({
        by: "",
        name: "",
        description: ""
    });

    const submitHandler = (e) => {
        e.preventDefault();
        console.log("Form Data is", formData);
    }

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };


    return (
        <>
            <TitleCard title="Add Announcements" topMargin="mt-2">
                <div className="w-full">
                    <form className="bg-transparent shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={submitHandler}>
                        <div className="mb-4 flex justify-between items-center ">
                            <div className="flex items-center border">
                                <label className="block text-gray-700 text-sm font-bold px-2 border-r" htmlFor="to">
                                    Name:
                                </label>

                                <input className="  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="name"
                                    type="text"
                                    placeholder="Announcement"
                                    onChange={handleChange} />
                            </div>
                           

                        </div>
                       
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="body">
                                Description
                            </label>
                            <textarea className="shadow appearance-none border rounded w-full py-6 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="description"
                                rows="4"
                                placeholder="Write announcement here"
                                onChange={handleChange}>

                            </textarea>
                        </div>


                        <div className="mb-4 flex justify-between items-center ">
                            <div className="flex items-center border">
                                <label className="block  border-r text-gray-700 text-sm font-bold px-2 m-0" htmlFor="to">
                                    By
                                </label>

                                <input className=" w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="by"
                                    type="text"
                                    placeholder="By"
                                    onChange={handleChange} />
                            </div>
                           

                        </div>

                        <div className="flex items-center justify-between">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </TitleCard>
        </>
    );
}

export default AnnouncementForm;
