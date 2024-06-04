import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import TitleCard from "../../../components/Cards/TitleCard"
import { showNotification } from '../../common/headerSlice'
import InputText from '../../../components/Input/InputText'
import TextAreaInput from '../../../components/Input/TextAreaInput'
import ToogleInput from '../../../components/Input/ToogleInput'

function ProjectsForm(){

    const dispatch = useDispatch()

    // Call API to update profile settings changes
    const updateProfile = () => {
        dispatch(showNotification({message : "Profile Updated", status : 1}))    
    }

    const updateFormValue = ({updateType, value}) => {
        console.log(updateType)
    }

    return(
        <>
            
            <TitleCard title="Add Projects" topMargin="mt-2">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputText labelTitle="Project Name" defaultValue="HR Management System" updateFormValue={updateFormValue}/>
                    <InputText labelTitle="Team Lead" defaultValue="Sohaib" updateFormValue={updateFormValue}/>
                    <InputText labelTitle="Starting Date" defaultValue="03-05-2024" updateFormValue={updateFormValue}/>
                    <InputText labelTitle="Deadlines" defaultValue="03-05-2025" updateFormValue={updateFormValue}/>
                    <InputText labelTitle="Status" defaultValue="Active" updateFormValue={updateFormValue}/>
                    <InputText labelTitle="Team Members" defaultValue="5" updateFormValue={updateFormValue}/>
                    

                    {/* <InputText labelTitle="Members" defaultValue="5" updateFormValue={updateFormValue}/> */}
                </div>
                {/* <div className="divider" ></div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputText labelTitle="Language" defaultValue="English" updateFormValue={updateFormValue}/>
                    <InputText labelTitle="Timezone" defaultValue="IST" updateFormValue={updateFormValue}/>
                    <ToogleInput updateType="syncData" labelTitle="Sync Data" defaultValue={true} updateFormValue={updateFormValue}/>
                </div> */}

                <div className="mt-16"><button className="btn btn-primary float-right" onClick={() => updateProfile()}>Save</button></div>
            </TitleCard>
        </>
    )
}


export default ProjectsForm