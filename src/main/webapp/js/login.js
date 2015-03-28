function inputFocus(focusid)
{
	var fbid = document.getElementById(focusid);
	if(fbid.id=="username"||fbid.id=="password"||fbid.id=="selectPart")
	{
		fbid.onfocus=function() {
			fbid.className="inputOnfocus";
		}
		fbid.onblur=function() {
			fbid.className="inputOnblur";
		}
	}
	if(fbid.id=="code")
	{
		fbid.onfocus=function() {
			fbid.className="inputCodeOnfocus";
		}
		fbid.onblur=function() {
			fbid.className="inputCodeOnblur";
		}
	}
}
window.onload=function(){
	inputFocus("username");
	inputFocus("password");
	inputFocus("code");
	inputFocus("selectPart");
}