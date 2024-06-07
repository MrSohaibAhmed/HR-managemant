
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
import DownloadIcon from "../../icons/downloadIcon"
const TopSideButtons = () => {
    const navigate = useNavigate()


    const clickHanlder = () => {
        console.log('clicked')
    }

    return (
        <div className="inline-block float-right">
            <button className="btn px-6 btn-sm normal-case btn-primary" onClick={clickHanlder}>Upload New File</button>
        </div>
    )
}

function FileStorage() {
    const navigate = useNavigate()
    const [employees, setEmployees] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedLeadIndex, setSelectedLeadIndex] = useState(null);
    const dispatch = useDispatch()



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
  

    const downloadFile = ()=>{
        console.log("clicked download");
    }

    return (
        <>
            <TitleCard title="My Files" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>
                <Modal open={showModal} setOpen={setShowModal} selectedLeadIndex={selectedLeadIndex} employeeDelete={employeeDelete} />

                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Asset Name</th>
                                <th>Tag</th>
                                <th>Created At</th>
                                <th>Owner</th>
                                <th>Last modified</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr>
                                <td>
                                    fusion document
                                </td>
                                <td>test</td>
                                <td>02-02-2024</td>
                                <td>sohaib</td>
                                <td>02-02-2024</td>

                                <td>
                                    <button className="btn btn-square btn-ghost" onClick={() => showDeleteModal()}><TrashIcon className="w-5" /></button>
                                    <button className="btn btn-square btn-ghost" onClick={downloadFile}><DownloadIcon className="w-5" /></button>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>

            </TitleCard>
        </>
    )
}


export default FileStorage