package swust.homepage.model;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Page;

import java.util.List;

public class Data extends Model<Data> {
	private static final long serialVersionUID = -27245496130704114L;
	public static final Data dao = new Data();

	/** jinlong */
    public List<Data> findAll(int dataUserId) {
        return find("SELECT * FROM `data` WHERE `data_user_id`=?", dataUserId);
    }

    /** 分页查询 jinlong */
    public Page<Data> page(int pageNum, int need, int dataUserId) {
        return paginate(pageNum, need, "SELECT *", "FROM `data` where `data_user_id`=?", dataUserId);
    }
}
