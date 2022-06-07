let siteSetting = {
    api: {
        BaseUrl: process.env.REACT_APP_API_BASE_URL,
        mode: 'cors',
        WebSocketUrl: process.env.REACT_APP_WEB_SOCKET_URL
    }
}
console.log('env', process.env);

export default siteSetting;