import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import NewLeaves from '../../features/newLeaves'

function InternalPage() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title: "New Leaves" }))
    }, [])


    return (
        <NewLeaves />
    )
}

export default InternalPage