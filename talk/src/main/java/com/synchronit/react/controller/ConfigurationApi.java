
package com.synchronit.react.controller;

import java.io.IOException;
import java.util.Properties;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PropertiesLoaderUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.synchronit.react.model.Configuration;

@Controller
public class ConfigurationApi {

    @CrossOrigin(origins = {
            "*"
    })
    @RequestMapping(value = "/config", method = RequestMethod.GET)
    @ResponseBody
    public Configuration getConfig() throws IOException {
        Resource resource = new ClassPathResource("/AppMessages.properties");
        Properties messages = PropertiesLoaderUtils.loadProperties(resource);
        Configuration conf = new Configuration();
        conf.setMessages(messages);
        return conf;
    }
}
