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

export async function getannouncements() {
    return await makeRequest('get', 'GetAnnouncements');
}

export async function addannouncements(announcementsData) {
    return await makeRequest('post', 'MakeAnnouncement', announcementsData);
}

export async function deleteannouncements(announcementsId) {
    return await makeRequest('delete', `announcement/${announcementsId}`);
}

export async function editannouncements(updatedData, data) {
    const editdata = {
        ...updatedData,
        announcementsId: data._id
    }
    //debugger
    return await makeRequest('put', `Editannouncementss`, editdata);
}
