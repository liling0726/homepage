package swust.homepage.controller;

import swust.homepage.HPController;
import swust.homepage.model.OpLog;

import java.util.List;

/** Jin Long */
public class AdminTeacherOperationLogController extends HPController {
    public void opLog() {
        List<OpLog> opLogs = OpLog.dao.findByPage(getParaToInt("page"), getParaToInt("recordPerPage"));
        renderJson("result", opLogs);
    }
}
