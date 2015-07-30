package swust.homepage;

import com.jfinal.handler.Handler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Jin Long
 * 2015/7/23
 */
public class UHandler extends Handler {
    @Override
    public void handle(String target, HttpServletRequest request, HttpServletResponse response, boolean[] isHandled) {

        if (target.startsWith("/u")) {
            String[] strs = target.split("/");
            String newTarget = "";
            if (strs.length == 3)
                newTarget = "/u/view/" + strs[2];
            else if (strs.length == 4)
                newTarget = "/u/view/" + strs[2] + "-" + strs[3];
            else if (strs.length == 5)
                newTarget = "/u/view/" + strs[2] + "-" + strs[3] + "-" + strs[4];

            nextHandler.handle(newTarget, request, response, isHandled);
        }
        nextHandler.handle(target, request, response, isHandled);
    }
}
