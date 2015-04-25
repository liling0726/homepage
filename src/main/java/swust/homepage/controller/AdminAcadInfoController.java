package swust.homepage.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
		renderJson("result",Acad.dao.acadInfoMore());
		/*renderJson("result",Acad.dao.academic());*/
		/*render("/html/adminAcadInfo.html");*/
	}

}
