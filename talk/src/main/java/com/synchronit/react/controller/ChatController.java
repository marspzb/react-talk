
package com.synchronit.react.controller;

import java.util.ArrayList;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.synchronit.react.model.ChatMessageText;
import com.synchronit.react.model.SendMessageResponse;

@Controller
@CrossOrigin(origins = {
        "*"
})
@RequestMapping(value = "/chat")
public class ChatController {

    private final ArrayList<ChatMessageText> chatMessages = new ArrayList<>();

    @RequestMapping(value = "/send", method = RequestMethod.POST)
    @ResponseBody
    public SendMessageResponse sendMessage(final ChatMessageText msg) {
        chatMessages.add(msg);
        return new SendMessageResponse();
    }

    @RequestMapping(value = "/get", method = RequestMethod.GET)
    @ResponseBody
    public ArrayList<ChatMessageText> getMessages() {

        return this.chatMessages;
    }

}
