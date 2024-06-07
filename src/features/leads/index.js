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
import { useNavigate } from "react-router-dom"
import { getProjects } from "../../hooks/useProjects"

const TopSideButtons = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate();

    // const openAddNewLeadModal = () => {
    //     dispatch(openModal({ title: "Add New Lead", bodyType: MODAL_BODY_TYPES.LEAD_ADD_NEW }))
    // }

    const clickHandler = () => {
        navigate('/app/add-projects')
    }

    return (
        <div className="inline-block float-right">
            {/* <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => openAddNewLeadModal()}>Add New</button> */}
            <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => clickHandler()}>Add New</button>
        </div>
    )
}

function Leads() {
    const navigate = useNavigate()

    const [projects, setProjects] = useState([]);
    const { leads } = useSelector(state => state.lead)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getLeadsContent())
    }, [])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const projectsData = await getProjects();
                setProjects(projectsData);
            } catch (error) {

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
        // dispatch(openModal({
        //     title: "Confirmation", bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        //     extraObject: { message: `Are you sure you want to delete this lead?`, type: CONFIRMATION_MODAL_CLOSE_TYPES.LEAD_DELETE, index }
        // }))
    }

    const editData = (data) => {
        navigate('/app/add-projects', { state: data });
    }

    return (
        <>
            <TitleCard title="Projects" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>
                {/* Leads List in table format loaded from slice after api call */}
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Project Name</th>
                                <th>Team Lead</th>
                                <th>Starting Date</th>
                                <th>Deadline</th>
                                <th>Status</th>
                                <th>Team Members</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                projects.map((l, k) => {
                                    return (
                                        <tr key={k}>
                                            <td>
                                                <div className="flex items-center space-x-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle w-12 h-12">
                                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHiWo4m0Bx_2QqLQqT2mPFNPojTHLQxb8jNA&s" alt="pic" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold">{l.projectName}</div>
                                                        {/* <div className="text-sm opacity-50">{l.last_name}</div> */}
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{l?.teamLead}</td>
                                            <td>{l?.startingDate}</td>
                                            <td>{l?.deadline}</td>
                                            <td>{l?.status}</td>
                                            <td>{l?.teamMembers}</td>
                                            <td>
                                                <button className="btn btn-square btn-ghost" onClick={() => deleteCurrentLead(k)}><TrashIcon className="w-5" /></button>
                                                <button className="btn btn-square btn-ghost" onClick={() => editData(l)}><EditIcon className="w-5" /></button>
                                                <button className="btn btn-square btn-ghost" onClick={() => deleteCurrentLead(k)}><ViewIcon className="w-5" /></button>

                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </TitleCard>
        </>
    )
}


export default Leads