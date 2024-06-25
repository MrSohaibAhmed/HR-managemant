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

export async function getEmployees() {
    return await makeRequest('get', 'Getemployees');
}

export async function login(data) {
    return await makeRequest('post', 'logIn', data);
}

export async function deleteEmployee(employeeId) {
    return await makeRequest('delete', `deleteEmployee/${employeeId}`);
}

export async function editEmployee(updatedData, data) {
    const editdata = {
        ...updatedData,
        employeeId: data._id
    }
    debugger
    return await makeRequest('put', `Editemployees`, editdata);
}

export async function getDashboardData(start, end) {
    return await makeRequest('get', `getDashboardData?fromDate=${start}&toDate=${end}`);
    // return await makeRequest('get', 'getdashboarddata');
}