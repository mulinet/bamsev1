# bams ev1 

# initialize a new electron app

# init script 
mkdir my-electron-app
cd my-electron-app
npm init -y
npm install electron --save-dev


# install npm 
npm install electron --save
npm install axios --save
npm install electron-builder --save

# folder Structure
📁 my-electron-app
 ┣ 📁 views
 ┃ ┣ 📄 login.html   (로그인 화면)
 ┃ ┣ 📄 dashboard.html (대시보드 페이지)
 ┣ 📁 renderer
 ┃ ┣ 📄 login.js     (로그인 로직)
 ┃ ┗ 📄 dashboard.js (대시보드 로직)
 ┣ 📄 main.js        (메인 프로세스)
 ┣ 📄 preload.js     (보안 강화)
 ┣ 📄 package.json

