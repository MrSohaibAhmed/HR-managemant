import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import MySalary from '../../features/Salary'

function InternalPage() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title: "Salary" }))
    }, [])

    return (
        <MySalary />
    )
}

export default InternalPage