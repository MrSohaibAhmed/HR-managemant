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

export async function getProjects() {
    return await makeRequest('get', 'GetAllProjects');
}

export async function addProject(employeeData) {
    return await makeRequest('post', 'addProject', employeeData);
}

export async function deleteProject(employeeId) {
    return await makeRequest('delete', `deleteProject/${employeeId}`);
}

export async function editProject(updatedData, data) {
    const editdata = {
        ...updatedData,
        projectId: data._id
    }
    //debugger
    return await makeRequest('put', `editProject`, editdata);
}
