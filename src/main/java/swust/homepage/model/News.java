package swust.homepage.model;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Page;

public class News extends Model<News> {
	private static final long serialVersionUID = 8905020616569150673L;
	public static final News dao = new News();

	/**
	 * @author 刘杰
	 * @param pageNumber
	 *            页码
	 * @param pageSize
	 *            每页最大条数
	 * @return 含有用户 （news表内）所有信息以及专业名，学院名的对象集
	 */
	public Page<News> paginate(int pageNumber, int pageSize) {
		return paginate(pageNumber, pageSize,
				"select news.*,`data`.data_name ",
				"from news,`data` where news.news_data_id=`data`.data_id");
	}

	/**
	 * @author 刘杰
	 * @param key
	 *            关键字
	 * @param pageNumber
	 *            页码
	 * @param pageSize
	 *            每页最大条数
	 * @return 符合查找条件的集合
	 */
	public Page<News> paginateByKey(String key, int pageNumber, int pageSize) {
		System.out.println("按关键字查找ing...Key=" + key + "  页码="
				+ String.valueOf(pageNumber) + "  最大条数="
				+ String.valueOf(pageSize));
		return paginate(
				pageNumber,
				pageSize,
				"select news.*,`data`.data_name ",
				" from news,`data` where (news.news_data_id=`data`.data_id) and (news.news_title like '%"
						+ key
						+ "%' or news.news_content like '%"
						+ key
						+ "%' or `data`.data_name like '%" + key + "%')");
	}

}
