package swust.homepage.controller;

import java.util.List;
import swust.homepage.model.Admin;
import swust.homepage.model.Dept;
import swust.homepage.model.User;

import com.jfinal.core.Controller;

/**
 * @author 刘杰 管理员页面的老师页面的控制类
 */
public class AdminTeacherInfoController extends Controller {

	public void index() {
		getPage();
	}

	/**
	 * 传入要保存的user对象的信息（不包含user_id）
	 */
	public void save() {
		User user = getModel(User.class);
		if (!user.save()) {
			renderJson("result", "添加老师失败");
		}
		if ((boolean) (user.get("user_is_admin"))) {
			Admin admin = new Admin();
			admin.set("admin_num", user.get("user_num"));
			admin.set("admin_name", user.get("user_name"));
			admin.set("admin_dept_id", user.get("user_dept_id"));
			admin.set("admin_acad_id",
					Dept.dao.getAcadIdByDeptId(user.getInt("user_dept_id")));
			if (!admin.save()) {
				renderJson("result", "添加管理员失败");
			}
		}
		renderJson("result", "添加成功");
	}

	/**
	 * 传入user的id和要改变的信息
	 */
	public void update() {
		User user = getModel(User.class);
		User oldUser = User.dao.findById(user.getInt("user_id"));
		List<Admin> admins = Admin.dao
				.find("select * from admin where admin_num="
						+ oldUser.getStr("user_num"));
		/*
		 * 利用用户的id得到以前的数据user_num 据此num得到管理员 避免因改变num而造成的admin表内新建管理员
		 */
		if (!user.update()) {
			renderJson("result", "修改失败");
			return;
		}
		Admin admin = null;
		if (admins != null && admins.size() > 0) {
			admin = admins.get(0);
		}
		if ((boolean) (user.get("user_is_admin"))) {// 修改管理员（存在），新建管理员（不存在）
			if (admin == null) {
				admin = new Admin();
				admin.set("admin_num", user.get("user_num"));
				admin.set("admin_name", user.get("user_name"));
				admin.set("admin_dept_id", user.get("user_dept_id"));
				admin.set("admin_acad_id",
						Dept.dao.getAcadIdByDeptId(user.getInt("user_dept_id")));
				if (!admin.save()) {
					renderJson("result", "修改失败");
				}
			} else {
				admin.set("admin_num", user.get("user_num"));
				admin.set("admin_name", user.get("user_name"));
				admin.set("admin_dept_id", user.get("user_dept_id"));
				admin.set("admin_acad_id",
						Dept.dao.getAcadIdByDeptId(user.getInt("user_dept_id")));
				if (!admin.update()) {
					renderJson("result", "修改失败");
				}
			}

		} else {// 删除对应管理员
			if (admins != null && admins.size() > 0) {
				if (!(admins.get(0).delete())) {
					renderJson("result", "修改失败");
				}
			}
		}
		renderJson("result", "修改成功");
	}

	/**
	 * 传入要删除的user的id，格式 1-2-3-4删除多个
	 */
	public void delete() {
		int success = 0;
		int fail = 0;
		for (int i = 0, p = getParaToInt(i, -1); p != -1; i++) {
			p = getParaToInt(i, -1);
			if (p >= 0) {
				User user = User.dao.findById(p);
				if (user == null) {
					System.out.println("用户不存在，删除失败！");
					renderJson("用户不存在，删除失败！");
					return;
				}
				if (user.getBoolean("user_is_admin")) {
					List<Admin> admins = Admin.dao
							.find("select * from admin where admin.admin_num="
									+ user.getStr("user_num"));
					Admin admin = null;
					if (admins != null && admins.size() > 0) {
						admin = admins.get(0);
					}
					if (admin != null && admin.delete()) {
						System.out.println("User:id=" + p + " 对应管理员刪除成功！");
					} else {
						System.out.println("User:id=" + p + " 对应管理员刪除失败！");
					}
				}
				if (User.dao.deleteById(p)) {
					success++;
					System.out.println("User:id=" + p + " 删除成功！");
				} else {
					fail++;
					System.out.println("User:id=" + p + " 删除失败！");
				}
			}
		}
		renderJson("result", "删除成功" + success + "个，失败" + fail + "个");
	}

	/**
	 * 接受一个参数，返回对应id的user实例，若不存在返回“用户不存在”
	 */
	public void edit() {
		User user = User.dao.findById(getParaToInt());
		if (user == null) {
			renderJson("user", "用户不存在");
		} else {
			renderJson("user", user);
		}
	}

	/**
	 * 获取一个页面的老师集合，参数/a-b 获取第a页的老师，每页有b个老师
	 */
	public void getPage() {
		renderJson("userPage",
				User.dao.paginate(getParaToInt(0, 1), getParaToInt(1, 10)));
	}

	/**
	 * 根据学院Id查专业，如传参数Id=2,找出这个学院下的所有专业名、专业Id
	 */
	public void findDeptByAcadId() {
		renderJson("deptList", Dept.dao.findByAcadId(getParaToInt(0, 1)));
	}

	/**
	 * 根据关键字查询 key 关键字 pageNumber 页码 pageSize 每页最多条数
	 */
	public void findUserByKey() {
		renderJson(
				"keyUserPage",
				User.dao.paginateByKey(getPara("key"),
						getParaToInt("pageNumber", 1),
						getParaToInt("pageSize", 10)));
	}

}
