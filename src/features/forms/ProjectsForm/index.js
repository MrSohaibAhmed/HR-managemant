import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import TitleCard from "../../../components/Cards/TitleCard";
import { showNotification } from '../../common/headerSlice';
import InputText from '../../../components/Input/InputText';
import MultiSelect from "../../../components/Input/SelectedItem";
import SelectBox from "../../../components/Input/SelectBox";
import { getEmployees } from "../../../hooks/useEmployee";
import { addProject } from "../../../hooks/useProjects";
import { useNavigate } from "react-router-dom";

function ProjectsForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [projectData, setProjectData] = useState({
        projectName: "",
        teamLead: "",
        startingDate: moment("03-05-2024", "DD-MM-YYYY").toDate(),
        deadline: moment("03-05-2025", "DD-MM-YYYY").toDate(),
        status: "",
        teamMembers: []
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
        setProjectData(prevData => ({
            ...prevData,
            [updateType]: value
        }));
    };

    const saveProject = async () => {
        // Make sure to convert startingDate and deadline to string format
        const formattedProjectData = {
            ...projectData,
            startingDate: moment(projectData.startingDate).format("YYYY-MM-DD"),
            deadline: moment(projectData.deadline).format("YYYY-MM-DD")
        };

        try {
            await addProject(formattedProjectData);
            dispatch(showNotification({ message: "New Project Added", status: 1 }));
            navigate('/app/leads');
        } catch (error) {
            console.error("Error adding project:", error);
            dispatch(showNotification({ message: "Error on Adding Project", status: 0 }));

            navigate('/app/leads');

            // Handle error here, show error message or dispatch an action
        }
    };

    return (
        <>
            <TitleCard title="Add Projects" topMargin="mt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputText labelTitle="Project Name" value={projectData.projectName} updateFormValue={updateFormValue} updateType="projectName" />
                    <InputText labelTitle="Team Lead" value={projectData.teamLead} updateFormValue={updateFormValue} updateType="teamLead" />
                    <InputText labelTitle="Starting Date" type="date" value={moment(projectData.startingDate).format("YYYY-MM-DD")} updateFormValue={updateFormValue} updateType="startingDate" />
                    <InputText labelTitle="Deadlines" type="date" value={moment(projectData.deadline).format("YYYY-MM-DD")} updateFormValue={updateFormValue} updateType="deadline" />
                    <SelectBox labelTitle="Status" options={["In Progress", "Pending", "Complete"]} value={projectData.status} updateFormValue={updateFormValue} updateType="status" />
                    <MultiSelect labelTitle="Team Members" options={employees.map(employee => ({ value: employee._id, label: employee.employeeName }))} value={projectData.teamMembers} updateFormValue={updateFormValue} updateType="teamMembers" />
                </div>
                <div className="mt-16"><button className="btn btn-primary float-right" onClick={saveProject}>Save</button></div>
            </TitleCard>
        </>
    );
}

export default ProjectsForm;
