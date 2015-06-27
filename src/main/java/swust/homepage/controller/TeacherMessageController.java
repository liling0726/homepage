package swust.homepage.controller;

import com.jfinal.aop.Before;
import com.jfinal.core.Controller;

import swust.homepage.AuthInterceptor;
import swust.homepage.model.Message;

/**
 *
 * @author zengdan
 *
 */
@Before(AuthInterceptor.class)
public class TeacherMessageController extends Controller {

	public void index() {// 若给定值，pageNumber/pageSize为给定的值，否则为默认值即后者参数
		setSessionAttr("user_id", 4);
		renderJson("teacherMessage", Message.dao.teacherMessage(getParaToInt(0, 1), getParaToInt(1, 10), getSessionAttr("user_id")));
		// 测试下对不对
		//renderJson("teacherMessage", Message.dao.teacherMessage(1, 10, 4));

	}

	// 添加
	public void update() {
		if (getModel(Message.class).update()) {
			renderJson("result", "添加成功");
		} else {
			renderJson("result", "添加失败");
		}
	}

	// 删除(可批量删除)
	public void delete() throws Exception {
		String ids = getPara("ID");
		for (String id : ids.split(",")) {
			if (Message.dao.deleteById(id)) {
				renderJson("result", "删除成功");
			} else {
				renderJson("result", "删除失败");
			}
		}
	}

}
