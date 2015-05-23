package swust.homepage.controller;

import java.util.Random;

import com.jfinal.core.Controller;

import swust.homepage.model.Admin;
import swust.homepage.model.User;


/**
 * ZengDan
 */
public class AdminAdminInfoController extends Controller{

	public void index() {//若给定值，pageNumber/pageSize为给定的值，否则为默认值即后者参数
		renderJson("adminAdminInfo", Admin.dao.adminAdminInfo(getParaToInt(0, 1), getParaToInt(1, 10)));
	}

	//添加
	public void save() {
		if(getModel(Admin.class).save()) {
			renderJson("result", "添加成功");
		}else {
			renderJson("result", "添加失败");
		}
	}
	
	//查用户想要修改的内容，并返回给前端
	public void edit() throws Exception{
		String id = getPara("ID");
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
	
	//根据关键字key查询
	public void findAdminByKey() {
		renderJson("keyAdminPage", Admin.dao.paginateByKey(getPara("key"), getParaToInt("pageNumber"), getParaToInt("pageSize")));
	}
}
