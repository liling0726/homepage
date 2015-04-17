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

	//添加
	public void save() {
		if(getModel(Admin.class).save()) {
			renderJson("result", "添加成功");
		}else {
			renderJson("result", "添加失败");
		}
		System.out.println("save()");
	}
	
	//查用户想要修改的内容，并返回给前端
	public void edit() throws Exception{
		String id = getPara("ID");
		System.out.println(Admin.dao.findById(id));
		if(Admin.dao.findById((getParaToInt(id))) != null){
			renderJson("result", "存在此管理员");
		}else {
			renderJson("result", "不存在此管理员");
		}
	}
	
	//将用户修改后的数据更新至数据库中
	public void update() {
		if(getModel(Admin.class).update()) {
			renderJson("result", "更新成功");
		}else {
			renderJson("result", "更新失败");
		}
	}
	
	//删除(可批量删除)
	public void delete() throws Exception{
		String ids = getPara("ID");
        for(String id: ids.split(",")){
        	if(Admin.dao.deleteById(id)) {
    			renderJson("result", "删除成功");
    		}else{
    			renderJson("result", "删除失败");
    		}    	
        }
	}
}
