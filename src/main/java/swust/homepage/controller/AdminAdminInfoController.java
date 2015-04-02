package swust.homepage.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.jfinal.core.Controller;

import swust.homepage.model.Acad;
import swust.homepage.model.Dept;
import swust.homepage.model.User;


/**
 * ZengDan
 */
public class AdminAdminInfoController extends Controller{

	public void index() {
		render("/html/adminAdminInfo.html");
	}
	
	public void adminAdminInfo(){//老师->专业->学院

		Map<String, Map<String, String>> map = new HashMap<String, Map<String, String>>();
		List<User> userList = User.dao.find("select user_name, user_dept_id from user");
		
		for(User u : userList){
			String userString = u.getStr("user_name");
			List<Dept> deptList = Dept.dao.find("select dept_name, dept_acad_id from dept "
					+"where dept_id = " + u.getInt("user_dept_id"));
			String deptString = deptList.get(0).getStr("dept_name");
			
			List<Acad> acadList = Acad.dao.find("select acad_name from acad "
					+"where acad_id = " + deptList.get(0).getInt("dept_acad_id"));			
			String acadString = acadList.get(0).getStr("acad_name");
			
			Map<String, String> map1 = new HashMap<String, String>();
			map1.put(deptString, acadString);
			map.put(userString, map1);
		}
		renderJson("acadInfo", map);
	}
}
