package swust.homepage.controller;

import java.util.Optional;
import com.jfinal.aop.Before;
import swust.homepage.OpInterceptor;
import swust.homepage.model.Acad;
import swust.homepage.model.User;
import swust.homepage.LoginService;
import swust.homepage.HPController;
import com.jfinal.core.ActionKey;

public class IndexController extends HPController {
    @ActionKey("/")
    public void index() {
        redirect("/html/homePage.html");
    }

    /* Jin Long */
    public void random() {
        renderJson("user", User.dao.randomUser());
    }

    /**
     * ZengDan
     */
    public void acadName() {
        renderJson("acadName", Acad.dao.acad());
    }

    /**
     * @author 刘杰
     * 返回点击排名靠前的老师，默认前12，可传入参数控制个数
     */
    public void topUserCount() {
        renderJson("topUserCount", User.dao.topUserCount(getParaToInt(0, 12)));//liujie
    }

    /**
     * 老师登录验证
     * 需要参数 user_num(老师工号) pwd(密码) checkcode(验证码)
     * url: /index/login
     * jinlong
     */
    @Before(OpInterceptor.class)
    public void login() {
        // 检查验证码
        String checkCode = getSessionAttr("checkCode");
        if (checkCode == null) {
            renderJson("result", "没有验证码");
            return;
        }
        if (!checkCode.equals(getPara("checkcode"))) {
            renderJson("result", "验证码错误");
            return;
        }

        // 验证用户身份
        LoginService s = new LoginService();
        Optional<User> someTeacher = s.checkTeacher(getPara("user_num"), getPara("pwd"));
        if (someTeacher.isPresent()) {
            User user = someTeacher.get();
            setSessionAttr("user_id", user.get("user_id")); // 把老师ID放进session中
            setSessionAttr("type", "teacher");
            renderJson("result", user);
        } else
            renderJson("result", "第一次登录");
    }

    /**
     * 创建新用户
     */
    public void createUser() {
        boolean ret = getModel(User.class).save();
        trueOrFalse(ret);
    }

    /**
     * @author chendekai
     */
    public void searchFlesh() {
        renderJson("Searchs", User.dao.userFlesh());
    }
}
