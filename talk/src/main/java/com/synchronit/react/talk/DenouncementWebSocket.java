
package com.synchronit.react.talk;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

public class DenouncementWebSocket extends TextWebSocketHandler {

    @Override
    public void handleTextMessage(final WebSocketSession session, final TextMessage message) {
        // ...

    }

}
