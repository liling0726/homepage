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
		String type = controller.getSessionAttr("type");
		switch (type) {
			case "teacher":
				User user = controller.getSessionAttr("user");
				if (user != null && user.isLogin())
					ai.invoke();
				else
					controller.redirect("html/homePage.html");
				break;
			case "admin":
				Admin admin = controller.getSessionAttr("admin");
				if (admin != null && admin.isLogin())
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
