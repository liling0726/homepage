package swust.homepage.model;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Page;

public class News extends Model<News> {
	private static final long serialVersionUID = 8905020616569150673L;
	public static final News dao = new News();
	
	/**
	 * @author 刘杰
	 * @param pageNumber 页码
	 * @param pageSize 每页最大条数
	 * @return 含有用户 （news表内）所有信息以及专业名，学院名的对象集
	 */
	public Page<News> paginate(int pageNumber, int pageSize) {
		return paginate(pageNumber, pageSize, "SELECT *", "FROM news");
	}
}
