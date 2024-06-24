import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { getEmployees } from "../../hooks/useEmployee";
import { addAttendance } from "../../hooks/useAttendance";
import { showNotification } from "../common/headerSlice";

function AttendanceSummary() {
    const [employees, setEmployees] = useState([]);
    const [attendanceData, setAttendanceData] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const employeesData = await getEmployees();
                setEmployees(employeesData);
                // Initialize attendance data with employee IDs
                const initialAttendanceData = employeesData.map(employee => ({
                    employeeId: employee._id,
                    status: 'present', // Initialize as present for simplicity
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
                    <td key={day}>
                        <input
                            style={{ width: "20px", height: "20px" }}
                            type="checkbox"
                            checked={attendanceData.find(item => item.employeeId === employee._id)?.status === 'present'}
                            onChange={() => handleAttendanceChange(employee._id, 'status', 'present')}
                            className="form-checkbox"
                        />
                    </td>
                ))}
            </tr>
        );
    };

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
        </TitleCard>
    );
}

export default AttendanceSummary;
