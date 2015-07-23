package swust.homepage;

import com.jfinal.core.Controller;

import java.util.List;
import java.util.Map;

/** @author Jin Long */
public class HPController extends Controller {
    private static final String SUCCESS = "成功", FAIL = "失败";

    public void trueOrFalse(boolean bool) {
        if (bool)
            renderJson("result", SUCCESS);
        else
            renderJson("result", FAIL);
    }

    public <T> void listOrFalse(List<T> lst) {
        if (lst.size() == 0)
            renderJson("result", FAIL);
        else
            renderJson("result", lst);
    }

    public <T> void oneOrFalse(T t) {
        if (t != null)
            renderJson("result", t);
        else
            renderJson("result", FAIL);
    }

    public void putIfExists(Map<String, Object> map, String paraName) {
        String value = getPara(paraName);
        if (value != null)
            map.put(paraName, value);
    }
}
