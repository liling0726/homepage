package swust.homepage.controller;

import com.jfinal.core.Controller;

import swust.homepage.model.Feedback;

/**
 * 
 * @author zengdan
 *
 */
public class TeacherFeedbackController extends Controller{

	//添加
			public void save() {
				if(getModel(Feedback.class).save()) {
					renderJson("result", "添加成功");
				}else {
					renderJson("result", "添加失败");
				}
			}
			
			//删除(可批量删除)
			public void delete() throws Exception{
				String ids = getPara("ID");
		        for(String id: ids.split(",")){
		        	if(Feedback.dao.deleteById(id)) {
		    			renderJson("result", "删除成功");
		    		}else{
		    			renderJson("result", "删除失败");
		    		}    	
		        }
			}
}
