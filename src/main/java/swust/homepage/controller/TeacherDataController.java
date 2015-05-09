package swust.homepage.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import swust.homepage.model.Data;
import com.jfinal.core.Controller;

/** @author jinlong */
public class TeacherDataController extends Controller {
	/* 
	 * 新建栏目：需要提供的字段  data_name data_content data_order data_parent
	 * 至少需要提供 data_name
	 */
	public void save() {
		trueOrFalse(genData().save());
	}
	
	// 删除栏目：必须提供 data_id
	public void delete() {
		trueOrFalse(Data.dao.deleteById(getPara("data_id")));
	}
	
	// 查找所有栏目：不需要参数
	public void findAll() {
		setAttr("data_user_id", 6);
		int dataUserId = getAttrForInt("data_user_id");
		List<Data> dataList = Data.dao
				.find("SELECT * FROM `data` WHERE `data_user_id`=?", dataUserId);
		dataOrFalse(dataList);
	}
	
	/* 更新栏目：data_name data_content data_order data_parent 这四个字段中任意的组合
	 * 但是必须提供 data_id
	 */
	public void update() {
		Data data = new Data();
		data.set("data_id", getPara("data_id"));
		Map<String, Object> paraMap = new HashMap<>(); 
		putIfExists(paraMap, "data_name");
		putIfExists(paraMap, "data_content");
		putIfExists(paraMap, "data_order");
		putIfExists(paraMap, "data_parent");
		trueOrFalse(data.setAttrs(paraMap).update());
	}

	
	/* ------------------------------------------------------------------------- */
	private Data genData() {
		Data data = new Data();
		data.set("data_name", getPara("data_name"));
		data.set("data_content", getPara("data_content"));
		data.set("data_order", getParaToInt("data_order"));
		data.set("data_parent", getParaToInt("data_parent"));
		data.set("data_user_id", getSession().getAttribute("user_id"));
		data.set("data_update_time", new Date());
		return data;
	}
	
	private void trueOrFalse(boolean bool) {
		if (bool)
			renderJson("result", "成功");
		else
			renderJson("result", "失败");
	}
	
	private <T> void dataOrFalse(List<T> lst) {
		if (lst.size() == 0)
			renderJson("result", "失败");
		else
			renderJson("result", lst);
	}
	
	private void putIfExists(Map<String, Object> map, String paraName) {
		String value = getPara(paraName);
		if (value != null)
			map.put(paraName, value);
	}
}
