

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

function AssignSalaryForm() {
    const dispatch = useDispatch();

    const [salaryData, setSalaryData] = useState({
        employees: "",
        salary: "",

    });

    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const employeesData = await getEmployees();
                setEmployees(employeesData);
                console.log("EMployees data =>", employeesData);
            } catch (error) {
                console.error("Error fetching employees data:", error);
            }
        };

        fetchData();
    }, []);

    const updateFormValue = ({ updateType, value }) => {
        console.log("selected value =>>", value);
        console.log("update type =>", updateType);
        setSalaryData(prevData => ({
            ...prevData,
            [updateType]: value
        }));
    };

    const assignSalary = () => {
        console.log("clicked");
        console.log("Employees:", salaryData.employees);
        console.log("Salary:", salaryData.salary);
    }


    return (
        <>
            <TitleCard title="Assign Salary" topMargin="mt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* <SelectBox labelTitle="Employees" options={["Test", "Test2", "Test3"]} value={options} updateFormValue={updateFormValue} updateType="employees" />
                    <InputText labelTitle="Salary in Rupees" value={value} updateFormValue={updateFormValue} updateType="salary" /> */}

                    <SelectBox labelTitle="Employees" options={employees} value={salaryData.employees} updateFormValue={updateFormValue} updateType="employees" />
                    {/* Corrected value prop */}
                    <InputText labelTitle="Salary in Rupees" value={salaryData.salary} updateFormValue={updateFormValue} updateType="salary" />


                </div>
                <div className="mt-16"><button className="btn btn-primary float-right" onClick={assignSalary}>Assign </button></div>
            </TitleCard>
        </>
    );
}

export default AssignSalaryForm;
