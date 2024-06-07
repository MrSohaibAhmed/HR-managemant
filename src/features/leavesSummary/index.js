
import moment from "moment";
import { useEffect, useState } from "react"
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

function LeavesSummary() {
    const { leads } = useSelector(state => state.lead)
    const dispatch = useDispatch()
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState('All');
    const [selectedDate, setSelectedDate] = useState();



    useEffect(() => {
        const fetchData = async () => {
            try {
                const employeesData = await getEmployees();
                setEmployees(employeesData);
                console.log("EMployees data =>", employeesData);
            } catch (error) {
                console.error("Error fetching employees data:", error);
            }
        };

        fetchData();
    }, []);

    const handleEmployeeChange = (event) => {
        setSelectedEmployee(event.target.value);
    };

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    }



    const filteredEmployees = selectedEmployee === 'All' 
        ? employees 
        : employees.filter(employee => employee.employeeName === selectedEmployee);

    return (
        <>
            <TitleCard title="Leaves Summary" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>
                {/* Leads List in table format loaded from slice after api call */}
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th className="flex items-center">
                                         Date 
                                    <input 
                                        type="date" 
                                        value={selectedDate} 
                                        onChange={handleDateChange} 
                                        className="form-input ml-2 p-2"
                                    />
                                    
                                </th>

                                <th>
                                    <select value={selectedEmployee} onChange={handleEmployeeChange} className="form-select  p-2">
                                        <option value="All">All Employees</option>
                                        {employees.map((employee) => (
                                            <option key={employee.id} value={employee.employeeName}>{employee.employeeName}</option>
                                        ))}
                                    </select>
                                </th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEmployees.map((employee) =>
                            (
                                <tr>
                                    <td>{employee.joiningDate}</td>
                                    
                                    <td>{employee.employeeName}</td>
                                    <td> <span className="text-white bg-green-600 p-2">accepted</span></td>
                                </tr>

                            ))}

                        </tbody>
                    </table>
                </div>
            </TitleCard>
        </>
    )
}


export default LeavesSummary