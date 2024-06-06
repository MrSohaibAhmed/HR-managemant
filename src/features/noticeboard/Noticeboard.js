

import { useDispatch, useSelector } from "react-redux"
import TitleCard from "../../components/Cards/TitleCard"
import { useNavigate } from "react-router-dom"
import { getEmployees } from "../../hooks/useEmployee"

const TopSideButtons = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate();


    // const openAddNewLeadModal = () => {
    //     dispatch(openModal({ title: "Add New Lead", bodyType: MODAL_BODY_TYPES.LEAD_ADD_NEW }))
    // }

    const clickHandler = () => {
        navigate('/app/add-projects')
    }


}

function Noticeboard() {
  




    const HandleButtonClick = () =>{
        console.log("clicked");
    }



    return (
        <>
            <div className="flex justify-between bg-base-100 shadow-xl rounded-lg">
                <div className="p-5">
                    <div> <span className="font-bold">Important Notice</span> <span className=" text-xs bg-red-600 text-white p-1">5 unread message</span></div>
                    <p>From Admins , HR</p>
                </div>
                <div  className="p-5">
                    <button onClick={HandleButtonClick} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Show All</button>
                </div>
            </div>
            <TitleCard title="All Notices" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>
                {/* Leads List in table format loaded from slice after api call */}
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">


                        <thead>
                            <tr>
                                <th></th>
                                <th>Notice By</th>
                                <th> description </th>
                                <th>Date</th>
                                <th>Time</th>
                            </tr>
                        </thead>

                        <tbody>

                            <tr>
                                <td><input type="checkbox" /> </td>
                                <td>Admin</td>
                                <td>Eid ul Adha holiday start from 16 june 2024</td>
                                <td>yesterday</td>
                                <td>{new Date().toLocaleTimeString('en-US')}</td>

                            </tr>
                            <tr>
                                <td><input type="checkbox" /> </td>
                                <td>Admin</td>
                                <td>Eid ul Adha holiday start from 16 june 2024</td>
                                <td>yesterday</td>
                                <td>{new Date().toLocaleTimeString('en-US')}</td>

                            </tr>

                        </tbody>
                    </table>
                </div>
            </TitleCard>
        </>
    )
}


export default Noticeboard