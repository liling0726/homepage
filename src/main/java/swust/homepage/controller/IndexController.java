package swust.homepage.controller;

import java.util.List;

import swust.homepage.model.User;

import com.jfinal.core.Controller;

public class IndexController extends Controller {
	public void index() {
		render("html/homePage.html");
	}
	
	public void random() {
		List<User> result = User.dao.find(
				"select user_name, user_url from user order by rand() limit 10");
		renderJson("user", result);
	}
}
