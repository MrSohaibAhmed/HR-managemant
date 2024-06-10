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

export async function getApplication() {
    return await makeRequest('get', 'GetApplications');
}

export async function addApplication(ApplicationData) {
    return await makeRequest('post', 'apply-leave', ApplicationData);
}

export async function deleteApplication(ApplicationId) {
    return await makeRequest('delete', `deleteApplication/${ApplicationId}`);
}

export async function editApplication(updatedData, data) {
    const editdata = {
        ...updatedData,
        ApplicationId: data._id
    }
    debugger
    return await makeRequest('put', `EditApplications`, editdata);
}
