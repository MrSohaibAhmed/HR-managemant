import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import LeavesSummary from '../../features/leavesSummary'

function InternalPage() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title: "Leaves" }))
    }, [])


    return (
        <LeavesSummary />
    )
}

export default InternalPage