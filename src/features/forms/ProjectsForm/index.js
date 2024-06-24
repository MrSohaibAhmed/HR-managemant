import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import TitleCard from "../../../components/Cards/TitleCard";
import { showNotification } from '../../common/headerSlice';
import InputText from '../../../components/Input/InputText';
import MultiSelect from "../../../components/Input/SelectedItem";
import SelectBox from "../../../components/Input/SelectBox";
import { getEmployees } from "../../../hooks/useEmployee";
import { addProject, editProject } from "../../../hooks/useProjects";
import { useNavigate, useLocation } from "react-router-dom";

function ProjectsForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { state: data } = location;


    const [projectData, setProjectData] = useState(() => {
        if (data) {
            return {
                projectName: data.projectName || "",
                teamLead: data.teamLead || "",
                startingDate: moment(data.startingDate).toDate(),
                deadline: moment(data.deadline).toDate(),
                status: data.status || "",
                teamMembers: data.teamMembers || []
            }
        } else {
            return {
                projectName: "",
                teamLead: "",
                startingDate: moment("").toDate(),
                deadline: moment("").toDate(),
                status: "",
                teamMembers: []
            }
        }

    });

    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const employeesData = await getEmployees();
                setEmployees(employeesData);
            } catch (error) {
                console.error("Error fetching employees data:", error);
            }
        };

        fetchData();
    }, []);

    const updateFormValue = ({ updateType, value }) => {
        console.log("selected team members =>>", value);
        setProjectData(prevData => ({
            ...prevData,
            [updateType]: value
        }));
    };

    const saveProject = async () => {
        // Make sure to convert startingDate and deadline to string format
        const requiredFields = ["projectName", "teamLead", "startingDate", "deadline", "status", "teamMembers"];

        // for (const field of requiredFields) {
        //     if (!projectData[field].trim()) {
        //         const message = `Please enter ${field}`;
        //         dispatch(showNotification({ message, status: 0 }));
        //         return; // Exit if any required field is empty
        //     }
        // }

        for (const field of requiredFields) {
            const fieldValue = projectData[field];

            if (typeof fieldValue === "string" && !fieldValue.trim()) {
                const message = `Please enter ${field}`;
                dispatch(showNotification({ message, status: 0 }));
                return;
            } else if ((field === "startingDate" || field === "deadline") && (!fieldValue || !moment(fieldValue).isValid())) {
                const message = `Please select a valid ${field}`;
                dispatch(showNotification({ message, status: 0 }));
                return;
            } else if (field === "teamMembers" && fieldValue.length === 0) {
                const message = `Please select at least one team member`;
                dispatch(showNotification({ message, status: 0 }));
                return;
            }
        }
        const formattedProjectData = {
            ...projectData,
            startingDate: moment(projectData.startingDate).format("YYYY-MM-DD"),
            deadline: moment(projectData.deadline).format("YYYY-MM-DD")
        };
        if (data) {
            try {
                const formattedProjectData = {
                    ...projectData,
                    startingDate: moment(projectData.startingDate).format("YYYY-MM-DD"),
                    deadline: moment(projectData.deadline).format("YYYY-MM-DD")
                };
                await editProject(formattedProjectData, data);
                dispatch(showNotification({ message: "Project Data Updated", status: 1 }));
                navigate('/app/leads');
            } catch (error) {
                console.error("Error updating project:", error);
                dispatch(showNotification({ message: "Error on Updating Project", status: 0 }));
                navigate('/app/leads');
            }
        } else {

            try {

                const ids = employees.filter((item) => formattedProjectData.teamMembers.includes(item.employeeName));
                const userIds = ids.map((employee) => employee.userId);
                formattedProjectData.teamMembers = userIds;
                await addProject(formattedProjectData);
                dispatch(showNotification({ message: "New Project Added", status: 1 }));
                navigate('/app/leads');
            } catch (error) {
                console.error("Error adding project:", error);
                dispatch(showNotification({ message: "Error on Adding Project", status: 0 }));
                navigate('/app/leads');
            }
        }
    };

    return (
        <>
            <TitleCard title="Add Projects" topMargin="mt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputText labelTitle="Project Name" defaultValue={projectData.projectName} updateFormValue={updateFormValue} updateType="projectName" />
                    <InputText labelTitle="Team Lead" defaultValue={projectData.teamLead} updateFormValue={updateFormValue} updateType="teamLead" />
                    <InputText labelTitle="Starting Date" type="date" defaultValue={moment(projectData.startingDate).format("YYYY-MM-DD")} updateFormValue={updateFormValue} updateType="startingDate" />
                    <InputText labelTitle="Deadlines" type="date" defaultValue={moment(projectData.deadline).format("YYYY-MM-DD")} updateFormValue={updateFormValue} updateType="deadline" />
                    <SelectBox labelTitle="Status" options={["In Progress", "Pending", "Complete"]} defaultValue={projectData.status} updateFormValue={updateFormValue} updateType="status" />
                    {/* <MultiSelect labelTitle="Team Members" options={employees.map(employee => ({ value: employee._id, label: employee.employeeName }))} value={projectData.teamMembers} updateFormValue={updateFormValue} updateType="teamMembers" /> */}
                    <MultiSelect
                        labelTitle="Team Members"
                        options={employees.map(employee => ({ value: employee.employeeName, label: employee.employeeName }))}
                        value={employees.filter(employee => projectData.teamMembers.includes(employee.employeeName)).map(employee => ({ value: employee.employeeName, label: employee.employeeName }))}
                        updateFormValue={value => updateFormValue({ updateType: "teamMembers", value })}
                    />

                </div>
                <div className="mt-16"><button className="btn btn-primary float-right" onClick={saveProject}>Save</button></div>
            </TitleCard>
        </>
    );
}

export default ProjectsForm;
