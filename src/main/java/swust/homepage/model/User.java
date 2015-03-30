package swust.homepage.model;

import java.util.List;

import com.jfinal.plugin.activerecord.Model;

public class User extends Model<User> {
	private static final long serialVersionUID = 1767655565354816718L;
	public static final User dao = new User();
	/**
	 * @author 刘杰
	 * @param count 要查询的个数
	 * @return 点击量前count的List<User>
	 */
	public List<User> topUserCount(int count){
		return find("SELECT * FROM `user` ORDER BY user_count DESC LIMIT 0,"+
	String.valueOf(count));
	}
}
