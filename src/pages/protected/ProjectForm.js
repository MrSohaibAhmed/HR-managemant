import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import ProjectsForm from '../../features/forms/ProjectsForm'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Add Projects"}))
      }, [])


    return(
        <ProjectsForm />
    )
}

export default InternalPage