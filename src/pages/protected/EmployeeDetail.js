import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import EmployeeDetail from '../../features/employeeDetail'
function InternalPage(){

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Employees"}))
      }, [])
      
    return(
        <EmployeeDetail />
    )
}

export default InternalPage