import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { showNotification } from "../common/headerSlice"
import TitleCard from "../../components/Cards/TitleCard"
import { RECENT_TRANSACTIONS } from "../../utils/dummyData"
import FunnelIcon from '@heroicons/react/24/outline/FunnelIcon'
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import SearchBar from "../../components/Input/SearchBar"
import { useNavigate } from "react-router-dom"
import NewApplication from "../../components/LeavesTable/NewApplication"
import UpcommingApp from "../../components/LeavesTable/UpcommingApp"
import CurrentApp from "../../components/LeavesTable/CurrentApp"

const TopSideButtons = ({ removeFilter, applyFilter, applySearch }) => {

    const [filterParam, setFilterParam] = useState("")
    const [searchText, setSearchText] = useState("")


    const navigate = useNavigate();
    const showFiltersAndApply = (params) => {
        applyFilter(params)
        setFilterParam(params)
    }

    const removeAppliedFilter = () => {
        removeFilter()
        setFilterParam("")
        setSearchText("")
    }
    const clickHanlder = () => {
        navigate('/app/add-employees')
    }

    useEffect(() => {
        if (searchText == "") {
            removeAppliedFilter()
        } else {
            applySearch(searchText)
        }
    }, [searchText])

    return (
        <div className="inline-block float-right">
            <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => clickHanlder()}>Add New</button>
            {/* <SearchBar searchText={searchText} styleClass="mr-4" setSearchText={setSearchText}/> */}
            {/* {filterParam != "" && <button onClick={() => removeAppliedFilter()} className="btn btn-xs mr-2 btn-active btn-ghost normal-case">{filterParam}<XMarkIcon className="w-4 ml-2"/></button>} */}
            {/* <div className="dropdown dropdown-bottom dropdown-end">
                <label tabIndex={0} className="btn btn-sm btn-outline"><FunnelIcon className="w-5 mr-2"/>Filter</label>
                <ul tabIndex={0} className="dropdown-content menu p-2 text-sm shadow bg-base-100 rounded-box w-52">
                    {
                        locationFilters.map((l, k) => {
                            return  <li key={k}><a onClick={() => showFiltersAndApply(l)}>{l}</a></li>
                        })
                    }
                    <div className="divider mt-0 mb-0"></div>
                    <li><a onClick={() => removeAppliedFilter()}>Remove Filter</a></li>
                </ul>
            </div> */}
        </div>
    )
}


function Tabs() {
    const [activeTab, setActiveTab] = useState('new');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div>
            <div className="border-b border-gray-200 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                    <li className="me-2">
                        <a
                            href="#"
                            className={`inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group ${activeTab === 'new' ? 'text-blue-600 border-blue-600' : ''}`}
                            onClick={() => handleTabClick('new')}
                        >
                            New Applications
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className={`inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group ${activeTab === 'upcoming' ? 'text-blue-600 border-blue-600' : ''}`}
                            onClick={() => handleTabClick('upcoming')}
                        >
                            Upcoming
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className={`inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group ${activeTab === 'current' ? 'text-blue-600 border-blue-600' : ''}`}
                            onClick={() => handleTabClick('current')}
                        >
                            Current
                        </a>
                    </li>
                </ul>
            </div>

            <div id="tabContent">
                <div className={`tab-content ${activeTab === 'new' ? '' : 'hidden'}`}>
                   
                    <NewApplication/>
                    
                </div>
                <div className={`tab-content ${activeTab === 'upcoming' ? '' : 'hidden'}`}>
                 
                    <UpcommingApp/>
                </div>
                <div className={`tab-content ${activeTab === 'current' ? '' : 'hidden'}`}>
                    
                    <CurrentApp/>
                </div>
            </div>
        </div>
    );
}



function NewLeaves() {


    const [trans, setTrans] = useState(RECENT_TRANSACTIONS);
    const [todayDate, setTodayDate] = useState();

    const removeFilter = () => {
        setTrans(RECENT_TRANSACTIONS)
    }

    const applyFilter = (params) => {
        let filteredTransactions = RECENT_TRANSACTIONS.filter((t) => { return t.location == params })
        setTrans(filteredTransactions)
    }

    // Search according to name
    const applySearch = (value) => {
        let filteredTransactions = RECENT_TRANSACTIONS.filter((t) => { return t.email.toLowerCase().includes(value.toLowerCase()) || t.email.toLowerCase().includes(value.toLowerCase()) })
        setTrans(filteredTransactions)
    }

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

            <TitleCard title="New Leaves" topMargin="mt-2" TopSideButtons={<TopSideButtons applySearch={applySearch} applyFilter={applyFilter} removeFilter={removeFilter} />}>

                <Tabs />
        
            </TitleCard>
        </>
    )
}


export default NewLeaves