package swust.homepage.controller;

import com.jfinal.core.Controller;
import swust.homepage.model.OpLog;

import java.util.List;

/** Jin Long */
public class AdminOpLogController extends Controller {

    public void find() {
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
