package swust.homepage.model;

import com.jfinal.plugin.activerecord.Model;

import java.util.List;

/** Jin Long */
public class OpLog extends Model<OpLog> {
    public static final OpLog dao = new OpLog();

    public List<OpLog> get5Log() {
        String sql = "SELECT user_name, op, time FROM op_log, user WHERE op_log.user_id=user.user_id ORDER BY time desc LIMIT 5";
        return find(sql);
    }


}
