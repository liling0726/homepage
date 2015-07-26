package swust.homepage.controller;

import com.jfinal.core.Controller;
import swust.homepage.model.OpLog;
import swust.homepage.util.Tuple2;

import java.util.List;

/** Jin Long */
public class AdminOpLogController extends Controller {

    public void find() {
        List<OpLog> opLogs = OpLog.dao
                .findByPage(getParaToInt("page"), getParaToInt("rpp"));
        renderJson("result", new Tuple2<>(opLogs, OpLog.dao.allRecord()));
    }

    public void findByTime() {
        List<OpLog> opLogs = OpLog.dao
                .findByTime(getParaToInt("page"), getParaToInt("rpp")
                , getPara("startTime"), getPara("endTime"));
        renderJson("result", new Tuple2<>(opLogs,OpLog.dao.countRecordByTime(
                getPara("startTime"), getPara("endTime"))));
    }

}
