package swust.homepage.controller;

import java.text.SimpleDateFormat;
import java.util.Date;

import swust.homepage.model.Data;
import swust.homepage.model.News;

import com.jfinal.core.Controller;

public class TeacherNewsManageController extends Controller {

	public void index() {
		getPage();
	}

	public void save() {
		News news = getModel(News.class);
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");// 设置日期格式
		news.set("news_create_time", df.format(new Date()));
		if (news.save()) {
			renderJson("result", "添加成功");
		} else {
			renderJson("result", "添加失败");
		}
	}

	@SuppressWarnings("static-access")
	public void delete() {

		int success = 0;
		int fail = 0;
		for (int i = 0, p = getParaToInt(i, -1); p != -1; i++) {
			p = getParaToInt(i, -1);
			if (p >= 0) {
				News news = News.dao.findById(p);
				if (news == null) {
					System.out.println("用户不存在，删除失败！");
					renderJson("用户不存在，删除失败！");
					return;
				}
				if (news.dao.deleteById(p)) {
					success++;
					System.out.println("News:id=" + p + " 删除成功！");
				} else {
					fail++;
					System.out.println("News:id=" + p + " 删除失败！");
				}
			}
		}
		renderJson("result", "删除成功" + success + "个，失败" + fail + "个");
	}

	// 获取一个news，一个参数，多余参数无效
	public void findNewsById() {
		renderJson("news", News.dao.findById(getPara(0)));
	}

	public void update() {
		News news = getModel(News.class);
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");// 设置日期格式
		news.set("news_update_time", df.format(new Date()));
		if (news.update()) {
			renderJson("result", "修改成功");
		} else {
			renderJson("result", "修改失败");
		}
	}

	/**
	 * 获取一个页面的新闻集合，参数/a-b 获取第a页的新闻，每页有b个新闻
	 */
	public void getPage() {
		renderJson("newsPage",
				News.dao.paginate(getParaToInt(0, 1), getParaToInt(1, 10)));
	}

	// 根据参数获取data链表，参数为data.data_type
	public void getDataByType() {
		renderJson("datas", Data.dao.getDataByType(getParaToInt()));
	}

	/**
	 * 根据关键字查询 key 关键字 pageNumber 页码 pageSize 每页最多条数
	 */
	public void findNewsByKey() {
		renderJson(
				"keyNewsPage",
				News.dao.paginateByKey(getPara("key"),
						getParaToInt("pageNumber", 1),
						getParaToInt("pageSize", 10)));
	}
}
