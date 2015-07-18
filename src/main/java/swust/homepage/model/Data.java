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
		return paginate(pageNum, need, "SELECT *",
				"FROM `data` where `data_user_id`=?", dataUserId);
	}

	public List<Data> getDataByType(int type) {
		return find("select * from `data` where `data`.data_type="
				+ String.valueOf(type));
	}

	/**
	 * @author zengdan
	 * 
	 * @param dataUserId
	 *            teacherId, 对应教师的id
	 * @return
	 */
	public List<Data> getDataName(int dataUserId) {
		return find("select data_id, data_name from data where data_user_id = "
				+ dataUserId);
	}

	/**
	 * @author zengdan
	 * 
	 * @param dataUserId
	 *            teacherId, 对应教师的id
	 * @return
	 */
	public List<Data> getDataContent(int dataId) {
		return find("select data_content from data where data_user_id = "
				+ dataId);
	}

	/**
	 * 按点击量排序查找所有栏目
	 * 
	 * @param dataUserId
	 *            用户user_id
	 * @return
	 */
	public List<Data> findAllOrderByCount(int dataUserId) {
		return find("SELECT * FROM `data` WHERE `data_user_id`=" + dataUserId
				+ " order by `data_click_count` desc");
	}
}
