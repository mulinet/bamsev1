const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const axios = require("axios");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

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
    const reqCententType = {'Content-Type': 'application/json'};

    try {
        const response = await axios.post("https://bamsqa.jejudreamtower.com/user/signin", credentials, {reqCententType});
        const data = response.data;

        if (data.accessToken) {
            // 렌더러 프로세스의 sessionStorage에 토큰 저장
            mainWindow.webContents.executeJavaScript(`sessionStorage.setItem('token', '${data.accessToken}');`);

            mainWindow.webContents.executeJavaScript(`localStorage.setItem('id', '${data.id}');`);
            mainWindow.webContents.executeJavaScript(`localStorage.setItem('username', '${data.username}');`); 



            return { success: true, token: data.accessToken };
        } else {
            return { success: false, message: "로그인 실패!" };
        }
    } catch (error) {
        console.log(error);
        return { success: false, message: "서버 오류 발생" };
    }
});

