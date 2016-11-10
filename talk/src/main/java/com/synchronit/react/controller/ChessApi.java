
package com.synchronit.react.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

import com.synchronit.react.dal.ChessPlayDAL;

@Controller
@CrossOrigin(origins = {
        "*"
})
@RequestMapping(value = "/chess")
public class ChessApi {

    @Autowired
    private ChessPlayDAL chessDal;

}
