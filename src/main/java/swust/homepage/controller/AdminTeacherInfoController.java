package swust.homepage.controller;

import swust.homepage.model.User;

import com.jfinal.core.Controller;

/**
 * 
 * @author 刘杰
 *
 */
public class AdminTeacherInfoController extends Controller {

	public void index() {
		renderJson("userPage", User.dao.paginate(getParaToInt(0, 1), 10));
	}

	public void save() {
		getModel(User.class).save();
		redirect("/adminTeacherInfo");
	}
	
	public void update(){
		getModel(User.class).update();
		redirect("/adminTeacherInfo");
	}
	
	public void delete(){
		User.dao.deleteById(getParaToInt());
		redirect("/adminTeacherInfo");
	}
	
	public void edit(){
		//setAttr("user",User.dao.findById(getParaToInt()));
		renderJson("user",User.dao.findById(getParaToInt()));
	}
}
