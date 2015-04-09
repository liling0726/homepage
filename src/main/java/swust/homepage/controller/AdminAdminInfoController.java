package swust.homepage.controller;

import com.jfinal.core.Controller;
import swust.homepage.model.Admin;


/**
 * ZengDan
 */
public class AdminAdminInfoController extends Controller{

	public void index() {
		renderJson("adminAdminInfo", Admin.dao.adminAdminInfo(getParaToInt(0, 1), 10));
	}

	public void save() {
		getModel(Admin.class).save();
		redirect("/adminAdminInfo");
	}
	
	public void edit() {
		setAttr("adminAdminInfo", Admin.dao.findById(getParaToInt()));
	}
	
	public void update() {
		getModel(Admin.class).update();
		redirect("/adminAdminInfo");
	}
	
	public void delete() {
		Admin.dao.deleteById(getParaToInt());
		redirect("/adminAdminInfo");
	}
}
