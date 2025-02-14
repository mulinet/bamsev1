// 뒤로가기 비활성화
function disableBackNavigation() {
    history.pushState(null, null, location.href);
    window.onpopstate = function () {
        history.go(1);
    };
}

document.addEventListener("DOMContentLoaded", disableBackNavigation);