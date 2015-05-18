package swust.homepage.controller;

import swust.homepage.model.User;
import com.jfinal.core.Controller;

public class TeacherShowMoreController extends Controller {
	
	public void showMore() {
		renderJson("result", User.dao.orderedUser());
	}
}
