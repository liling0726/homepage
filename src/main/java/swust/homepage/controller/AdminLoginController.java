package swust.homepage.controller;

import java.util.Optional;

import swust.homepage.model.Admin;
import swust.homepage.LoginService;

import com.jfinal.core.Controller;

/** @author jinlong */
public class AdminLoginController extends Controller {
	
	/**
	 * 管理员登录验证
     * 需要参数 admin_num(管理员工号) pwd(密码) checkcode(验证码)
     * url: /adminLogin/login
	 */
	public void login() {
		// 检查验证码
		String checkCode = getSessionAttr("checkCode");
		if (checkCode == null) {
			renderJson("result", "请输入验证码");
			return;
		}
		if (!checkCode.equals(getPara("checkcode"))) {
			renderJson("result", "验证码错误");
			return;
		}
		
		// 验证用户身份
		LoginService s = new LoginService();
		Optional<Admin> someAdmin = s.checkAdmin(getPara("admin_num"), getPara("pwd"));
		if (someAdmin.isPresent()) {
			Admin admin = someAdmin.get();
			setSessionAttr("admin_id", admin.get("admin_id")); // 把管理员ID放进session中
            setSessionAttr("type", "admin");
			renderJson("result", admin);
		}
		else
			renderJson("result", "不是管理员");
	}
}
