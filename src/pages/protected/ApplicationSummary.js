import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import ApplicationSummary from '../../features/application-sumamry'

function InternalPage() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title: "Application" }))
    }, [])


    return (
        <ApplicationSummary />
    )
}

export default InternalPage