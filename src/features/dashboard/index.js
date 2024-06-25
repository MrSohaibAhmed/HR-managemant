import DashboardStats from './components/DashboardStats'
import AmountStats from './components/AmountStats'
import PageStats from './components/PageStats'
import { useEffect, useState } from 'react'
import UserGroupIcon from '@heroicons/react/24/outline/UserGroupIcon'
import UsersIcon from '@heroicons/react/24/outline/UsersIcon'
import CircleStackIcon from '@heroicons/react/24/outline/CircleStackIcon'
import CreditCardIcon from '@heroicons/react/24/outline/CreditCardIcon'
import UserChannels from './components/UserChannels'
import LineChart from './components/LineChart'
import BarChart from './components/BarChart'
import DashboardTopBar from './components/DashboardTopBar'
import { useDispatch } from 'react-redux'
import { showNotification } from '../common/headerSlice'
import DoughnutChart from './components/DoughnutChart'
import { getDashboardData } from '../../hooks/useAuth'

const statsData = [
    { title: "Total Employess", value: "20", icon: <UserGroupIcon className='w-8 h-8' />, description: "" },
    { title: "Total Projects", value: "30", icon: <CreditCardIcon className='w-8 h-8' />, description: "" },
    { title: "In Progrss Projects", value: "20", icon: <CircleStackIcon className='w-8 h-8' />, description: "" },
    { title: "Total Leave", value: "5", icon: <UsersIcon className='w-8 h-8' />, description: "" },
]



function Dashboard() {
    const [dashboardData, setDashboardData] = useState([])
    const [newRange, setNewRange] = useState(null);


    // Effect to calculate and set the newRange state
    // useEffect(() => {
    //     const calculateDateRange = () => {
    //         const today = new Date();
    //         const startDate = new Date();
    //         startDate.setMonth(today.getMonth() - 1); // One month ago from today

    //         // Format dates as yyyy-MM-dd
    //         const formattedStartDate = formatDate(startDate);
    //         const formattedEndDate = formatDate(today);

    //         // Set the newRange object
    //         setNewRange({
    //             start: formattedStartDate,
    //             end: formattedEndDate
    //         });
    //     };

    //     calculateDateRange();
    // }, []); // Empty dependency array means this effect runs once on component mount

    // Helper function to format date as yyyy-MM-dd
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };


    const dispatch = useDispatch()


    const updateDashboardPeriod = (newRange) => {
        console.log(newRange)
        // Dashboard range changed, write code to refresh your values
        dispatch(showNotification({ message: `Period updated to ${newRange.startDate} to ${newRange.endDate}`, status: 1 }))
    }

    useEffect(() => {

        // Effect to calculate and set the newRange state


        const today = new Date();
        const startDate = new Date();
        startDate.setMonth(today.getMonth() - 1); // One month ago from today

        // Format dates as yyyy-MM-dd
        const formattedStartDate = formatDate(startDate);
        const formattedEndDate = formatDate(today);

        // Set the newRange object
        setNewRange({
            start: formattedStartDate,
            end: formattedEndDate
        });



        // Empty dependency array means this effect runs once on component mount

        // Helper function to format date as yyyy-MM-dd

        const fetchData = async () => {
            debugger
            const res = await getDashboardData(newRange.start, newRange.end);
            setDashboardData(res)
            debugger
            console.log(res);
        }
        fetchData();
    }, [])

    return (
        <>
            {/** ---------------------- Select Period Content ------------------------- */}
            <DashboardTopBar updateDashboardPeriod={updateDashboardPeriod} />

            {/** ---------------------- Different stats content 1 ------------------------- */}
            <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
                <DashboardStats {...statsData[0]} colorIndex={0} data={dashboardData.totalEmployees} />
                <DashboardStats {...statsData[1]} colorIndex={1} data={dashboardData.totalNumberOfProjects} />
                <DashboardStats {...statsData[2]} colorIndex={2} data={dashboardData.inProgressProjectsCount} />
                <DashboardStats {...statsData[3]} colorIndex={3} data={dashboardData.leaveCountBetweenDates} />
            </div>




            {/** ---------------------- Different charts ------------------------- */}
            <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
                <LineChart />
                <BarChart />
            </div>

            {/** ---------------------- Different stats content 2 ------------------------- */}

            <div className="grid lg:grid-cols-2 mt-10 grid-cols-1 gap-6">
                <AmountStats />
                <PageStats />
            </div>

            {/** ---------------------- User source channels table  ------------------------- */}

            <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
                {/**  <UserChannels /> */}
                {/**   <DoughnutChart />*/}
            </div>

        </>
    )
}

export default Dashboard