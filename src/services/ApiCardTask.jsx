import Api, { awsAxios } from "./Api";

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
    return awsAxios.post(Api.CREATE_CARD_TASK, params, {
        headers: headersApplicationJson,
    });
}

function getCardTaskByName(params) {
    console.log("params", params);
    return awsAxios.get(`${Api.GET_CARD_TASK_BY_TASKNAME}taskCard/${params.cardTaskName}`, {
        headers: headersApplicationJson,
    });
}

function updateCardTask(params) {
    return awsAxios.post(Api.UPDATE_CARD_TASK, params, {
        headers: headersApplicationJson,
    });
}

function deleteCardTask(params) {
    return awsAxios.delete(Api.DELETE_CARD_TASK, {
        headers: headersApplicationJson,
        data: params
    });
}

function cardTaskList(params) {
    return awsAxios.get(
        Api.GET_CARD_TASK_LIST, {
        headers: headersApplicationJson,
    });
}

