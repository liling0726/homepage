package swust.homepage.controller;

import java.util.List;

import swust.homepage.model.User;

import com.jfinal.core.ActionKey;
import com.jfinal.core.Controller;

public class IndexController extends Controller {
	@ActionKey("/")
	public void index() {
		render("/html/homePage.html");
	}
	
	public void random() {
		List<User> result = User.dao.find(
				"select user_name, user_url, user_img from user order by rand() limit 10");
		renderJson("user", result);
	}
}
