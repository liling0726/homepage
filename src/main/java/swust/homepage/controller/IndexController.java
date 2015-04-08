package swust.homepage.controller;

import java.util.List;

import swust.homepage.model.Acad;
import swust.homepage.model.User;

import com.jfinal.core.ActionKey;
import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;

public class IndexController extends Controller {
	@ActionKey("/")
	public void index() {
		setAttr("topUserCount", User.dao.topUserCount(9));//刘杰：我就测试一下返回的list对不对
		render("/html/homePage.html");
	}
	
	/**
	 * @author jinlong
	 */
	public void random() {
		List<Record> result = Db.find(
				"select user_name, user_url, user_img "
				+ "from user order by rand() limit 10");
		renderJson("user", result);
	}
	
	/**
	 * ZengDan
	 */
	public void acadName(){
		List<Acad> list = Acad.dao.find("select * from acad");
		renderJson("acad", list);
	}
	
	/**
	 * liujie
	 */
	public void topUserCount(){
		renderJson("topUserCount", User.dao.topUserCount(9));//liujie
	}
}
