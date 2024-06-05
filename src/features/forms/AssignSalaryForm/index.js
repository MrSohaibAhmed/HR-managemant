// import moment from "moment";
// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import TitleCard from "../../../components/Cards/TitleCard";
// import { showNotification } from '../../common/headerSlice';
// import InputText from '../../../components/Input/InputText';
// import SelectBox from "../../../components/Input/SelectBox";
// import { getEmployees } from "../../../hooks/useEmployee";
// import { useNavigate } from "react-router-dom";

// function AssignSalaryForm() {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const [projectData, setProjectData] = useState({
//         Employees: "",
//         Salary: "",
        
//     });

//     const [employees, setEmployees] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const employeesData = await getEmployees();
//                 setEmployees(employeesData);
//             } catch (error) {
//                 console.error("Error fetching employees data:", error);
//             }
//         };

//         fetchData();
//     }, []);

//     const updateFormValue = ({ updateType, value }) => {
//         console.log("selected team members =>>" , value);
//         setProjectData(prevData => ({
//             ...prevData,
//             [updateType]: value
//         }));
//     };

//     const saveProject = async () => {
//         console.log("Clicked on save button");
//         // try {
//         //     await addProject(formattedProjectData);
//         //     dispatch(showNotification({ message: "New Project Added", status: 1 }));
//         //     navigate('/app/leads');
//         // } catch (error) {
//         //     console.error("Error adding project:", error);
//         //     dispatch(showNotification({ message: "Error on Adding Project", status: 0 }));

//         //     navigate('/app/leads');

//         //     // Handle error here, show error message or dispatch an action
//         // }
//     };

//     return (
//         <>
//             <TitleCard title="Add Projects" topMargin="mt-2">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   
//                     <SelectBox labelTitle="Employees" options={employees.name} value={projectData.status} updateFormValue={updateFormValue} updateType="status" />
//                     <InputText labelTitle="Salary" value={projectData.Salary} updateFormValue={updateFormValue} updateType="Salary" />
                   
                    
               
//                 </div>
//                 <div className="mt-16"><button className="btn btn-primary float-right" onClick={saveProject}>Save</button></div>
//             </TitleCard>
//         </>
//     );
// }

// export default AssignSalaryForm;




