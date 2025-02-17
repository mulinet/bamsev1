document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.getElementById("loginButton");
    const userIdInput = document.getElementById("userId");
    const passwordInput = document.getElementById("password");
    const errorMessage = document.getElementById("errorMessage");

    loginButton.addEventListener("click", async () => {
        const userid = userIdInput.value;
        const password = passwordInput.value;

        if (!userid || !password) {
            errorMessage.textContent = "아이디와 비밀번호를 입력하세요.";
            errorMessage.style.display = "block";
            return;
        }

        try {
            const response = await window.electronAPI.login({ userid, password });
            if (response.success) {
                window.location.href = "../views/dashboard.html";
            } else {
                errorMessage.textContent = response.message;
                errorMessage.style.display = "block";
            }
        } catch (error) {
            console.error("로그인 오류:", error);
            errorMessage.textContent = "로그인 중 오류가 발생했습니다.";
            errorMessage.style.display = "block";
        }
    });
});
