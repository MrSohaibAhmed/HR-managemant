import axios from "axios";
import BASE_URL from "../constants";

async function makeRequest(method, url, data = null) {
    try {
        const response = await axios({
            method,
            url: `${BASE_URL}/${url}`,
            data
        });
        return response.data;
    } catch (error) {
        console.error(`Error making ${method} request to ${url}:`, error);
        throw error;
    }
}

export async function getSalary() {
    return await makeRequest('get', 'GetSalarys');
}

export async function AssignSalary(SalaryData) {
    return await makeRequest('post', 'assign-salary', SalaryData);
}

export async function deleteSalary(SalaryId) {
    return await makeRequest('delete', `deleteSalary/${SalaryId}`);
}

export async function editSalary(updatedData, data) {
    const editdata = {
        ...updatedData,
        SalaryId: data._id
    }
    debugger
    return await makeRequest('put', `EditSalarys`, editdata);
}

export async function getAllEmployeeSalary() {
    return await makeRequest('get', 'getallemployeessalaries');
}

export async function getAllEmployeeCalculatedSalary() {
    return await makeRequest('get', 'process-salaries');
}
export async function paysalary(SalaryData) {
    return await makeRequest('post', 'paysalary', SalaryData);
}