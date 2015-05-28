package swust.homepage.controller;

import java.util.Optional;

import javax.servlet.http.HttpSession;

import swust.homepage.model.Acad;
import swust.homepage.model.User;
import swust.homepage.service.LoginService;

import com.jfinal.core.ActionKey;
import com.jfinal.core.Controller;

public class IndexController extends Controller {
	@ActionKey("/")
	public void index() {
		redirect("/html/homePage.html");
	}
	
	/** jinlong */
	public void random() {
		renderJson("user", User.dao.randomUser());
	}
	
	/**
	 * ZengDan
	 */
	public void acadName(){
		renderJson("acadName", Acad.dao.acad());
	}
	
	/**
	 * @author 刘杰
	 * 返回点击排名靠前的老师，默认前12，可传入参数控制个数
	 */
	public void topUserCount(){
		renderJson("topUserCount", User.dao.topUserCount(getParaToInt(0,12)));//liujie
	}
	
	/**
	 * 老师登录验证
	 * jinlong
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
		LoginService s = new LoginService();
		Optional<User> someTeacher = s.checkTeacher(getPara("admin_num"), getPara("pwd"));
		if (someTeacher.isPresent()) {
			User user = someTeacher.get();
			setAttr("user_id", user.get("user_id")); // 把老师ID放进session中
			renderJson("result", user);
		}
		else
			renderJson("result", "第一次登录");
	}
	/**
	 * @author chendekai
	 */
	public void searchFlesh()
	{
		
		renderJson("Searchs",User.dao.userFlesh());
		
		
	}
}
