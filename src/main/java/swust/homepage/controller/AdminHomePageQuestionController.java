package swust.homepage.controller;

import swust.homepage.model.Feedback;

import com.jfinal.core.Controller;

public class AdminHomePageQuestionController extends Controller{
	public void index()
	{
		
	}
	public void answered()
	{
		
		renderJson("answered",Feedback.dao.find("select feedback_id,feedback_content,feedback_anser_content,feedback_update_time from feedback where feedback_is_ansered=0"));
	}
	public void noAnswered()
	{
		renderJson("noansewred",Feedback.dao.find("select feedback_id,feedback_content,feedback_anser_content,feedback_update_time from feedback where feedback_is_ansered=0"));
	}
	/**
	 * 需要获取两个值
	 * feedback_id
	 * feedback_anser_content
	 * 
	 */
	public void answerQuestion()
	{
		Feedback fb=Feedback.dao.findById(getParaToInt("feedback_id"));
		fb.set("feedback_is_ansered",1);
		fb.set("feedback_anser_content",getPara("feedback_anser_content"));
		if(fb.save())
		{
			renderJson("result","success");
		}
		else
		{
			renderJson("result","false");
		}
		
		
	}

}
