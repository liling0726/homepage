package swust.homepage.model;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Page;

public class Admin extends Model<Admin> {
	private static final long serialVersionUID = 6665903244753199082L;
	public static final Admin dao = new Admin();
	
	/**
	 * @author ZengDan
	 * @param pageNumber查询页数
	 * @param pageSize每页的数量
	 * @return 含有admin表内老师的所有信息的对象集
	 * */
	public Page<Admin> adminAdminInfo(int pageNumber, int pageSize) {//学院 -> 老师 -> 专业 -> 姓名 -> 专业名称
		return paginate(pageNumber, pageSize, "select * ", "from admin , dept where admin_dept_id = dept_id");
	}
	
}
