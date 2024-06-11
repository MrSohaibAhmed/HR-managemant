import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import TitleCard from "../../components/Cards/TitleCard"
// import { openModal } from "../common/modalSlice"
// import { deleteLead, getLeadsContent } from "./leadSlice"
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../../utils/globalConstantUtil'
// import { showNotification } from '../common/headerSlice'
import { showNotification } from "../../features/common/headerSlice"
import ViewIcon from "../../icons/view"
import { getEmployees, deleteEmployee } from "../../hooks/useEmployee"
import ToogleInput from "../../components/Input/ToogleInput"
import { useNavigate } from "react-router-dom"
import Modal from "../../containers/Modal"
import AcceptIcon from "../../icons/acceptIcon"
import RejectIcon from "../../icons/rejecticon"
import { getNullApplications } from "../../hooks/useLeaves"
const TopSideButtons = () => {
    const navigate = useNavigate()


    const clickHanlder = () => {
        navigate('/app/add-employees')
    }

}

function NewApplication() {
    const navigate = useNavigate()
    const [employees, setEmployees] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedLeadIndex, setSelectedLeadIndex] = useState(null);
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const employeesData = await getNullApplications();
                setEmployees(employeesData?.data);
            } catch (error) {

            }
        };

        fetchData();
    }, []);



    // const getDummyStatus = (index) => {
    //     if (index % 5 === 0) return <div className="badge">Active</div>
    //     else if (index % 5 === 1) return <div className="badge badge-primary">Active</div>
    //     else if (index % 5 === 2) return <div className="badge badge-secondary">Active</div>
    //     else if (index % 5 === 3) return <div className="badge badge-accent">Active</div>
    //     else return <div className="badge badge-ghost">Active</div>
    // }

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
            <TitleCard title="New Application" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>
                <Modal open={showModal} setOpen={setShowModal} selectedLeadIndex={selectedLeadIndex} employeeDelete={employeeDelete} />

                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Employee Name</th>
                                <th>Application</th>
                                <th>Actions</th>

                            </tr>
                        </thead>
                        <tbody>


                            {employees.map((item) => <tr>
                                <td>{item?.employeeName}</td>
                                <td className="flex"><span className=" mr-2">{item?.subject}</span><ViewIcon className="w-5" /></td>
                                <td>
                                    <button className="btn btn-square btn-ghost bg-green-600 mr-2"><AcceptIcon className="w-5 " /></button>
                                    <button className="btn btn-square btn-ghost bg-red-600"><RejectIcon className="w-5 " /></button>
                                    {/* <button className="btn btn-square btn-ghost" onClick={() => showDeleteModal(k)}><ViewIcon className="w-5" /></button> */}
                                </td>
                            </tr>)
                            }




                        </tbody>
                    </table>
                </div>


            </TitleCard>
        </>
    )
}


export default NewApplication