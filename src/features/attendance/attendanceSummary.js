
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { getEmployees } from "../../hooks/useEmployee";
import { addAttendance } from "../../hooks/useAttendance";
import { showNotification } from "../common/headerSlice";
import check from "../../images/check.png"
import cross from "../../images/crossImg.jpg"
import { getAttendanceOfAllEmployees } from "../../hooks/useAttendance";
import AttendenceModal from "./components/ModelComp";
function AttendanceSummary() {
    const [employees, setEmployees] = useState([]);
    const [attendanceData, setAttendanceData] = useState([]);
    const [modal, setModal] = useState(false);
    const dispatch = useDispatch();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const employeesData = await getEmployees();
                setEmployees(employeesData);
                // Initialize attendance data with employee IDs
                const initialAttendanceData = employeesData.map(employee => ({
                    employeeId: employee._id,
                    status: 'present',
                    checkIn: '',
                    checkOut: ''
                }));
                setAttendanceData(initialAttendanceData);
            } catch (error) {
                console.error("Error fetching employees:", error);
            }
        };

        fetchData();
    }, []);

    const handleAttendanceChange = (employeeId, field, value) => {
        setAttendanceData(prevData => {
            const updatedData = prevData.map(item => {
                if (item.employeeId === employeeId) {
                    return { ...item, [field]: value };
                }
                return item;
            });
            return updatedData;
        });
    };

    const handleSave = async () => {
        console.log("Collected attendance data:", attendanceData);
        const attendanceResponse = await addAttendance(attendanceData);
        dispatch(showNotification({ message: "Attendance Marked For Today", status: 1 }));
        console.log(attendanceResponse);
    };

    const showModal = () => {
        setModal(true);
    };

    const closeModal = () => {
        setModal(false);
    };

    const renderEmployeeRow = (employee) => {
        return (
            <tr key={employee._id}>
                <td>
                    <div className="flex items-center space-x-3">
                        <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                                <img src="https://static.vecteezy.com/system/resources/thumbnails/011/961/865/small/programmer-icon-line-color-illustration-vector.jpg" alt="pic" />
                            </div>
                        </div>
                        <div>
                            <div className="font-bold">{employee.employeeName}</div>
                        </div>
                    </div>
                </td>
                {[...Array(31).keys()].map(day => (
                    <td key={day} onClick={showModal}>
                        <img src={check} height={200} width={200} />
                    </td>
                ))}
            </tr>
        );
    };

    // const modalContent = (
    //     <div id="default-modal" tabIndex="-1" aria-hidden="true" className={`fixed top-0 right-0 left-0 bottom-0 z-50 overflow-y-auto bg-gray-200 bg-opacity-60 flex justify-center items-center`}>
    //         <div className="bg-white w-full max-w-2xl p-4 rounded-lg shadow-lg">
    //             <div className="flex items-center justify-between border-b pb-2 mb-4">
    //                 <h3 className="text-lg font-semibold">Terms of Service</h3>
    //                 <button className="text-gray-500 hover:text-gray-800" onClick={closeModal}>
    //                     <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
    //                         <path fillRule="evenodd" d="M2.293 2.293a1 1 0 011.414 0L10 8.586l6.293-6.293a1 1 0 111.414 1.414L11.414 10l6.293 6.293a1 1 0 01-1.414 1.414L10 11.414l-6.293 6.293a1 1 0 01-1.414-1.414L8.586 10 2.293 3.707a1 1 0 010-1.414z" clipRule="evenodd" />
    //                     </svg>
    //                 </button>
    //             </div>
    //             <div className="text-sm text-gray-700">
    //                 <p className="mb-2">With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.</p>
    //                 <p>The European Union's General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.</p>
    //             </div>
    //             <div className="flex justify-end pt-4 border-t">
    //                 <button className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded mr-2" onClick={closeModal}>Close</button>
    //                 {/* <button className="text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded">Accept</button> */}
    //             </div>
    //         </div>
    //     </div>
    // );
    useEffect(() => {
        const fetchData = async () => {
            const response = await getAttendanceOfAllEmployees();
            debugger
            console.log(response)
        }
        fetchData();
    }, [])

    return (
        <TitleCard title="Attendance" topMargin="mt-2">
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Name</th>
                            {[...Array(31).keys()].map(day => (
                                <th key={day}>{day + 1}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(employee => renderEmployeeRow(employee))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-end items-baseline pt-5">
                <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 border border-blue-700 rounded">
                    Save
                </button>
            </div>
            {/* Modal rendering */}
            {modal && <AttendenceModal closeModal = {closeModal}/> }
        </TitleCard>
    );
}

export default AttendanceSummary;