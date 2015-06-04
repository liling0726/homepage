package swust.homepage.controller;

import java.util.List;

import swust.homepage.model.Admin;
import swust.homepage.model.Dept;
import swust.homepage.model.News;
import swust.homepage.model.User;

import com.jfinal.core.Controller;

public class TeacherNewsManageController extends Controller {

	public void index() {
		getPage();
	}

	public void save() {
		News news = getModel(News.class);
		if (news.save()) {
			renderJson("result", "添加成功");
		} else {
			renderJson("result", "添加失败");
		}
	}

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

	//获取一个news，一个参数，多余参数无效
	public void findNewsById() {
		renderJson("news", News.dao.findById(getPara(0)));
	}

	public void update() {
		News news =getModel(News.class);
		if(news.update()){
			renderJson("修改成功");
		}
		else{
			renderJson("修改失败");
		}
	}

	/**
	 * 获取一个页面的新闻集合，参数/a-b 获取第a页的老师，每页有b个老师
	 */
	public void getPage() {
		renderJson("newsPage",
				News.dao.paginate(getParaToInt(0, 1), getParaToInt(1, 10)));
	}
}
