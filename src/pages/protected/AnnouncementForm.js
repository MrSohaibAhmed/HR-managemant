import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import AnnouncementForm from '../../features/forms/Announcement-form'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Announcements"}))
      }, [])


    return(
        <AnnouncementForm />
    )
}

export default InternalPage