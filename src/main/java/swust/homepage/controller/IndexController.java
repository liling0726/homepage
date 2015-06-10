package swust.homepage.controller;

import java.util.Optional;

import swust.homepage.model.Acad;
import swust.homepage.model.User;
import swust.homepage.service.LoginService;
import swust.homepage.util.HomePageController;
import swust.homepage.util.LoginCheck;
import com.jfinal.core.ActionKey;

public class IndexController extends HomePageController {
	@ActionKey("/")
	public void index() {
        String url = getPara(0);
        if (url == null || url.equals(""))
		    redirect("/html/homePage.html");
        else {
            // 设置参数
            render("/html/teacherPersonalShow.html"); // 默认使用FreeMarker模板渲染
        }
	}
	
	/* jinlong */
	public void random() { renderJson("user", User.dao.randomUser()); }
	
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
     * 需要参数 user_num(老师工号) pwd(密码) checkcode(验证码)
     * url: /index/login
	 * jinlong
	 */
	public void login() {
		// 检查验证码
		String checkCode = getAttr("checkCode");
		if (!checkCode.equals(getPara("checkcode"))) {
			renderJson("result", "验证码错误");
			return;
		}
		
		// 验证用户身份
		LoginService s = new LoginService();
		Optional<User> someTeacher = s.checkTeacher(getPara("user_num"), getPara("pwd"));
		if (someTeacher.isPresent()) {
			User user = someTeacher.get();
			setAttr("user_id", user.get("user_id")); // 把老师ID放进session中
            setAttr("type", "teacher");
			renderJson("result", user);
		} else
			renderJson("result", "第一次登录");
	}

    /**
     * 创建新用户
     */
	public void createUser() {
        boolean ret = getModel(User.class).save();
        trueOrFalse(ret);
    }

	public void checkUser() { renderJson(LoginCheck.manager.getUserNameByID(getPara("user_num"))); }

	/**
	 * @author chendekai
	 */
	public void searchFlesh()
	{
		
		renderJson("Searchs",User.dao.userFlesh());
		
		
	}
}
