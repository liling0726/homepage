package swust.homepage.controller;

import swust.homepage.model.Acad;

import com.jfinal.core.Controller;
/**
 * Controller for adminAcadInfo.html
 * @author CDK
 *
 */
public class AdminAcadInfoController extends Controller{
	public void index()
	{
		renderJson("result",Acad.dao.acad());
		renderJson("result",Acad.dao.academic());
		/*render("/html/adminAcadInfo.html");*/
	}

}
