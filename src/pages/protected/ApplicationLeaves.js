import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import ApplicationLeavesForm from '../../features/forms/Application-LeavesForm'

function InternalPage() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title: "Application" }))
    }, [])


    return (
        <ApplicationLeavesForm />
    )
}

export default InternalPage