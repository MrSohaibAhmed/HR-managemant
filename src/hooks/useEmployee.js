import axios from "axios";
import BASE_URL from "../constants"

export async function getEmployees() {
    // debugger
    try {
        const response = await axios.get(`${BASE_URL}/Getemployees`);
        debugger
        return response.data;
    } catch (error) {
        debugger
        console.error("Error fetching employees:", error);
        throw error;
    }
}

export async function addEmployee(employeeData) {
    try {
        const response = await axios.post(`${BASE_URL}/Addemployees`, employeeData);
        return response.data;
    } catch (error) {
        console.error("Error adding employee:", error);
        throw error;
    }
}


