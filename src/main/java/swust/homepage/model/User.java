package swust.homepage.model;

import java.util.List;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Page;

public class User extends Model<User> {
	private static final long serialVersionUID = 1767655565354816718L;
	public static final User dao = new User();

	/**
	 * @author 刘杰
	 * @param count 要查询的个数
	 * @return 点击量前count的List<User>
	 */
	public List<User> topUserCount(int count) {
		return find("SELECT user_id,user_name FROM `user` ORDER BY user_count DESC LIMIT 0,"
				+ String.valueOf(count));
	}

	/**
	 * @author 刘杰
	 * @param pageNumber查询页数
	 * @param pageSize每页的数量
	 * @return 含有用户 （user表内）所有信息以及专业名，学院名的对象集
	 */
	public Page<User> paginate(int pageNumber, int pageSize) {
		return paginate(pageNumber, pageSize, "SELECT\n" + "	`user`.*,\n"
				+ "	dept.dept_name,\n" + "	acad.acad_name\n", "FROM\n"
				+ "	`user`,\n" + "	dept,\n" + "	acad\n" + "WHERE\n"
				+ "	`user`.user_dept_id = dept.dept_id\n"
				+ "AND dept.dept_acad_id = acad.acad_id");
	}
	
}
