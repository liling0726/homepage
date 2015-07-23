package swust.homepage.controller;

import swust.homepage.model.Acad;

import com.jfinal.core.Controller;

/**
 * ZengDan
 */
public class AcadInfoMoreController extends Controller{

	public void index() {
		renderJson("result", Acad.dao.acadWithDept());
	}
}
