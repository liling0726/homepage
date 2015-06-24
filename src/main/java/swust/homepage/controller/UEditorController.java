package swust.homepage.controller;

import com.baidu.ueditor.upload.Uploader;
import com.jfinal.core.ActionKey;
import com.jfinal.core.Controller;

/** @author jinlong */
public class UEditorController extends Controller {
    @ActionKey("/uploadimage")
    public void uploadimage() {
        System.out.println("kkk");
        renderNull();
    }
}
