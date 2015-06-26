package swust.homepage;

import com.jfinal.aop.Interceptor;
import com.jfinal.core.ActionInvocation;
import com.jfinal.core.Controller;
import swust.homepage.model.OpLog;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

// 操作记录 只记录老师的操作
/** @author jinlong */
public class OpInterceptor implements Interceptor {

    // 找出action对应的操作名称
    private final Map<String, String> actionToOp = new HashMap<>();
    {
        actionToOp.put("actionKey", "op");
    }

    @Override
    public void intercept(ActionInvocation ai) {
        Controller controller = ai.getController();
        int userId = controller.getSessionAttr("user_id");
        String op = actionToOp.get(ai.getActionKey());
        LocalDateTime time = LocalDateTime.now();
        new OpLog().set("user_id", userId).set("op", op).set("time", time).save();
        ai.invoke();
    }

    public static void main(String[] args) {
        Instant instant = Instant.now();
        System.out.println(LocalDateTime.now());
    }
}
