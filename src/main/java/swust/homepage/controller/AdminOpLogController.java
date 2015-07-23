package swust.homepage.controller;

import swust.homepage.HPController;
import swust.homepage.model.OpLog;

import java.util.List;

/** Jin Long */
public class AdminOpLogController extends HPController {

    public void index() {
        List<OpLog> opLogs = OpLog.dao
                .findByPage(getParaToInt("page"), getParaToInt("rpp"));
        renderJson("result", opLogs);
    }

    public void findByTime() {
        List<OpLog> opLogs = OpLog.dao
                .findByTime(getParaToInt("page"), getParaToInt("rpp")
                , getPara("startTime"), getPara("endTime"));
        renderJson("result", opLogs);
    }

}
