package swust.homepage;

import swust.homepage.model.Admin;
import swust.homepage.model.User;

import com.jfinal.aop.Interceptor;
import com.jfinal.core.ActionInvocation;
import com.jfinal.core.Controller;

/** @author jinlong */
public class AuthInterceptor implements Interceptor {

	@Override
	public void intercept(ActionInvocation ai) {
		Controller controller = ai.getController();
		String type = controller.getSessionAttr("type");			// 获取用户类型
		switch (type) {
			case "teacher":
				String userId = controller.getSessionAttr("user_id");			// 获取session中的id并验证
				if (userId != null && (User.dao.findById(userId) != null))
					ai.invoke();
				else
					controller.redirect("html/homePage.html");			// 如果不对则跳回首页
				break;
			case "admin":
				String adminId = controller.getSessionAttr("admin_id");
				if (adminId != null && (Admin.dao.findById(adminId) != null))
					ai.invoke();
				else
					controller.redirect("html/adminLogin.html");
				break;
			default:
				controller.redirect("/html/homePage.html");
				break;
		}
	}

}
