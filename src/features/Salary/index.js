


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
import ToogleInput from "../../components/Input/ToogleInput"
import { useNavigate } from "react-router-dom"
import { getApplicationByUserID } from "../../hooks/useLeaves"
import { mySalary } from "../../hooks/useSalary"
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

function MySalary() {
    const navigate = useNavigate()
    const [Salary, setSalary] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [selectedLeadIndex, setSelectedLeadIndex] = useState(null);
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchData = async () => {
            const response = await mySalary(localStorage.getItem("userId"))
            setSalary(response)
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

    const editData = (data) => {
        navigate('/app/add-employees', { state: data });
    }

    const showEmployeeDetail = () => {
        navigate('/app/employee-detail')
    }


    return (
        <>
            <TitleCard title="My Salary" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>

                <div className="overflow-x-auto w-full">
                    <div className="mb-4 font-bold text-2xl">
                        <h3>Salary : {Salary?.salaryRecord?.salary}</h3>
                    </div>
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Salary</th>
                                <th>Date</th>
                                <th>Status</th>

                            </tr>
                        </thead>
                        <tbody>
                            {/* {
                                Salary.map((item) => <tr>
                                    <td>{item?.subject}</td>
                                    <td className="flex">{item?.date}</td>
                                    <td>
                               
                                        <span className="bg-green-600 p-1"> {item?.status}</span>
                                    </td>
                                </tr>)
                            } */}



                        </tbody>
                    </table>
                </div>
            </TitleCard>
        </>
    )
}


export default MySalary