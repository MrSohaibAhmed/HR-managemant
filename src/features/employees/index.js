import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import TitleCard from "../../components/Cards/TitleCard"
import { openModal } from "../common/modalSlice"
import { deleteLead, getLeadsContent } from "./leadSlice"
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
        navigate('/app/add-employees')
    }

    return (
        <div className="inline-block float-right">
            <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => clickHanlder()}>Add New</button>
        </div>
    )
}

function Employees() {
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

    return (
        <>
            <TitleCard title="Employees" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>
                <Modal open={showModal} setOpen={setShowModal} selectedLeadIndex={selectedLeadIndex} employeeDelete={employeeDelete} />
                {employees.length > 0 &&
                    <div className="overflow-x-auto w-full">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email Id</th>
                                    <th>Joining Date</th>
                                    <th>Status</th>
                                    <th>Designation</th>
                                    <th></th>
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
                                                                {/* <img src={l?.avatar} alt="pic" /> */}
                                                                <img src="https://static.vecteezy.com/system/resources/thumbnails/011/961/865/small/programmer-icon-line-color-illustration-vector.jpg" alt="pic" />

                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="font-bold">{l?.employeeName}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{l?.employeeEmail}</td>
                                                <td>{l?.joiningDate}</td>
                                                <td>{l?.status}</td>
                                                <td>{l?.designation}</td>
                                                <td>
                                                    <button className="btn btn-square btn-ghost" onClick={() => showDeleteModal(l)}><TrashIcon className="w-5" /></button>
                                                    <button className="btn btn-square btn-ghost" onClick={() => editData(l)}><EditIcon className="w-5" /></button>
                                                    <button className="btn btn-square btn-ghost" onClick={() => showDeleteModal(k)}><ViewIcon className="w-5" /></button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                }
                {
                    employees.length == 0 && <div>
                        <p>No Records Founds</p>
                    </div>
                }
            </TitleCard>
        </>
    )
}


export default Employees