document.addEventListener("DOMContentLoaded", () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
        alert("로그인이 필요합니다.");
        location.href = 'login.html';
        return;
    }

    // 로그아웃 기능
    document.querySelector('.logout').addEventListener('click', (event) => {
        event.preventDefault();
        sessionStorage.clear();
        alert("로그아웃 되었습니다.");
        location.href = 'login.html';
    });

    // 모든 링크 클릭 시 토큰 유효성 체크
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (event) => {
            if (!sessionStorage.getItem('token')) {
                event.preventDefault();
                alert("로그인이 필요합니다.");
                sessionStorage.clear();
                location.href = 'login.html';
            }
        });
    });

    // 뒤로가기 비활성화
    history.pushState(null, null, location.href);
    window.onpopstate = function () {
        history.go(1);
    };
});