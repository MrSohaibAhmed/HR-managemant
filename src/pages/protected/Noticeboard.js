import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Noticeboard from '../../features/noticeboard/Noticeboard'

function InternalPage() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title: "Noticeboard" }))
    }, [])


    return (
        <Noticeboard />
    )
}

export default InternalPage