package swust.homepage.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.jfinal.plugin.activerecord.Page;
import swust.homepage.model.Data;
import swust.homepage.util.HomePageController;

/** @author jinlong */
public class TeacherColumnManageController extends HomePageController {
	/**
     * 新建栏目
     * 需要提供的字段 data_name(栏目名称) data_content(栏目内容) data_order(栏目排序) data_url(栏目别名)
	 * data_type(栏目类型) data_nature(栏目性质) data_is_show(栏目是否显示 1 显示 2 不显示)
     * 至少需要提供 data_name(栏目名称)
     * url: /teacherColumnManage/save
	 */
	public void save() {
        boolean ret = genData().save();
		trueOrFalse(ret);
    }

    /**
     * 删除栏目
     * 必须提供 data_id 如果要删除多个以“-”分隔
     * url: /teacherColumnManage/delete
     */
	public void delete() {
        String delList[] = getPara("data_id").split("-");
        boolean success = true;
        for (String s: delList) {
            try {
                int id = Integer.parseInt(s);
                success = Data.dao.deleteById(id);
                if (!success) break;
            } catch (NumberFormatException ex) {
                success = false;
                break;
            }
        }
		trueOrFalse(success);
	}


    /**
     * 查找所有栏目
     * 不需要参数
     * url: /teacherColumnManage/all
     */
	public void all() {
		int dataUserId = getAttrForInt("user_id");
		List<Data> dataList = Data.dao.findAll(dataUserId);
		listOrFalse(dataList);
	}

    /**
     * 分页查询
     * 必须提供 pageNum(页数) need(一页显示多少条数据)
     * url: /teacherColumnManage/page
     */
    public void page() {
        Page<Data> page = Data.dao.page(getParaToInt("pageNum"), getParaToInt("need"), getAttrForInt("data_user_id"));
        listOrFalse(page.getList());
    }

    /**
     * 根据data_id查询
     * 必须提供 data_id
     * url: /teacherColumnManage/findById
     */
    public void findById() {
        Data data =  Data.dao.findById(getParaToInt("data_id"));
        oneOrFalse(data);
    }
	
	/**
	 * 更新栏目
     * 这几个字段中任意的组合 data_name(栏目名称) data_content(栏目内容) data_order(栏目排序) data_url(栏目别名)
	 * data_type(栏目类型) data_nature(栏目性质) data_is_show(栏目是否显示 1 显示 2 不显示)
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
		putIfExists(paraMap, "data_url");
        putIfExists(paraMap, "data_type");
        putIfExists(paraMap, "data_nature");
        putIfExists(paraMap, "data_is_show");
		trueOrFalse(data.setAttrs(paraMap).update());
	}

	
	/* ------------------------------------------------------------------------- */
	private Data genData() {
		Data data = new Data();
        data.set("data_user_id", getSession().getAttribute("user_id"));
		data.set("data_name", getPara("data_name"));
		data.set("data_content", getPara("data_content"));
		data.set("data_order", getParaToInt("data_order"));
		data.set("data_url", getPara("data_url"));
        data.set("data_type", getPara("data_type"));
        data.set("data_nature", getPara("data_nature"));
        data.set("data_is_show", getPara("data_is_show"));
		data.set("data_update_time", new Date());
		return data;
	}
}
