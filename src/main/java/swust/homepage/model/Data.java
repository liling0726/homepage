package swust.homepage.model;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Page;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
	 * @param userUrl 用户url 
	 * @param dataUserUrl 用户对应栏目的url
	 * @return
	 */
	public List<List<Data>> getDataContent(String userUrl, String dataUserUrl) {
		//Map<Integer, String> map = new HashMap<Integer, String>();
		List<Data> list1 = new ArrayList<Data>();
		List<Data> list2 = new ArrayList<Data>();
		//listAll = find("select data_id, data_name, data_url from data where data_user_id = "+dataUserId+" and data_order!=0 ORDER BY data_order");
		//list = find("select data_id, data_name, data_url from data where data_user_id = "+dataUserId+" and data_order=0 ORDER BY data_id");
		list1 = find("select data_content from data"
				+ " where data_user_id=(select user_id from user where user_url = "+userUrl
				+ " and data_url = "+dataUserUrl+" and data_order!=0 ORDER BY data_order");
		list2 = find("select data_content from data"
				+ " where data_user_id=(select user_id from user where user_url = "+userUrl
				+ " and data_url = "+dataUserUrl+" and data_order=0 ORDER BY data_id");
		/*for(int i=0; i<list1.size(); i++){
			map.put(list1.get(i).getInt("data_id"), list1.get(i).getStr("data_name"));
		}
		for(int i=0; i<list2.size(); i++){
			map.put(list2.get(i).getInt("data_id"), list2.get(i).getStr("data_name"));
		}*/
		List<List<Data>> list = new ArrayList<List<Data>>();
		list.add(list1);
		list.add(list2);
		//System.out.println(map);
		return list;
	}
	
	public List<Data> getDefaultDataContent(String userUrl) {
		List<Data> list1 = new ArrayList<Data>();
		List<Data> list2 = new ArrayList<Data>();
		list1 = find("select data_content from data"
				+ " where data_user_id=(select user_id from user where user_url = "+userUrl
				+ " and data_order!=0 ORDER BY data_order limit 1");
		list2 = find("select data_content from data"
				+ " where data_user_id=(select user_id from user where user_url = "+userUrl
				+ " and data_order=0 ORDER BY data_id limit 1");
		List<List<Data>> list = new ArrayList<List<Data>>();
		list.add(list1);
		list.add(list2);
		if(!list1.isEmpty()){
			return list1;
		}else{
			return list2;
		}
	}

	/**
	 * @author zengdan
	 * 
	 * @param dataUserId
	 * @param teacherId, 对应教师的id
	 * @return
	 */
	/*public List<Data> getDataContent(int dataId) {
		return find("select data_content from data where data_id = "
				+ dataId);
	}

	public List<Data> getFaultDataContent() {
		return find("select data_content from data where data_order != 0 ORDER BY data_order");
	}*/
	
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
