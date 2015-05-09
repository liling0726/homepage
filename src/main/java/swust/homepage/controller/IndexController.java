package swust.homepage.controller;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpSession;

import swust.homepage.model.Acad;
import swust.homepage.model.User;
import swust.homepage.service.LoginService;

import com.jfinal.core.ActionKey;
import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;

public class IndexController extends Controller {
	@ActionKey("/")
	public void index() {
		redirect("/html/homePage.html");
	}
	
	/** @author jinlong */
	public void random() {
		List<Record> result = Db.find(
				"select user_name, user_url, user_img "
				+ "from user order by rand() limit 12");
		renderJson("user", result);
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
		LoginService s = LoginService.IMPL.get();
		Optional<User> someTeacher = s.checkTeacher(getPara("admin_num"), getPara("pwd"));
		if (someTeacher.isPresent())
			renderJson("result", someTeacher.get());
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
