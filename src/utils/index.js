export const checkPermission = (module) => {
    let pers = localStorage.getItem('userDetail');
    let persJson = JSON.parse(pers);
    let index = persJson.permissions.findIndex((i) => (i == module));
    return index;
}