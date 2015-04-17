package swust.homepage.controller;

import java.util.Optional;

import javax.servlet.http.HttpSession;

import swust.homepage.model.Admin;
import swust.homepage.service.LoginService;

import com.jfinal.core.Controller;

public class AdminLoginController extends Controller {
	
	/**
	 * 管理员登录验证
	 * @author jinlong
	 */
	public void login() {
		// 检查验证码
		HttpSession session = getSession();
		if (session == null) {
			renderJson("result", "请输入验证码");
			return;
		}
		String checkCode = (String)session.getAttribute("checkCode");
		if (!checkCode.equals(getPara("checkCode"))) {
			renderJson("result", "验证码错误");
			return;
		}
		
		// 验证用户身份
		LoginService s = LoginService.I.get();
		Optional<Admin> someAdmin = s.checkAdmin(getPara("admin_num"), getPara("pwd"));
		if (someAdmin.isPresent())
			renderJson("result", someAdmin.get());
		else
			renderJson("result", "不是管理员");
	}
}
