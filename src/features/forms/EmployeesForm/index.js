import moment from "moment";
import { useEffect, useState } from "react";
import TitleCard from "../../../components/Cards/TitleCard";
import { showNotification } from "../../common/headerSlice";
import InputText from "../../../components/Input/InputText";
import TextAreaInput from "../../../components/Input/TextAreaInput";
import ToogleInput from "../../../components/Input/ToogleInput";
import { addEmployee, editEmployee } from "../../../hooks/useEmployee";
import { useNavigate, useLocation } from "react-router-dom";
import SelectBox from "../../../components/Input/SelectBox";
import { useDispatch } from "react-redux";

function EmployeesForm() {
    const navi = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { state: data } = location;
    const [formData, setFormData] = useState(() => {
        if (data) {
            return {
                employeeName: data.employeeName || "",
                employeeEmail: data.employeeEmail || "",
                designation: data.designation || "",
                joiningDate: data.joiningDate || "",
                place: data.place || "",
                about: data.about || "",
                role:data.role || " ",
                password:data.password || " ",
                status: data.status || "active",
            };
        } else {
            return {
                employeeName: "",
                employeeEmail: "",
                designation: "",
                joiningDate: "",
                place: "",
                about: "",
                role:"",
                password:"",
                status: "active",
            };
        }
    });

    const handleProfile = async () => {
        const requiredFields = ["employeeName", "employeeEmail", "designation" , "joiningDate" ,"password" ];

        // Check for empty required fields
        for (const field of requiredFields) {
            if (!formData[field].trim()) {
                const message = `Please enter ${field}`;
                dispatch(showNotification({ message, status: 0 }));
                return; // Exit if any required field is empty
            }
        }

        // Email validation with @ symbol check
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.employeeEmail.trim())) {
            dispatch(showNotification({ message: "Please enter a valid email address", status: 0 }));
            return; // Exit if email is invalid
        }

        if (data) {
            try {
                const formattedJoiningDate = moment(formData.joiningDate, "YYYY-MM-DD").format('DD-M-YYYY');
                const updatedFormData = {
                    ...formData,
                    joiningDate: formattedJoiningDate
                };
                await editEmployee(updatedFormData , data);
                dispatch(showNotification({ message: "Employee Data Updated", status: 1 }));
                navi("/app/employees")
            } catch (error) {
                dispatch(showNotification({ message: "Error in Updating Employee", status: 0 }));
                console.error("Error adding employee:", error);
                navi("/app/employees")
            }
        } else {
            try {
                const formattedJoiningDate = moment(formData.joiningDate, "YYYY-MM-DD").format('DD-M-YYYY');
                const updatedFormData = {
                    ...formData,
                    joiningDate: formattedJoiningDate
                };
                await addEmployee(updatedFormData );
                dispatch(showNotification({ message: "Employee Added", status: 1 }));
                navi("/app/employees")
            } catch (error) {
                dispatch(showNotification({ message: "Error in Adding Employee", status: 0 }));
                console.error("Error adding employee:", error);
                navi("/app/employees")
            }
    
        }}

    

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
            <TitleCard title={data ? "Edit Employee" : "Add Employee"} topMargin="mt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputText labelTitle="Name" defaultValue={formData.employeeName} updateFormValue={updateFormValue} updateType="employeeName" />
                    <InputText labelTitle="Email Id" defaultValue={formData.employeeEmail} updateFormValue={updateFormValue} updateType="employeeEmail" />
                    <InputText labelTitle="Designation" defaultValue={formData.designation} updateFormValue={updateFormValue} updateType="designation" />
                    <SelectBox labelTitle="Role" options={["HR", "User", "Admin"]} value={formData.role} updateFormValue={updateFormValue} updateType="role" />
                    <InputText labelTitle="Password" defaultValue={formData.password} updateFormValue={updateFormValue} updateType="password" />
                    {/* Use type="date" for the Joining Date input */}
                    <InputText labelTitle="Joining Date" type="date" defaultValue={formData.joiningDate} updateFormValue={updateFormValue} updateType="joiningDate" />
                    <InputText labelTitle="Place" defaultValue={formData.place} updateFormValue={updateFormValue} updateType="place" />
                    <TextAreaInput labelTitle="About" defaultValue={formData.about} updateFormValue={updateFormValue} updateType="about" />
                    <ToogleInput labelTitle="Active" defaultValue={formData.status === "active"} updateFormValue={updateFormValue} updateType="active" />
                </div>
                <div className="mt-16">
                    <button className="btn btn-primary float-right" onClick={() => handleProfile()}>{data ? "Update Employee" : "Add Employee"}</button>
                </div>
            </TitleCard>
        </>
    );
}

export default EmployeesForm;
