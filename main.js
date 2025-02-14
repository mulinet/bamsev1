const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const axios = require("axios");

let mainWindow;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    mainWindow.loadFile("views/login.html");
}); 

ipcMain.handle("login", async (event, credentials) => {
    try {
        const response = await axios.post("https://7def6f73-9aec-48eb-9d1a-8507e08111c1.mock.pstmn.io/auth", credentials);
        const data = response.data;

        console.log(data);
        console.log(data.email);
        console.log(data[0]);
        console.log(data.firstlogin);
        console.log(data.accessToken);

        if (data.accessToken) {
            // 렌더러 프로세스의 sessionStorage에 토큰 저장
            mainWindow.webContents.executeJavaScript(`sessionStorage.setItem('token', '${data.accessToken}');`);
            return { success: true, token: data.accessToken };
        } else {
            return { success: false, message: "로그인 실패!" };
        }
    } catch (error) {
        console.log(error);
        return { success: false, message: "서버 오류 발생" };
    }
});

