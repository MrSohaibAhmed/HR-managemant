import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import AssignSalaryForm from '../../features/forms/AssignSalaryForm'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Add Projects"}))
      }, [])


    return(
        <AssignSalaryForm />
    )
}

export default InternalPage