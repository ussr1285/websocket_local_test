document.addEventListener("DOMContentLoaded", () => {
    const log = document.getElementById("log");
    const messageInput = document.getElementById("messageInput");
    const sendButton = document.getElementById("sendButton");

    // 서버 WebSocket 주소
    const wsUrl = "ws://127.0.0.1:8001/ws";
    const socket = new WebSocket(wsUrl);

    // WebSocket 연결 이벤트
    socket.addEventListener("open", () => {
        addLog("WebSocket 연결 성공");
    });

    // WebSocket 메시지 수신
    socket.addEventListener("message", (event) => {
        const data = JSON.parse(event.data);
        addLog(`Received: ${JSON.stringify(data)}`);
    });

    // WebSocket 닫힘 이벤트
    socket.addEventListener("close", () => {
        addLog("WebSocket 연결 종료");
    });

    // WebSocket 에러 이벤트
    socket.addEventListener("error", (error) => {
        addLog(`WebSocket 에러: ${error.message}`);
    });

    // 메시지 전송 버튼 클릭 이벤트
    sendButton.addEventListener("click", () => {
        const message = messageInput.value.trim();
        if (message) {
            const jsonMessage = JSON.stringify({ type: "custom_message", data: message });
            socket.send(jsonMessage);
            addLog(`Sent: ${jsonMessage}`);
            messageInput.value = "";
        }
    });

    // 로그 추가 함수
    function addLog(message) {
        const logEntry = document.createElement("div");
        logEntry.textContent = message;
        log.appendChild(logEntry);
        log.scrollTop = log.scrollHeight; // 항상 스크롤을 아래로
    }
});
