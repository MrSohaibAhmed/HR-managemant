import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import AssignSalary from '../../features/assign-salary'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Assign Salary"}))
      }, [])


    return(
        <AssignSalary />
    )
}

export default InternalPage