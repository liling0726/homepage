package swust.homepage.controller;

import java.util.List;

import com.jfinal.core.Controller;

import swust.homepage.model.Dept;

/**
 * ZengDan
 */
public class AcadInfoMoreController extends Controller{
	public void index() {
		render("/html/acadInfoMore.html");
	}
	
	public void acadInfoMoreDept(){
		List<Dept> list = Dept.dao.find("select dept_name from dept inner join acad where dept.dept_acad_id = acad.acad_id");
		renderJson("acadInfo", list);
	}
}
