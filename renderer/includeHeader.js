document.addEventListener("DOMContentLoaded", function() {
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            // header.html 파일이 로드된 후에 커스텀 이벤트 발생
            document.dispatchEvent(new Event('headerLoaded'));
        });
});

document.addEventListener("headerLoaded", function() {
    // 테마 선택 기능 추가
    const themeToggleButton = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.add(currentTheme);

    themeToggleButton.addEventListener('click', function() {
        const newTheme = document.body.classList.contains('light') ? 'dark' : 'light';
        document.body.classList.remove('light', 'dark');
        document.body.classList.add(newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggleButton.textContent = newTheme === 'light' ? '🌞' : '🌜';
    });

    // 로그아웃 기능 추가
    const logoutButton = document.getElementById('logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', function(event) {
            event.preventDefault();
            localStorage.clear();
            sessionStorage.clear();
            location.href = 'login.html';
        });
    } else {
        console.error("로그아웃 버튼을 찾을 수 없습니다.");
    }
});
