import Api from "./Api";
import axios from "axios";

export {
    createCardTask,
    getCardTaskByName,
    updateCardTask,
    deleteCardTask,
    cardTaskList,
};

const headersApplicationJson = {
};
function createCardTask(params) {
    return axios.post(Api.CREATE_CARD_TASK, params, {
        headers: headersApplicationJson,
    });
}

function getCardTaskByName(params) {
    console.log("params", params);
    return axios.get(`${Api.GET_CARD_TASK_BY_TASKNAME}${params.card}/${params.cardTaskName}`, {
        headers: headersApplicationJson,
    });
}

function updateCardTask(params) {
    return axios.post(Api.UPDATE_CARD_TASK, params, {
        headers: headersApplicationJson,
    });
}

function deleteCardTask(params) {
    return axios.delete(Api.DELETE_CARD_TASK, {
        headers: headersApplicationJson,
        data: params
    });
}

function cardTaskList(params) {
    return axios.get(
        Api.GET_CARD_TASK_LIST + params.list, {
        headers: headersApplicationJson,
    });
}

