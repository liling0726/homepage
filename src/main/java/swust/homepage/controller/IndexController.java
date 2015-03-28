package swust.homepage.controller;

import java.util.List;

import swust.homepage.model.Acad;

import com.jfinal.core.ActionKey;
import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;

public class IndexController extends Controller {
	@ActionKey("/")
	public void index() {
		render("/html/homePage.html");
	}
	
	public void random() {
		List<Record> result = Db.find(
				"select user_name, user_url, user_img from user order by rand() limit 10");
		renderJson("user", result);
	}
	
	/**
	 * ZengDan
	 */
	public void acadName(){
		List<Acad> list = Acad.dao.find("select acad_name from acad");
		renderJson("acad", list);
	}
}
