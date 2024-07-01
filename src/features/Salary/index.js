


import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import TitleCard from "../../components/Cards/TitleCard"
import { openModal } from "../common/modalSlice"
import { useNavigate } from "react-router-dom"
import { mySalary, mySalaryDetails } from "../../hooks/useSalary"
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
    const [SalaryDetails, setSalaryDetails] = useState([]);
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
    useEffect(() => {
        const fetchData = async () => {
            const response = await mySalaryDetails(localStorage.getItem("userId"))
            setSalaryDetails(response)
        };
        fetchData();
    }, [])


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
            <TitleCard title="My Salary" topMargin="mt-2" >

                <div className="overflow-x-auto w-full">
                    <div className="mb-4 font-bold text-2xl">
                        <h3>Salary :<span className=" font-medium"> {Salary?.salaryRecord?.salary}</span></h3>
                    </div>
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Month</th>
                                <th>Salary</th>
                                <th>Deduction</th>
                                <th>Absents</th>
                                <th>Status</th>


                            </tr>
                        </thead>
                        <tbody>
                            {
                                SalaryDetails.map((item) => <tr>
                                    <td>{item?.month}-{item?.year}</td>
                                    <td>{item?.salary}</td>
                                    <td>

                                        {item?.totalDeduction}
                                    </td>
                                    <td >{item?.absentCount}</td>
                                    <td>
                                        <span className={`inline-block py-2 px-4 rounded-full text-sm font-semibold ${item?.salleryStatus?.status === 'paid' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                                            {item?.salleryStatus?.status === 'paid' ? 'Paid' : 'Unpaid'}
                                        </span>
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


export default MySalary