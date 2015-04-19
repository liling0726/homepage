package swust.homepage.controller;

import swust.homepage.model.Dept;
import swust.homepage.model.User;

import com.jfinal.core.Controller;

/**
 * @author 刘杰
 *管理员页面的老师页面的控制类
 */
public class AdminTeacherInfoController extends Controller {

	public void index() {
		getPage();
	}

	/**
	 * 传入要保存的user对象的信息（不包含user_id）
	 */
	public void save() {
		if (getModel(User.class).save()) {
			renderJson("result", "添加成功");
		} else {
			renderJson("result", "添加失败");
		}
	}

	/**
	 * 传入user的id和要改变的信息
	 */
	public void update() {
		if (getModel(User.class).update()) {
			renderJson("result", "更新成功");
		} else {
			renderJson("result", "更新失败");
		}
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
	 * 根据关键字查询
	 * key 关键字
	 * pageNumber 页码
	 * pageSize 每页最多条数
	 */
	public void findUserByKey() {
		renderJson("keyUserPage", User.dao.paginateByKey(getPara("key"),
				getParaToInt("pageNumber"), getParaToInt("pageSize")));
	}
}
