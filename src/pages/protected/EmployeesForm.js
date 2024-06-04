import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import EmployeesForm from '../../features/forms/EmployeesForm'



function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Add Employees"}))
      }, [])


    return(
        <EmployeesForm />
    )
}

export default InternalPage