package swust.homepage.model;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Model;
import java.util.List;

/** Jin Long */
public class OpLog extends Model<OpLog> {

    public static final OpLog dao = new OpLog();

    /** 查找前5条操作日志 */
    public List<OpLog> get5Log() {
        String sql = "SELECT user_name, op, time FROM op_log, user WHERE op_log.user_id=user.user_id ORDER BY time desc LIMIT 5";
        return find(sql);
    }

    /** 分页查找操作日志 */
    public List<OpLog> findByPage(int page, int recordPerPage) {
        int start = (page - 1) * recordPerPage;
        String sql = "SELECT user_name, op, time FROM op_log, user WHERE op_log.user_id=user.user_id ORDER BY time desc LIMIT " + start + ", " + recordPerPage;
        return find(sql);
    }

    /** 根据时间查找操作日志 分页 */
    public List<OpLog> findByTime(int page, int recordPerPage, String startTime, String endTime) {
        int start = (page - 1) * recordPerPage;
        String sql = "SELECT user_name, op, time FROM op_log, user"
                + " WHERE op_log.user_id=user.user_id AND time >= '" + startTime
                + "' AND time <= '" + endTime
                + "' ORDER BY time desc LIMIT " + start + ", " + recordPerPage;
        return find(sql);
    }

    public long allRecord() {
        return Db.queryLong("SELECT COUNT(*) FROM op_log");
    }

    public long countRecordByTime(String startTime, String endTime) {
        String sql = "SELECT COUNT(*) FROM op_log"
                + " WHERE time >= '" + startTime
                + "' AND time <= '" + endTime + "'";
        return Db.queryLong(sql);
    }

}
