

import { useDispatch, useSelector } from "react-redux"
import TitleCard from "../../components/Cards/TitleCard"
import { useNavigate } from "react-router-dom"
import { getEmployeeDetail, getEmployees } from "../../hooks/useEmployee"
import MonthlyAttendenceDetail from "./EmployeeAttendenceDetail";
import { useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../app/context/appContext";
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

    const [employeeData, setEmployeeData] = useState([])
    const location = useLocation();
    const { state: data } = location;
    console.log(data);

    const HandleButtonClick = () => {
        console.log("clicked");
    }

    useEffect(() => {
        const fetchData = async () => {
            const resp = await getEmployeeDetail(data.userId)
            debugger
            console.log("respone employee data is employess detail =>" , resp);
            setEmployeeData(resp)
        }
        fetchData();
    }, [])

    return (
        <>

            <TitleCard title="Employee Detail" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>
                {/* Leads List in table format loaded from slice after api call */}
                <div className="overflow-x-auto w-full">


                    <table className="min-w-full border-collapse border border-gray-300">

                        <tbody>

                            <tr className="  hover:bg-gray-200">
                                <td className="border border-gray-300 px-4 py-2 font-bold">Name</td>
                                <td className="border border-gray-300 px-4 py-2">{employeeData?.employeeDetails?.[0]?.employeeName}</td>
                            </tr>
                            <tr className=" hover:bg-gray-200">
                                <td className="border border-gray-300 px-4 py-2 font-bold">Email</td>
                                <td className="border border-gray-300 px-4 py-2">{employeeData?.employeeDetails?.[0]?.employeeEmail}</td>
                            </tr>
                            <tr className="  hover:bg-gray-200">
                                <td className="border border-gray-300 px-4 py-2 font-bold">Designation</td>
                                <td className="border border-gray-300 px-4 py-2">{employeeData?.employeeDetails?.[0]?.designation}</td>
                            </tr>
                            <tr className="   hover:bg-gray-200">
                                <td className="border border-gray-300 px-4 py-2 font-bold">Joining Date</td>
                                <td className="border border-gray-300 px-4 py-2">{employeeData?.employeeDetails?.[0]?.joiningDate}</td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </TitleCard>
            {/* Attenddence Detail */}

            <TitleCard title="Attendence" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>
                {/* Leads List in table format loaded from slice after api call */}
                <div className="overflow-x-auto w-full">

                    <MonthlyAttendenceDetail EmployeeAttendance={employeeData?.Attendance} />

                </div>
            </TitleCard>
            {/* Project Detail */}
            <TitleCard title="Projects" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>
                {/* Leads List in table format loaded from slice after api call */}
                <div className="overflow-x-auto w-full">


                    <table className="min-w-full border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2 bg-transparent text-start">Name</th>
                                <th className="border border-gray-300 px-4 py-2 bg-transparent text-start">Start Date</th>
                                <th className="border border-gray-300 px-4 py-2 bg-transparent text-start">End Date</th>
                                <th className="border border-gray-300 px-4 py-2 bg-transparent text-start">Role</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                employeeData?.Projects?.map((item) => <tr className="even:bg-gray-50 hover:bg-gray-200">
                                    <td className="border border-gray-300 px-4 py-2">{item?.projectName}</td>
                                    <td className="border border-gray-300 px-4 py-2">{item?.startingDate}</td>
                                    <td className="border border-gray-300 px-4 py-2">{item?.deadline}</td>
                                    <td className="border border-gray-300 px-4 py-2">{employeeData?.employeeDetails?.[0]?.designation}</td>

                                </tr>)
                            }




                        </tbody>
                    </table>
                </div>
            </TitleCard>
            {/* Salary Detail */}
            <TitleCard title="Salary Details" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>
                {/* Leads List in table format loaded from slice after api call */}
                <div className="overflow-x-auto w-full">
                    
                    <table className="min-w-full border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2 bg-transparent text-start">Total Salary</th>
                                <th className="border border-gray-300 px-4 py-2 bg-transparent text-start">Deduction</th>
                                <th className="border border-gray-300 px-4 py-2 bg-transparent text-start">Remaining Salary</th>
                                <th className="border border-gray-300 px-4 py-2 bg-transparent text-start">Transaction Date</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                employeeData?.sallery?.map((item) => <tr className="even:bg-gray-50 hover:bg-gray-200">
                                    <td className="border border-gray-300 px-4 py-2">{item?.salary}</td>
                                    <td className="border border-gray-300 px-4 py-2">2000</td>
                                    <td className="border border-gray-300 px-4 py-2">40000</td>
                                    <td className="border border-gray-300 px-4 py-2">01-05-2024</td>

                                </tr>)

                            }




                        </tbody>
                    </table>
                </div>
            </TitleCard>
        </>
    )
}


export default EmployeeDetail