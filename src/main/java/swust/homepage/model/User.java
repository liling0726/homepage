package swust.homepage.model;

import com.jfinal.plugin.activerecord.Model;

public class User extends Model<User> {
	private static final long serialVersionUID = 1767655565354816718L;
	public static final User dao = new User();
}
