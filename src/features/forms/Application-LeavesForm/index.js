
import { useState } from "react";
import TitleCard from "../../../components/Cards/TitleCard";

function ApplicationLeavesForm() {

    const [formData, setFormData] = useState({
        to: "",
        subject: "",
        date: "",
        body: ""
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
            <TitleCard title="Application for Leave" topMargin="mt-2">
                <div className="w-full">
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={submitHandler}>
                        <div className="mb-4 flex justify-between items-center ">
                            <div className="flex items-center">
                                <label className="block text-gray-700 text-sm font-bold mb-2 w-20" htmlFor="to">
                                    To :
                                </label>

                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="to"
                                    type="email"
                                    placeholder="Email"
                                    onChange={handleChange} />
                            </div>
                            <div className="flex items-center">
                                <label className="block text-gray-700 text-sm font-bold mb-2 w-20" htmlFor="to">
                                    Date :
                                </label>

                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="date"
                                    type="date"
                                    placeholder="Email"
                                    onChange={handleChange} />

                            </div>

                        </div>
                        <div className="mb-4 flex items-center max-w-xs">
                            <label className="block text-gray-700 text-sm font-bold mb-2 w-20" htmlFor="subject">
                                Subject :
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="subject"
                                type="text"
                                placeholder="Subject"
                                onChange={handleChange} />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="body">
                                Body
                            </label>
                            <textarea className="shadow appearance-none border rounded w-full py-6 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="body"
                                rows="4"
                                placeholder="Write application here"
                                onChange={handleChange}>

                            </textarea>
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

export default ApplicationLeavesForm;
