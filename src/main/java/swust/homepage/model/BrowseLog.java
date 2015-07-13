package swust.homepage.model;

import java.util.List;

import com.jfinal.plugin.activerecord.Model;

/**
 * Created by jinlong on 2015/6/26.
 */
public class BrowseLog extends Model<BrowseLog> {
	public static final BrowseLog dao = new BrowseLog();

	public List<BrowseLog> findAllByUserId(int userId, int dayNum) {
		return find("select * from browse_log where browse_log.user_id="
				+ userId + " and browse_log.time>= now() - interval " + dayNum
				+ " day");
	}
}
