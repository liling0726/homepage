package swust.homepage.model;

import java.util.List;
import swust.homepage.util.Tuple2;
import com.jfinal.plugin.activerecord.Db;
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
		return find("SELECT * FROM `user` ORDER BY user_count DESC LIMIT 0,"
				+ String.valueOf(count));
	}

	/**
	 * @author 刘杰
	 * @param pageNumber 页码
	 * @param pageSize 每页最大条数
	 * @return 含有用户 （user表内）所有信息以及专业名，学院名的对象集
	 */
	public Page<User> paginate(int pageNumber, int pageSize) {
		return paginate(pageNumber, pageSize, "SELECT\n" + "	`user`.*,\n"
				+ "	dept.dept_name,\n" + "	acad.acad_name\n", "FROM\n"
				+ "	`user`,\n" + "	dept,\n" + "	acad\n" + "WHERE\n"
				+ "	`user`.user_dept_id = dept.dept_id\n"
				+ "AND dept.dept_acad_id = acad.acad_id");
	}
	
	/**
	 * retuen 的list集合中就是更新前十的数据
	 * @CDK
	 */
	public List<User> userFlesh()
	{
		String sql="select *from user ORDER by user_update_time DESC  limit 10";
		List<User> list=User.dao.find(sql);
		System.out.println(list.size());
		return list;
		
	}
	/**
	 * @author 刘杰
	 * @param key 关键字
	 * @param pageNumber 页码
	 * @param pageSize 每页最大条数
	 * @return 符合查找条件的集合
	 */
	public Page<User> paginateByKey(String key,int pageNumber, int pageSize) {
		System.out.println("按关键字查找ing...Key="+key+"  页码="+String.valueOf(pageNumber)+"  最大条数="+String.valueOf(pageSize));
		return paginate(pageNumber, pageSize, 
				"select `user`.*,acad.acad_name,dept.dept_name",
				" from `user`,acad,dept where"
				+ " (`user`.user_name like '%"+key+"%'"
				+ " or `user`.user_num like '%"+key+"%'"
				+ " or acad_name like '%"+key+"%'"
				+ " or dept.dept_name like '%"+key+"%')"
				+ " and `user`.user_dept_id = dept.dept_id and dept.dept_acad_id = acad.acad_id");
	}
	
	/** jinlong */
	public List<User> randomUser() {
		return find("select user_name, user_url, user_img "
				           + "from user order by rand() limit 12");
	}
	
	/** jinlong */
	public Long countAll() {
		return Db.queryLong("select count(*) from user");
	}
	
	/** jinlong */
	public Tuple2<String, List<User>> showMore(int count, String searchWords, int need) {
		StringBuilder b = new StringBuilder();
		String prefix = "select user_name, user_url, user_img, dept_name, acad_name from user, dept, acad where user_dept_id = dept_id and dept_acad_id = acad_id ";
		if (searchWords != null && !searchWords.equals("")) {
			String[] words = searchWords.split(" ");
			b.append(prefix);
			for (String str: words) {
				b.append(" and ((user_name like '%"); b.append(str); b.append("%') ");
				b.append(" or (acad_name like '%"); b.append(str); b.append("%') ");
				b.append(" or (dept_name like '%"); b.append(str); b.append("%')) ");
			}
			return new Tuple2<>("success", find(b.toString()));
		} else {
			b.append(prefix);
			b.append(" limit "); b.append(count); b.append(", "); b.append(need);
			if ((count + need) > countAll())
				return new Tuple2<>("nomore", find(b.toString()));
			else
				return new Tuple2<>("success", find(b.toString()));
		}
	}

}