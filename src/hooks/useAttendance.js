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

export async function getAttendance() {
    return await makeRequest('get', 'GetAttendances');
}

export async function addAttendance(AttendanceData) {
    return await makeRequest('post', 'markAttendance', AttendanceData);
}

export async function deleteAttendance(AttendanceId) {
    return await makeRequest('delete', `deleteAttendance/${AttendanceId}`);
}

export async function editAttendance(updatedData, data) {
    const editdata = {
        ...updatedData,
        AttendanceId: data._id
    }
    debugger
    return await makeRequest('put', `EditAttendances`, editdata);
}
