let socket;

export const connectWebSocket = (examId, onMessage) => {
    socket = new WebSocket(`ws://localhost:8080/exam-websocket`);

    socket.onopen = () => {
        console.log("connected");
    };

    socket.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data);
            const speakingDateId = data;
            onMessage(speakingDateId);
        } catch (error) {
            console.error("Error parsing WebSocket message:", error);
        }
    };

    socket.onerror = (error) => {
        console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
        console.log("disconnected");
    };
};

export const disconnectWebSocket = () => {
    if (socket) {
        socket.close();
    }
};
