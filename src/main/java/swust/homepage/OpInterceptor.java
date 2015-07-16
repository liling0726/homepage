package swust.homepage;

import com.jfinal.aop.Interceptor;
import com.jfinal.core.ActionInvocation;
import com.jfinal.core.Controller;
import swust.homepage.model.OpLog;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

// 操作记录 只记录老师的操作
/** @author jinlong */
public class OpInterceptor implements Interceptor {

    // 找出action对应的操作名称
    private final Map<String, String> actionToOp = new HashMap<>();

    {
        actionToOp.put("/index/login", "登录了教师个人主页系统");
    }

    @Override
    public void intercept(ActionInvocation ai) {
        ai.invoke();
        Controller controller = ai.getController();
        int userId = controller.getSessionAttr("user_id");
        String op = actionToOp.get(ai.getActionKey());
        System.out.println(ai.getActionKey());
        new OpLog().set("user_id", userId).set("op", op).set("time", new Date()).save();
    }
}
