package swust.homepage.model;

import java.util.List;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Page;

public class Admin extends Model<Admin> {
	private static final long serialVersionUID = 6665903244753199082L;
	public static final Admin dao = new Admin();
	
	/**
	 * @author ZengDan
	 * @param pageNumber查询页数
	 * @param pageSize每页的数量
	 * @return 含有所有管理员信息的对象集
	 * */
	public Page<Admin> adminAdminInfo(int pageNumber, int pageSize) {//学院 -> 老师 -> 专业 -> 姓名 -> 专业名称
		return paginate(pageNumber, pageSize, "select admin_id, admin_num, admin_name, dept_name, acad_name ", "from admin, dept, acad where admin_dept_id = dept_id and admin_acad_id = acad_id");
	}
	
	/**
	 * @author zengdan
	 * 
	 * @param key  关键字
	 * @param pageNumber  页码
	 * @param pageSize  条数
	 * @return
	 */
	public Page<Admin> paginateByKey(String key,int pageNumber, int pageSize) {
		System.out.println("按关键字查找ing...Key="+key+"  页码="+String.valueOf(pageNumber)+"  最大条数="+String.valueOf(pageSize));
		return paginate(pageNumber, pageSize, 
				"select *"
				 , " from admin, acad, dept where"
				 + "( admin_name like '%" + key + "%'"
				 + " or acad_name like '%" + key + "%'"
				 + " or dept_name like'%" + key + "%')"
				 + " and admin_dept_id = dept_id and admin_acad_id = acad_id");
	}
	
	/**
	 * @author zengdan
	 * 
	 * @param adminNum  管理员工号
	 * @return 重复则返回为true，反之为false
	 */
	public boolean isSame(int adminNum){
		List<Admin> list = find("select admin_name from admin where admin_num = " + adminNum);
		System.out.println(list);
		if(list.isEmpty() || list == null){
			return false;
		}else{
			return true;
		}			
	}
	
	/** @author jinlong */
	public boolean isLogin() {
		return true;
	}
	
}
