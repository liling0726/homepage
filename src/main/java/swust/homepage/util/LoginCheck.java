package swust.homepage.util;

import com.wiscom.is.IdentityFactory;
import com.wiscom.is.IdentityManager;

/** @author jinlong */
public class LoginCheck {
    public static IdentityManager manager = null;

    static {
        try {
            String init = "src/main/resources/client.properties";
            IdentityFactory idf = IdentityFactory.createFactory(init);
            manager = idf.getIdentityManager();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static String loginCheck(String username, String userpwd) {
        if (manager.isUserExist(username)) {
            if (manager.checkPassword(username, userpwd))
                return "验证成功";
            else
                return "验证失败";
        }
        return "验证失败";
    }

    /** 验证用户是否存在 */
    public static boolean isUserExist(String username) {
        return manager.isUserExist(username);
    }
}
