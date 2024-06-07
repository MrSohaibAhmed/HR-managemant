

import { useDispatch, useSelector } from "react-redux"
import TitleCard from "../../components/Cards/TitleCard"
import { useNavigate } from "react-router-dom"
import { getEmployees } from "../../hooks/useEmployee"
import MonthlyAttendenceDetail from "./EmployeeAttendenceDetail";


const data = [
    { date: '2024-06-01', status: 'Present' },
    { date: '2024-06-02', status: 'Absent' },
    { date: '2024-06-03', status: 'Leave' },
    { date: '2024-06-04', status: 'Present' },
    { date: '2024-06-05', status: 'Absent' },
    { date: '2024-06-06', status: 'Present' },
    { date: '2024-06-07', status: 'Present' },
    { date: '2024-06-08', status: 'Absent' },
    { date: '2024-06-09', status: 'Present' },
    { date: '2024-06-10', status: 'Present' },
    { date: '2024-06-11', status: 'Leave' },
    { date: '2024-06-12', status: 'Present' },
    { date: '2024-06-05', status: 'Absent' },
    { date: '2024-06-06', status: 'Present' },
    { date: '2024-06-07', status: 'Present' },
    { date: '2024-06-08', status: 'Absent' },
    { date: '2024-06-09', status: 'Present' },
    { date: '2024-06-10', status: 'Present' },
    { date: '2024-06-11', status: 'Leave' },
    { date: '2024-06-12', status: 'Present' },

];



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

function EmployeeDetail() {





    const HandleButtonClick = () => {
        console.log("clicked");
    }



    return (
        <>

            <TitleCard title="Employee Detail" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>
                {/* Leads List in table format loaded from slice after api call */}
                <div className="overflow-x-auto w-full">


                    <table className="min-w-full border-collapse border border-gray-300">

                        <tbody>

                            <tr className="even:bg-gray-50 hover:bg-gray-200">
                                <td className="border border-gray-300 px-4 py-2">Name:</td>
                                <td className="border border-gray-300 px-4 py-2">Sohaib</td>
                            </tr>
                            <tr className="even:bg-gray-50 hover:bg-gray-200">
                                <td className="border border-gray-300 px-4 py-2">Email: :</td>
                                <td className="border border-gray-300 px-4 py-2">Sohaib@gmail.com</td>
                            </tr>
                            <tr className="even:bg-gray-50 hover:bg-gray-200">
                                <td className="border border-gray-300 px-4 py-2">Designation :</td>
                                <td className="border border-gray-300 px-4 py-2">Frontend Engineer</td>
                            </tr>
                            <tr className="even:bg-gray-50 hover:bg-gray-200">
                                <td className="border border-gray-300 px-4 py-2">Joining Date :</td>
                                <td className="border border-gray-300 px-4 py-2">05-05-2022</td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </TitleCard>
            {/* Attenddence Detail */}
           
            <TitleCard title="Attendence" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>
                {/* Leads List in table format loaded from slice after api call */}
                <div className="overflow-x-auto w-full">

                    {/* <table className="min-w-full border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-start">Date</th>
                                <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-start">Status</th>

                            </tr>
                        </thead>
                        <tbody>
                            {data.map((record, index) => (
                                <tr key={index} className="even:bg-gray-50 hover:bg-gray-200">
                                    <td className="border border-gray-300 px-4 py-2">{record.date}</td>
                                    <td className="border border-gray-300 px-4 py-2 ">
                                        <span className={`${record.status === "Present"
                                            ? "bg-green-500 p-2"
                                            : record.status === "Absent"
                                                ? "bg-red-600 p-2"
                                                : record.status === "Leave" ? "bg-orange-500 p-2" : ""
                                            }`}>{record.status}
                                        </span>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table> */}
                     <MonthlyAttendenceDetail/>

                </div>
            </TitleCard>
            {/* Project Detail */}
            <TitleCard title="Projects" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>
                {/* Leads List in table format loaded from slice after api call */}
                <div className="overflow-x-auto w-full">


                    <table className="min-w-full border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-start">Name</th>
                                <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-start">Start Date</th>
                                <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-start">End Date</th>
                                <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-start">Role</th>

                            </tr>
                        </thead>
                        <tbody>

                            <tr className="even:bg-gray-50 hover:bg-gray-200">
                                <td className="border border-gray-300 px-4 py-2">Lamina App</td>
                                <td className="border border-gray-300 px-4 py-2">01-05-2024</td>
                                <td className="border border-gray-300 px-4 py-2">12-05-2024</td>
                                <td className="border border-gray-300 px-4 py-2">Frontend Engineer</td>

                            </tr>
                            <tr className="even:bg-gray-50 hover:bg-gray-200">
                                <td className="border border-gray-300 px-4 py-2">Fusion App</td>
                                <td className="border border-gray-300 px-4 py-2">01-05-2024</td>
                                <td className="border border-gray-300 px-4 py-2">12-05-2024</td>
                                <td className="border border-gray-300 px-4 py-2">Frontend Engineer</td>

                            </tr>
                            <tr className="even:bg-gray-50 hover:bg-gray-200">
                                <td className="border border-gray-300 px-4 py-2">HR Management System</td>
                                <td className="border border-gray-300 px-4 py-2">01-05-2024</td>
                                <td className="border border-gray-300 px-4 py-2">12-05-2024</td>
                                <td className="border border-gray-300 px-4 py-2">MERN Stack</td>

                            </tr>

                        </tbody>
                    </table>
                </div>
            </TitleCard>
            {/* Salary Detail */}
            <TitleCard title="Salary Details" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>
                {/* Leads List in table format loaded from slice after api call */}
                <div className="overflow-x-auto w-full">
                    <div className="pb-4"> <input type="date" /></div>
                    <table className="min-w-full border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-start">Total Salary</th>
                                <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-start">Deduction</th>
                                <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-start">Remaining Salary</th>
                                <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-start">Transaction Date</th>

                            </tr>
                        </thead>
                        <tbody>

                            <tr className="even:bg-gray-50 hover:bg-gray-200">
                                <td className="border border-gray-300 px-4 py-2">900000</td>
                                <td className="border border-gray-300 px-4 py-2">2000</td>
                                <td className="border border-gray-300 px-4 py-2">40000</td>
                                <td className="border border-gray-300 px-4 py-2">01-05-2024</td>

                            </tr>
                            <tr className="even:bg-gray-50 hover:bg-gray-200">
                                <td className="border border-gray-300 px-4 py-2">Fusion App</td>
                                <td className="border border-gray-300 px-4 py-2">01-05-2024</td>
                                <td className="border border-gray-300 px-4 py-2">12-05-2024</td>
                                <td className="border border-gray-300 px-4 py-2">Frontend Engineer</td>

                            </tr>
                            <tr className="even:bg-gray-50 hover:bg-gray-200">
                                <td className="border border-gray-300 px-4 py-2">HR Management System</td>
                                <td className="border border-gray-300 px-4 py-2">01-05-2024</td>
                                <td className="border border-gray-300 px-4 py-2">12-05-2024</td>
                                <td className="border border-gray-300 px-4 py-2">MERN Stack</td>

                            </tr>

                        </tbody>
                    </table>
                </div>
            </TitleCard>
        </>
    )
}


export default EmployeeDetail