


import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import TitleCard from "../../components/Cards/TitleCard"
import { openModal } from "../common/modalSlice"
// import { deleteLead, getLeadsContent } from "./leadSlice"
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../../utils/globalConstantUtil'
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'
import { showNotification } from '../common/headerSlice'
import EditIcon from "../../icons/edit"
import ViewIcon from "../../icons/view"
import { getEmployees, deleteEmployee } from "../../hooks/useEmployee"
import ToogleInput from "../../components/Input/ToogleInput"
import { useNavigate } from "react-router-dom"
import Modal from "../../containers/Modal"
const TopSideButtons = () => {
    const navigate = useNavigate()


    const clickHanlder = () => {
        navigate('/app/application-leaves')
    }

    return (
        <div className="inline-block float-right">
            <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => clickHanlder()}>Add New</button>
        </div>
    )
}

function ApplicationSummary() {
    const navigate = useNavigate()
    const [employees, setEmployees] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedLeadIndex, setSelectedLeadIndex] = useState(null);
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const employeesData = await getEmployees();
                setEmployees(employeesData);
            } catch (error) {

            }
        };

        fetchData();
    }, []);


    const getDummyStatus = (index) => {
        if (index % 5 === 0) return <div className="badge">Active</div>
        else if (index % 5 === 1) return <div className="badge badge-primary">Active</div>
        else if (index % 5 === 2) return <div className="badge badge-secondary">Active</div>
        else if (index % 5 === 3) return <div className="badge badge-accent">Active</div>
        else return <div className="badge badge-ghost">Active</div>
    }

    const showDeleteModal = (entry) => {
        setSelectedLeadIndex(entry._id);
        setShowModal(true);
    };
    const employeeDelete = async (id) => {
        try {
            const employesAfterDelete = await deleteEmployee(id);
            setEmployees(employesAfterDelete);
            dispatch(showNotification({ message: "Employee Deleted Successfully", status: 1 }));

        } catch (error) {
            dispatch(showNotification({ message: "Error In Deleting Employee", status: 0 }));
        }

    }
    const editData = (data) => {
        navigate('/app/add-employees', { state: data });
    }

    const showEmployeeDetail = () => {
        navigate('/app/employee-detail')
    }


    return (
        <>
            <TitleCard title="Applications" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>
                <Modal open={showModal} setOpen={setShowModal} selectedLeadIndex={selectedLeadIndex} employeeDelete={employeeDelete} />

                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Application Name</th>
                                <th>Date</th>
                                <th>Status</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Sick Leave</td>
                                <td className="flex">02-05-2024</td>
                                <td>
                                    {/* <button className="btn btn-square btn-ghost bg-green-600 mr-2"><AcceptIcon className="w-5 " /></button>
                                     <button className="btn btn-square btn-ghost bg-red-600"><RejectIcon className="w-5 " /></button> */}
                                    <span className="bg-green-600 p-1"> accepted</span>
                                </td>
                            </tr>
                            <tr>
                                <td>work at home</td>
                                <td className="flex">02-05-2024</td>
                                <td>
                                    {/* <button className="btn btn-square btn-ghost bg-green-600 mr-2"><AcceptIcon className="w-5 " /></button>
                                     <button className="btn btn-square btn-ghost bg-red-600"><RejectIcon className="w-5 " /></button> */}
                                    <span className="bg-red-600 p-1"> rejected</span>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </TitleCard>
        </>
    )
}


export default ApplicationSummary