package swust.homepage.controller;

import swust.homepage.model.User;
import com.jfinal.core.Controller;

/** @author Jin Long */
public class TeacherShowMoreController extends Controller {
	
	public void showMore() {
		renderJson(User.dao.showMore(getParaToInt("count"), getParaToInt("need")
				, getPara("searchWords"), getPara("sort")));
	}
}
