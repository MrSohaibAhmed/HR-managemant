import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import TitleCard from "../../components/Cards/TitleCard"
import { openModal } from "../common/modalSlice"
import { deleteLead, getLeadsContent } from "./leadSlice"
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../../utils/globalConstantUtil'
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'
import { showNotification } from '../common/headerSlice'
import { getEmployees } from "../../hooks/useEmployee"
import { addAttendance } from "../../hooks/useAttendance"
const TopSideButtons = () => {

    const dispatch = useDispatch()

    const openAddNewLeadModal = () => {
        dispatch(openModal({ title: "Add New Lead", bodyType: MODAL_BODY_TYPES.LEAD_ADD_NEW }))
    }

    // return (
    //     <div className="inline-block float-right">
    //         <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => openAddNewLeadModal()}>Add New</button>
    //     </div>
    // )
}

function Attendance() {
    const [employees, setEmployees] = useState([]);

    const [todayDate, setTodayDate] = useState('');

    const { leads } = useSelector(state => state.lead)
    const dispatch = useDispatch()
    const [attendanceData, setAttendanceData] = useState([]);


    useEffect(() => {
        dispatch(getLeadsContent())
    }, [])


    useEffect(() => {
        const fetchData = async () => {
            try {
                const employeesData = await getEmployees();
                setEmployees(employeesData);
                debugger
                // Initialize attendance data with employee IDs
                const initialAttendanceData = employeesData.map(employee => ({
                    userId: employee.userId,
                    status: '',
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

    const getDummyStatus = (index) => {
        if (index % 5 === 0) return <div className="badge">Not Interested</div>
        else if (index % 5 === 1) return <div className="badge badge-primary">In Progress</div>
        else if (index % 5 === 2) return <div className="badge badge-secondary">Sold</div>
        else if (index % 5 === 3) return <div className="badge badge-accent">Need Followup</div>
        else return <div className="badge badge-ghost">Open</div>
    }

    const deleteCurrentLead = (index) => {
        dispatch(openModal({
            title: "Confirmation", bodyType: MODAL_BODY_TYPES.CONFIRMATION,
            extraObject: { message: `Are you sure you want to delete this lead?`, type: CONFIRMATION_MODAL_CLOSE_TYPES.LEAD_DELETE, index }
        }))
    }


    const handleAttendanceChange = (userId, field, value) => {
        setAttendanceData(prevData => {
            const updatedData = prevData.map(item => {
                if (item.userId === userId) {
                    if (field === 'status' && value !== 'present') {
                        return { ...item, status: value, checkIn: '', checkOut: '' };
                    }
                    return { ...item, [field]: value };
                }
                return item;
            });
            return updatedData;
        });
    };
    const handleSave = async () => {
        console.log("Collected attendance data:", attendanceData);
        const attendaceResponse = await addAttendance(attendanceData);
        dispatch(showNotification({ message: "Attendance Marked For Today", status: 1 }));
        console.log(attendaceResponse);
    };
    useEffect(() => {
        const today = new Date();

        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        const formattedToday = yyyy + '-' + mm + '-' + dd;
        setTodayDate(formattedToday);
    }, []);

    return (
        <>
            <TitleCard title="Attendance" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>
                <div>
                    <input type="date" value={todayDate} />
                </div>
                <br />
                {/* Leads List in table format loaded from slice after api call */}
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Present</th>
                                <th>Absent</th>
                                <th>Leave</th>
                                <th>Check In</th>
                                <th>Check Out</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                employees.map((l, k) => {
                                    return (
                                        <tr key={k}>
                                            <td>
                                                <div className="flex items-center space-x-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle w-12 h-12">
                                                            <img src="https://static.vecteezy.com/system/resources/thumbnails/011/961/865/small/programmer-icon-line-color-illustration-vector.jpg" alt="pic" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold">{l.employeeName}</div>
                                                        {/* <div className="text-sm opacity-50">{l.last_name}</div> */}
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="py-2 px-4  ">
                                                <input
                                                    style={{ width: "20px", height: "20px" }}
                                                    type="radio"
                                                    name={`attendance-${l.userId}`}
                                                    value="present"
                                                    // checked={attendance[l.id] === 'present'}
                                                    onChange={() => handleAttendanceChange(l.userId, 'status', 'present')}
                                                    className="form-radio"
                                                />
                                            </td>
                                            <td className="py-2 px-4  ">
                                                <input
                                                    style={{ width: "20px", height: "20px" }}
                                                    type="radio"
                                                    name={`attendance-${l.userId}`}
                                                    value="absent"
                                                    // checked={attendance[l.id] === 'absent'}
                                                    onChange={() => handleAttendanceChange(l.userId, 'status', 'absent')}
                                                    className="form-radio"
                                                />
                                            </td>
                                            <td className="py-2 px-4 ">
                                                <input
                                                    style={{ width: "20px", height: "20px" }}
                                                    type="radio"
                                                    name={`attendance-${l.userId}`}
                                                    value="leave"
                                                    // checked={attendance[l.id] === 'leave'}
                                                    // onChange={() => handleAttendanceChange(l.userId, 'leave')}
                                                    onChange={() => handleAttendanceChange(l.userId, 'status', 'leave')}
                                                    className="form-radio"
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="time"
                                                    value={attendanceData.find(item => item.userId === l.userId)?.checkIn || ''}
                                                    onChange={(e) => handleAttendanceChange(l.userId, 'checkIn', e.target.value)}
                                                    disabled={attendanceData.find(item => item.userId === l.userId)?.status !== 'present'}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="time"
                                                    value={attendanceData.find(item => item.userId === l.userId)?.checkOut || ''}
                                                    onChange={(e) => handleAttendanceChange(l.userId, 'checkOut', e.target.value)}
                                                    disabled={attendanceData.find(item => item.userId === l.userId)?.status !== 'present'}
                                                />
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className=" flex justify-end items-baseline pt-5">
                    {/* <button className="btn px-6 btn-sm normal-case btn-primary" >Save</button> */}
                    <button onClick={handleSave} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 border border-blue-700 rounded">
                        Save
                    </button>
                </div>
            </TitleCard>
        </>
    )
}


export default Attendance