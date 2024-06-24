import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import AttendanceSummary from '../../features/attendance/attendanceSummary'

function InternalPage() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title: "Attendance" }))
    }, [])

    return (
        <AttendanceSummary />
    )
}

export default InternalPage