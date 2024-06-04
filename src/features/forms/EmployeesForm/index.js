import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import TitleCard from "../../../components/Cards/TitleCard"
import { showNotification } from '../../common/headerSlice'
import InputText from '../../../components/Input/InputText'
import TextAreaInput from '../../../components/Input/TextAreaInput'
import ToogleInput from '../../../components/Input/ToogleInput'
import { addEmployee } from "../../../hooks/useEmployee"
import { useNavigate } from "react-router-dom"
function EmployeesForm() {
    const navi = useNavigate();
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        employeeName: "",
        employeeEmail: "",
        designation: "",
        joiningDate: "",
        place: "",
        about: "",
        status: "active"
    });

    const updateProfile = async () => {
        console.log(formData);
        try {
            const formattedJoiningDate = moment(formData.joiningDate).format('DD-M-YYYY');
            const updatedFormData = {
                ...formData,
                joiningDate: formattedJoiningDate
            };

            await addEmployee(updatedFormData);
            dispatch(showNotification({ message: "Employee Added", status: 1 }));
            navi("/app/employees")
        } catch (error) {
            dispatch(showNotification({ message: "Error in Adding Employee", status: 0 }));
            console.error("Error adding employee:", error);
            navi("/app/employees")
        }
    };

    const updateFormValue = ({ updateType, value }) => {
        if (updateType === "active") {
            setFormData(prevState => ({
                ...prevState,
                status: value ? "active" : "inactive"
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [updateType]: value
            }));
        }
    };

    return (
        <>
            <TitleCard title="Add Employees" topMargin="mt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputText labelTitle="Name" defaultValue={formData.employeeName} updateFormValue={updateFormValue} updateType="employeeName" />
                    <InputText labelTitle="Email Id" defaultValue={formData.employeeEmail} updateFormValue={updateFormValue} updateType="employeeEmail" />
                    <InputText labelTitle="Designation" defaultValue={formData.designation} updateFormValue={updateFormValue} updateType="designation" />
                    {/* Use type="date" for the Joining Date input */}
                    <InputText labelTitle="Joining Date" type="date" defaultValue={formData.joiningDate} updateFormValue={updateFormValue} updateType="joiningDate" />
                    <InputText labelTitle="Place" defaultValue={formData.place} updateFormValue={updateFormValue} updateType="place" />
                    <TextAreaInput labelTitle="About" defaultValue={formData.about} updateFormValue={updateFormValue} updateType="about" />
                    <ToogleInput labelTitle="Active" defaultValue={true} updateFormValue={updateFormValue} updateType="active" />
                </div>
                <div className="mt-16">
                    <button className="btn btn-primary float-right" onClick={() => updateProfile()}>Add</button>
                </div>
            </TitleCard>
        </>
    )
}

export default EmployeesForm;
