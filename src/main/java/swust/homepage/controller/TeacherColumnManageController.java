package swust.homepage.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.jfinal.plugin.activerecord.Page;
import swust.homepage.model.Data;
import com.jfinal.core.Controller;

/** @author jinlong */
public class TeacherColumnManageController extends Controller {
	/**
     * 新建栏目
     * 需要提供的字段 data_name(栏目名称) data_content(栏目内容) data_order(栏目排序) data_url(栏目别名)
     * 至少需要提供 data_name(栏目名称)
     * url: /teacherColumnManage/save
	 */
	public void save() {
		trueOrFalse(genData().save());
	}

    /**
     * 删除栏目
     * 必须提供 data_id
     * url: /teacherColumnManage/delete
     */
	public void delete() {
		trueOrFalse(Data.dao.deleteById(getPara("data_id")));
	}

    /**
     * 查找所有栏目
     * 不需要参数
     * url: /teacherColumnManage/all
     */
	public void all() {
		setAttr("data_user_id", 6);
		int dataUserId = getAttrForInt("data_user_id");
		List<Data> dataList = Data.dao.findAll(dataUserId);
		dataOrInfo(dataList);
	}

    /**
     * 分页查询
     * 必须提供 pageNum(页数) need(一页显示多少条数据)
     * url: /teacherColumnManage/page
     */
    public void page() {
        Page<Data> page = Data.dao.page(getParaToInt("pageNum"), getParaToInt("need"), getAttrForInt("data_user_id"));
        dataOrInfo(page.getList());
    }
	
	/**
	 * 更新栏目
     * 这四个字段中任意的组合 data_name(栏目名称) data_content(栏目内容) data_order(栏目排序) data_url(栏目别名)
	 * 但是必须提供 data_id
     * url: /teacherColumnManage/update
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
		data.set("data_url", getPara("data_url"));
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
	
	private <T> void dataOrInfo(List<T> lst) {
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
