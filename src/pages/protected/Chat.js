import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Chats from '../../features/Chat'
function InternalPage() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title: "Chat" }))
    }, [])

    return (
        <Chats />
    )
}

export default InternalPage