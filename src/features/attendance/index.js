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
                // Initialize attendance data with employee IDs
                const initialAttendanceData = employeesData.map(employee => ({
                    employeeId: employee._id,
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


    const handleAttendanceChange = (employeeId, field, value) => {
        setAttendanceData(prevData => {
            const updatedData = prevData.map(item => {
                if (item.employeeId === employeeId) {
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
    const handleSave = () => {
        console.log("Collected attendance data:", attendanceData);
        // Here you can send the data to your backend or handle it as needed
        // Example:
        // fetch('/api/save-attendance', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(attendanceData)
        // }).then(response => response.json())
        // .then(data => console.log(data))
        // .catch(error => console.error('Error:', error));
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
                                <th>Check in</th>
                                <th>Check out</th>
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
                                                    name={`attendance-${l._id}`}
                                                    value="present"
                                                    // checked={attendance[l.id] === 'present'}
                                                    onChange={() => handleAttendanceChange(l._id, 'status', 'present')}
                                                    className="form-radio"
                                                />
                                            </td>
                                            <td className="py-2 px-4  ">
                                                <input
                                                    style={{ width: "20px", height: "20px" }}
                                                    type="radio"
                                                    name={`attendance-${l._id}`}
                                                    value="absent"
                                                    // checked={attendance[l.id] === 'absent'}
                                                    onChange={() => handleAttendanceChange(l._id, 'status', 'absent')}
                                                    className="form-radio"
                                                />
                                            </td>
                                            <td className="py-2 px-4 ">
                                                <input
                                                    style={{ width: "20px", height: "20px" }}
                                                    type="radio"
                                                    name={`attendance-${l._id}`}
                                                    value="leave"
                                                    // checked={attendance[l.id] === 'leave'}
                                                    // onChange={() => handleAttendanceChange(l._id, 'leave')}
                                                    onChange={() => handleAttendanceChange(l._id, 'status', 'leave')}
                                                    className="form-radio"
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="time"
                                                    value={attendanceData.find(item => item.employeeId === l._id)?.checkIn || ''}
                                                    onChange={(e) => handleAttendanceChange(l._id, 'checkIn', e.target.value)}
                                                    disabled={attendanceData.find(item => item.employeeId === l._id)?.status !== 'present'}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="time"
                                                    value={attendanceData.find(item => item.employeeId === l._id)?.checkOut || ''}
                                                    onChange={(e) => handleAttendanceChange(l._id, 'checkOut', e.target.value)}
                                                    disabled={attendanceData.find(item => item.employeeId === l._id)?.status !== 'present'}
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