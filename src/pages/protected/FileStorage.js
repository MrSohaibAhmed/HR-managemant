import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import FileStorage from '../../features/fileStorage'
function InternalPage(){

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Files"}))
      }, [])
      
    return(
        <FileStorage />
    )
}

export default InternalPage