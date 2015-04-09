package swust.homepage.controller;

import com.jfinal.core.Controller;
import swust.homepage.model.Acad;

/**
 * ZengDan
 */
public class AcadInfoMoreController extends Controller{
	
	public void index() {
		renderJson("acadInfoMore", Acad.dao.acadInfoMore());
	}
}
