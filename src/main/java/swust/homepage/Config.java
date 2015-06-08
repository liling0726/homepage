package swust.homepage;

import swust.homepage.controller.AcadInfoMoreController;
import swust.homepage.controller.AdminAcadInfoController;
import swust.homepage.controller.AdminAdminInfoController;
import swust.homepage.controller.AdminLoginController;
import swust.homepage.controller.AdminTeacherInfoController;
import swust.homepage.controller.IndexController;
import swust.homepage.controller.TeacherColumnManageController;
import swust.homepage.controller.TeacherFeedbackController;
import swust.homepage.controller.TeacherMessageController;
import swust.homepage.controller.TeacherNewsManageController;
import swust.homepage.controller.TeacherShowMoreController;
import swust.homepage.model.Acad;
import swust.homepage.model.Admin;
import swust.homepage.model.BasicInfo;
import swust.homepage.model.Data;
import swust.homepage.model.Dept;
import swust.homepage.model.Feedback;
import swust.homepage.model.Message;
import swust.homepage.model.News;
import swust.homepage.model.User;

import com.jfinal.config.Constants;
import com.jfinal.config.Handlers;
import com.jfinal.config.Interceptors;
import com.jfinal.config.JFinalConfig;
import com.jfinal.config.Plugins;
import com.jfinal.config.Routes;
import com.jfinal.core.JFinal;
import com.jfinal.plugin.activerecord.ActiveRecordPlugin;
import com.jfinal.plugin.c3p0.C3p0Plugin;
import com.jfinal.render.ViewType;

public class Config extends JFinalConfig {

	@Override
	public void configConstant(Constants a) {
		loadPropertyFile("DbInfo.txt");
		a.setDevMode(true);
		a.setViewType(ViewType.FREE_MARKER);
	}

	@Override
	public void configHandler(Handlers a) {
	}

	// 此处添加全局拦截器
	@Override
	public void configInterceptor(Interceptors a) {
	}

	@Override
	public void configPlugin(Plugins a) {
		C3p0Plugin c3p0Plugin = new C3p0Plugin(getProperty("jdbcUrl"),
				getProperty("user"), getProperty("password"));
		a.add(c3p0Plugin);
		ActiveRecordPlugin arp = new ActiveRecordPlugin(c3p0Plugin);
		a.add(arp);
		arp.addMapping("user", "user_id", User.class);
		arp.addMapping("admin", "admin_id", Admin.class);
		arp.addMapping("acad", "acad_id", Acad.class);
		arp.addMapping("data", "data_id", Data.class);
		arp.addMapping("dept", "dept_id", Dept.class);
		arp.addMapping("news", "news_id", News.class);
		arp.addMapping("basic_info", "basic_info_id", BasicInfo.class);
		arp.addMapping("message", "message_id", Message.class);
		arp.addMapping("feedback", "feedback_id", Feedback.class);
	}

	@Override
	public void configRoute(Routes a) {
		a.add("/index", IndexController.class); // 首页
		a.add("/adminLogin", AdminLoginController.class); // 管理员登陆
		a.add("/acadInfoMore", AcadInfoMoreController.class);
		a.add("/adminAdminInfo", AdminAdminInfoController.class);
		a.add("/adminTeacherInfo", AdminTeacherInfoController.class);
		a.add("/adminacadinfo", AdminAcadInfoController.class);
		a.add("/teacherColumnManage", TeacherColumnManageController.class); // 老师页面栏目
		a.add("/teacherShowMore", TeacherShowMoreController.class); // 搜索页面
		a.add("/teacherMessage", TeacherMessageController.class);
		a.add("/teacherFeedback", TeacherFeedbackController.class);
		a.add("/teacherNewsManage",TeacherNewsManageController.class);
	}
	
	/**
	 * 建议使用 JFinal 手册推荐的方式启动项目
	 * 运行此 main 方法可以启动项目，此main方法可以放置在任意的Class类定义中，不一定要放于此
	 */
	public static void main(String[] args) {
		JFinal.start("src/main/webapp", 80, "/", 5);
	}

}
