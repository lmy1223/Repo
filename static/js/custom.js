/*
Theme: eLearning - Free Educational Responsive Web Template
Description: Free to use for personal and commercial use
Author: WebThemez.com
Website: http://webthemez.com
Note: Please do not remove the footer backlink (webthemez.com)--(if you want to remove contact: webthemez@gmail.com)
Licence: Creative Commons Attribution 3.0** - http://creativecommons.org/licenses/by/3.0/
*/
$(function(){

	//返回按钮
	$('i.goback').click(function () {
		window.history.go(-1);
	});

	//回车触发登录表单的提交
	$("body").keydown(function() {
		if ((event.keyCode == "13")&&(!($('#login').is(':hidden')))){//keyCode=13是回车键
			$('#loginsubmit').click();
		}
	});

	//返回顶部
	var nav=$(".navbar-wrapper");
	var win=$(window);
	var sc=$(document);
	win.scroll(function(){
		if(sc.scrollTop()>=10){
			nav.addClass("fixednav"); 
			$(".topBtn").fadeIn();
		}else{
			nav.removeClass("fixednav");
			$(".topBtn").fadeOut();
		}
	});
	
	$('a.topBtn').click(function(){ 
		$('html, body').animate({scrollTop:0}, 'slow'); 
		return false; 
	});

	// Collapse ibox function
    $('.collapse-link').click(function () {
        var ibox = $(this).closest('div.ibox');
        var button = $(this).find('i');
        var content = ibox.find('div.ibox-content');
        content.slideToggle(200);
        button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
        ibox.toggleClass('').toggleClass('border-bottom');
        setTimeout(function () {
            ibox.resize();
            ibox.find('[id^=map-]').resize();
        }, 50);
    });

    //set button css border
	$('button').css("outline","none");
	//侧边栏的显示与隐藏
	$('.rightArea .box1 h4').click(function(){
            $(this).siblings().toggle();
        });
	//显示区域的index
	 $('table.table tbody tr td:nth-child(1)').html(function () {
	   return $(this).parent().index("table tbody tr")+1;
	});

    //反馈意见的数据传递
    $('.wrap-shandow .feedback-wrap form').on('submit',function(){
        var content=$('.wrap-shandow .feedback-wrap form textarea').val();

    	if(content){
			var options = {
				url:'/feedback',
				type:'get',
				dataType:'json',
				data:{'feedback':content},
    			success:function(data){
					$('.wrap-shandow').fadeOut(300);
					$('#resmsg').modal('show')
				 	$('#resmsg .modal-body').html("<h4>您的建议我们已经收到，我们会尽快处理。感谢您的反馈。</h4><a class='btn btn-primary' type='button' data-dismiss='modal'>关闭</a>");
					setTimeout(function(){$('#resmsg').modal('hide');},2500);
				},
				error:function(data){
    				$('.wrap-shandow').fadeOut(300);
    				$('#resmsg').modal('show')
					$('#resmsg .modal-body').html("<h4>请先登录后再试。</h4>");
					setTimeout(function(){window.location.href='/login';},2500);
				}
    		}
    	}else{
    		$('#resmsg').modal('show')
			$('#resmsg .modal-body').html("<h4>请填写您的反馈建议。</h4><a class='btn btn-primary' type='button' data-dismiss='modal'>关闭</a>")
			setTimeout(function(){$('#resmsg').modal('hide');},2500);
		}
        $(this).ajaxSubmit(options);
        return false;
    });
//	//分享区
//	window._bd_share_config = {
//		"common": {
//			"bdSnsKey": {},
//			"bdText": "",
//			"bdMini": "1",
//			"bdMiniList": false,
//			"bdPic": "",
//			"bdStyle": "1",
//			"bdSize": "16"
//		},
//		"share": {}
//	};
//	with(document) 0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~ (-new Date() / 36e5)];
	//个人中心的删除
	$('.delBtn').click(function () {
		confirm("是否确认删除")?$(this).parent().parent().remove() : false;
	});
	//input验证----失去焦点
	$("input").change(function(){
		if($(this).is("input[name='title']")){             //标题判断
			var na=/^[\u4E00-\u9FA5A-Za-z0-9\S ]{1,128}$/
			var na2=/^[\s]{0,}$/
			if($("input[name='title']").val()!=""){
				if(!(na.test($("input[name='title']").val()))){
					$(this).parent().siblings('ul').css('display','block');
					$(this).parent().siblings('ul').html("<img src='static/images/error.png'><span>最大字数为128字</span>")
					return false;
				}else if(na){
					if((na2.test($("input[name='title']").val()))){
						$(this).parent().siblings('ul').css('display','block');
						$(this).parent().siblings('ul').html("<img src='static/images/error.png'><span>请输入非空字符串！</span>")
						return false;
					}else{
						$(this).parent().siblings('ul').css('display','none');
						return true;
					}
				}
			}else{
				$(this).parent().siblings('ul').css('display','block');
				$(this).parent().siblings('ul').html("<img src='static/images/error.png'><span>请填写标题！</span>")
			}
		}
		if($(this).is("input[name='key_word']")){             //关键字判断
			var na=/^[\u4E00-\u9FA5A-Za-z0-9,，]{1,25}$/
			if($("input[name='key_word']").val()!=""){
				if(!(na.test($("input[name='key_word']").val()))){
					$(this).parent().siblings('ul').css('display','block');
					$(this).parent().siblings('ul').html("<img src='static/images/error.png'><span>最大字数为25字且不支持特殊符号！</span>")
					return false;
				}else if(na){
					$(this).parent().siblings('ul').css('display','none');
					return true;
				}
			}else{
				$(this).parent().siblings('ul').css('display','block');
				$(this).parent().siblings('ul').html("<img src='static/images/error.png'><span>请填写关键字！</span>")
			}
		}
		if($(this).is("input[name='url']")){             //url判断  方案处,提交原文处
			var na=/^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/
			if($("input[name='url']").val()!=""){
				if(!(na.test($("input[name='url']").val()))){
					$(this).parent().siblings('ul').css('display','block');
					$(this).parent().siblings('ul').html("<img src='static/images/error.png'><span>暂时只支持http/https/ftp/ftps开头的地址,请输入正确的url地址</span>")
					return false;
				}else if(na){
					$(this).parent().siblings('ul').css('display','none');
					return true;
				}
			}else{
				$(this).parent().siblings('ul').css('display','block');
				$(this).parent().siblings('ul').html("<img src='static/images/error.png'><span>请填写url地址！</span>")
			}
		}
		if($(this).is("input[name='url2']")){             //url2判断 产品处
			var na=/^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/
			if($("input[name='url2']").val()!=""){
				if(!(na.test($("input[name='url2']").val()))){
					$(this).parent().siblings('ul').css('display','block');
					$(this).parent().siblings('ul').html("<img src='static/images/error.png'><span>暂时只支持http/https/ftp/ftps开头的地址,请输入正确的url地址</span>")
					return false;
				}else if(na){
					$(this).parent().siblings('ul').css('display','none');
					return true;
				}
			}else{
				$(this).parent().siblings('ul').css('display','none');
			}
		}
		if($(this).is("input[name='quote']")){             //报价判断
			var na=/^\d{1,6}$/
			if($("input[name='quote']").val()!=""){
				if(!(na.test($("input[name='quote']").val()))){
					$(this).parent().siblings('ul').css('display','block');
					$(this).parent().siblings('ul').html("<img src='static/images/error.png'><span>不能为空，只能输入整数且上限为999999元，10000表示1万元，请依照此格式输入！</span>")
					return false;
				}else if(na){
					$(this).parent().siblings('ul').css('display','none');
					return true;
				}
			}else{
				$(this).parent().siblings('ul').css('display','block');
				$(this).parent().siblings('ul').html("<img src='static/images/error.png'><span>请填写报价！</span>")
			}
		}
		if($(this).is("input[name='budget']")){             //任务预算判断
			var na=/^\d{1,6}$/
			if($("input[name='budget']").is(':hidden')){
				$(this).parent().siblings('ul').css('display','none');
				return true;
			}else {
                if ($("input[name='budget']").val() != "") {
                    if (!(na.test($("input[name='budget']").val()))) {
                        $(this).parent().siblings('ul').css('display', 'block');
                        $(this).parent().siblings('ul').html("<img src='static/images/error.png'><span>不能为空，只能输入整数且上限为999999元，10000表示1万元，请依照此格式输入！</span>")
                        return false;
                    } else if (na) {
                        $(this).parent().siblings('ul').css('display', 'none');
                        return true;
                    }
                } else {
                    $(this).parent().siblings('ul').css('display', 'block');
                    $(this).parent().siblings('ul').html("<img src='static/images/error.png'><span>请填写预算！</span>")
                }
            }
		}
		if($(this).is("input[name='tel']")){             //电话判断
			var na=/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
			if($("input[name='tel']").val()!=""){
				if(!(na.test($("input[name='tel']").val()))){
					$(this).siblings('ul').css('display','block');
					$(this).siblings('ul').html("<img src='static/images/error.png'><span>请输入正确的手机号码！</span>")
					$(this).parent().siblings('ul').css('display','block');
					$(this).parent().siblings('ul').html("<img src='static/images/error.png'><span>请输入正确的手机号码！</span>")
					return false;
				}else if(na){
					var obj=$(this).siblings('ul');
					var obj1=$(this).parent().siblings('ul');
					var tel=$(this).val()
					$.ajax({
                        type: "get",
                        url: "/validate_tel",
                        data: {
                        	tel: tel,
						},
                        success: function (data,status,xhr) {
                            if(data['success']) {
                                if (data['exsit']) {
                                	obj.css('display', 'block');
									obj.html("<img src='static/images/error.png'><span>此电话已被使用，请更换手机号。</span>")
									obj1.css('display', 'block');
									obj1.html("<img src='static/images/error.png'><span>此电话已被使用，请更换手机号。</span>")
									return false
								}
                                else{
									obj.css('display', 'none');
									obj1.css('display', 'none');
									return true;
								}
							}
                        }
                    })
				}
			}
		}

		if($(this).is("input[name='qq']")){             //qq判断
			var na=/^[1-9][0-9]{4,11}$/;
			if($("input[name='qq']").val()!=""){
				if(!(na.test($("input[name='qq']").val()))){
					$(this).siblings('ul').css('display','block');
					$(this).siblings('ul').html("<img src='static/images/error.png'><span>请输入正确的qq号码！</span>")
					return false;
				}else if(na){
					$(this).siblings('ul').css('display','none');
					return true;
				}
			}
		}
		if($(this).is("input[name='wechat']")){             //微信判断
			var na=/^[a-zA-Z\d_]{5,}$/;
			if($("input[name='wechat']").val()!=""){
				if(!(na.test($("input[name='wechat']").val()))){
					$(this).siblings('ul').css('display','block');
					$(this).siblings('ul').html("<img src='static/images/error.png'><span>请输入正确的微信号码！</span>")
					return false;
				}else if(na){
					$(this).siblings('ul').css('display','none');
					return true;
				}
			}
		}
		if(($(this).is("input[name='type']"))||($(this).is("input[name='type2']"))){             //类型判断
				if(($("input[name='type']").val()=="")||($("input[name='type2']").val()=="")){
					$(this).parent().siblings('ul').css('display','block');
					$(this).parent().siblings('ul').html("<img src='static/images/error.png'><span>请选择类型</span>")
					return false;
				}else{
					$(this).parent().siblings('ul').css('display','none');
					return true;
				}
		}
		if(($(this).is("input[name='starting']"))||($(this).is("input[name='ending']"))){             //时间判断
			if(($("input[name='starting']").val()=="")&&($("input[name='ending']").val()=="")){
				$(this).parent().siblings('ul').css('display','block');
				$(this).parent().siblings('ul').html("<img src='static/images/error.png'><span>请选择起止时间</span>")
				return false;
			}else{
				$(this).parent().siblings('ul').css('display','none');
				return true;
			}
		}
		if($(this).is("input[name='days']")){             //申请工时判断
			var na=/^[1-6][0-9]{0,2}$/
			var na2=/^(7[0-2][0-9]|730)$/
			var na3=/^0{0,3}$/
			var na4=/^[0-9]{0,2}$/
			if($("input[name='days']").val()!=""){
				if(!(na.test($("input[name='days']").val())||na2.test($("input[name='days']").val())||na4.test($("input[name='days']").val()))){
					$(this).parent().siblings('ul').css('display','block');
					$(this).parent().siblings('ul').html("<img src='static/images/error.png'><span>最大天数为730天！</span>")
					return false;
				}else if(na3.test($("input[name='days']").val())) {
                    $(this).parent().siblings('ul').css('display', 'block');
                    $(this).parent().siblings('ul').html("<img src='static/images/error.png'><span>最少天数为1天！</span>")
                    return false;
                }else{
					$(this).parent().siblings('ul').css('display','none');
					return true;
				}
			}else{
				$(this).parent().siblings('ul').css('display','block');
				$(this).parent().siblings('ul').html("<img src='static/images/error.png'><span>请填写预计工作时间！</span>")
			}
		}
		if($(this).is("input[name='cycle']")){             //预算工时判断
			var na=/^[1-6][0-9]{0,2}$/
			var na2=/^(7[0-2][0-9]|730)$/
			var na3=/^0{0,3}$/
			var na4=/^[0-9]{0,2}$/
			if($("input[name='cycle']").val()!=""){
				if(!(na.test($("input[name='cycle']").val())||na2.test($("input[name='cycle']").val())||na4.test($("input[name='cycle']").val()))){
					$(this).parent().siblings('ul').css('display','block');
					$(this).parent().siblings('ul').html("<img src='static/images/error.png'><span>最大天数为730天！</span>")
					return false;
				}else if(na3.test($("input[name='cycle']").val())) {
                    $(this).parent().siblings('ul').css('display', 'block');
                    $(this).parent().siblings('ul').html("<img src='static/images/error.png'><span>最少天数为1天！</span>")
                    return false;
                }else{
					$(this).parent().siblings('ul').css('display','none');
					return true;
				}
			}else{
				$(this).parent().siblings('ul').css('display','block');
				$(this).parent().siblings('ul').html("<img src='static/images/error.png'><span>请填写预计工作时间！</span>")
			}
		}
		if($(this).is("input[name='author']")){             //作者判断
			var na=/^[\u4E00-\u9FA5A-Za-z\S ]{1,64}$/
			var na2=/^[\s]{0,}$/
			if($("input[name='author']").val()!=""){
				if(!(na.test($("input[name='author']").val()))){
					$(this).parent().siblings('ul').css('display','block');
					$(this).parent().siblings('ul').html("<img src='static/images/error.png'><span>最大字数为64字,允许‘.’！</span>")
					return false;
				}else if(na){
					if((na2.test($("input[name='author']").val()))){
						$(this).parent().siblings('ul').css('display','block');
						$(this).parent().siblings('ul').html("<img src='static/images/error.png'><span>请输入非空字符串！</span>")
						return false;
					}else{
						$(this).parent().siblings('ul').css('display','none');
						return true;
					}
				}
			}else{
				$(this).parent().siblings('ul').css('display','block');
				$(this).parent().siblings('ul').html("<img src='static/images/error.png'><span>请填写作者！</span>")
			}
		}
		if($(this).is("input[name='username']")){             //用户名判断
			var na=/^[A-Za-z0-9]{1,20}$/
			if($("input[name='username']").val()!=""){
				if(!(na.test($("input[name='username']").val()))){
					$(this).parent().siblings('ul').css('display','block');
					$(this).parent().siblings('ul').html("<img src='static/images/error.png'><span>用户名只能包含数字或字母，且不超过20位！</span>")
					return false;
				}else if(na){
					var username=$("input[name='username']").val();
                    var obj=$(this).parent().siblings('ul');
                    $.ajax({
                        type: "get",
                        url: "/validate_username",
                        data: {username: username},
                        success: function (data,status,xhr) {
                            if(data['success']) {
                                if (data['exsit']) {
                                	obj.css('display', 'block');
									obj.html("<img src='static/images/error.png'><span>此用户名已被注册，请更换用户名!</span>")
									return false
								}
                                else{
									obj.css('display', 'none');
									return true;
								}
							}
                        }
                    })
				}
			}else{
				$(this).parent().siblings('ul').css('display','block');
				$(this).parent().siblings('ul').html("<img src='static/images/error.png'><span>请填写用户名！</span>")
				return false
			}
		}
		if($(this).is("input[id='regis_email']")){             //邮箱判断
			var na=/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
			if($("input[id='regis_email']").val()!=""){
				if(!(na.test($("input[id='regis_email']").val()))){
					$(this).parent().siblings('ul').css('display','block');
					$(this).parent().siblings('ul').html("<img src='static/images/error.png'><span>请输入正确的邮箱地址！</span>")
					return false;
				}else if(na){
					var email=$("input[id='regis_email']").val();
                    var obj=$(this).parent().siblings('ul');
                    $.ajax({
                        type: "get",
                        url: "/validate_email",
                        data: {email: email},
                        success: function (data,status,xhr) {
                        	if(data['success']) {
                                if (data['exsit']) {
                                    obj.css('display', 'block');
                                    obj.html("<img src='static/images/error.png'><span>此邮箱已被注册，请更换邮箱!</span>")
                                    return false
                                } else {
                                    obj.css('display', 'none');
                                    return true;
                                }
                            }
                        }
                    })
				}
			}else{
				$(this).parent().siblings('ul').css('display','block');
				$(this).parent().siblings('ul').html("<img src='static/images/error.png'><span>请填写邮箱！</span>")
				return false
			}
		}
		if($(this).is("input[id='email']")){             //忘记密码时，邮箱判断
			var na=/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
			if($("input[id='regis_email']").val()!=""){
				if(!(na.test($("input[id='email']").val()))){
					$(this).parent().siblings('ul').css('display','block');
					$(this).parent().siblings('ul').html("<img src='static/images/error.png'><span>请输入正确的邮箱地址！</span>")
					return false;
				}else if(na){
					var email=$("input[id='email']").val();
                    var obj=$(this).parent().siblings('ul');
                    $.ajax({
                        type: "get",
                        url: "/validateEmail",
                        data: {
                        	email: email
						},
                        success: function (data,status,xhr) {
                        	if(data['success']) {
                                if (data['exsit']) {
                                    obj.css('display', 'block');
                                    obj.html("<img src='static/images/error.png'><span>此邮箱账户不存在，请重新填写注册邮箱!</span>")
                                    return false
                                } else {
                                    obj.css('display', 'none');
                                    return true;
                                }
                            }
                        }
                    })
				}
			}else{
				$(this).parent().siblings('ul').css('display','block');
				$(this).parent().siblings('ul').html("<img src='static/images/error.png'><span>请填写邮箱！</span>")
				return false
			}
		}
		if($(this).is("input[id='loginverification']")){//登录模态框验证码判断
			var na=/^[A-Za-z0-9]{1,4}$/
			if($("input[id='loginverification']").val()!=""){
				if(!(na.test($("input[id='loginverification']").val()))){
					$(this).parent().siblings('ul').css('display','block');
					$(this).parent().siblings('ul').html("<img src='static/images/error.png'><span>请输入正确的验证码！</span>")
					return false;
				}else if(na){
					var verification=$("input[id='loginverification']").val();
                    var obj=$(this).parent().siblings('ul');
                    $.ajax({
                        type: "get",
                        url: "/validate_verification",
                        data: {verification: verification},
                        success: function (data,status,xhr) {
                        	if(data['success']) {
                                if (data['exsit']) {
                                    obj.css('display', 'none');
                                    return true;
                                } else {
                                    obj.css('display', 'block');
                                    obj.html("<img src='static/images/error.png'><span>验证码填写错误，请修改!</span>")
                                    return false
                                }
                            }
                        }
                    })
				}
			}else{
				$(this).parent().siblings('ul').css('display','block');
				$(this).parent().siblings('ul').html("<img src='static/images/error.png'><span>请填写验证码！</span>")
				return false
			}
		}
		if($(this).is("input[id='verification_code']")){//登陆页以及注册页验证码判断
			var na=/^[A-Za-z0-9]{1,4}$/
			if($("input[id='verification_code']").val()!=""){
				if(!(na.test($("input[id='verification_code']").val()))){
					$(this).siblings('ul').css('display','block');
					$(this).siblings('ul').html("<img src='static/images/error.png'><span>请输入正确的验证码！</span>")
					return false;
				}else if(na){
					var verification=$("input[id='verification_code']").val();
                    var obj=$(this).siblings('ul');
                    $.ajax({
                        type: "get",
                        url: "/validate_verification",
                        data: {verification: verification},
                        success: function (data,status,xhr) {
                        	if(data['success']) {
                                if (data['exsit']) {
                                    obj.css('display', 'none');
                                    return true;
                                } else {
                                    obj.css('display', 'block');
                                    obj.html("<img src='static/images/error.png'><span>验证码填写错误，请修改!</span>")
                                    return false
                                }
                            }
                        }
                    })
				}
			}else{
				$(this).siblings('ul').css('display','block');
				$(this).siblings('ul').html("<img src='static/images/error.png'><span>请填写验证码！</span>")
				return false
			}
		}
		if($(this).is("input[name='login_way']")){             //用户名或邮箱判断
			var na=/^[A-Za-z0-9]{1,20}$/
			var na2=/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
			if($("input[name='login_way']").val()!=""){
				if(!((na.test($("input[name='login_way']").val()))||na2.test($("input[name='login_way']").val()))){
					$(this).parent().siblings('ul').css('display','block');
					$(this).parent().siblings('ul').html("<img src='static/images/error.png'><span>用户名或邮箱不正确</span>")
					return false;
				}else if(na){
					var login_way=$("input[name='login_way']").val();
                    var obj=$(this).parent().siblings('ul');
                    $.ajax({
                        type: "get",
                        url: "/validate_login_way",
                        data: {login_way: login_way},
                        success: function (data,status,xhr) {
                            if(data['success']) {
                                if (data['exsit']) {
                                    obj.css('display', 'none');
									return true;
                                } else {
									obj.css('display', 'block');
                                    obj.html("<img src='static/images/error.png'><span>不存在此邮箱或者用户名!</span>")
									return false
                                }
                            }
                        }
                    })
				}
			}else{
				$(this).parent().siblings('ul').css('display','block');
				$(this).parent().siblings('ul').html("<img src='static/images/error.png'><span>请填写正确的用户名或邮箱！</span>")
				return false
			}
		}
		if($(this).is("input[name='nick']")){             //昵称判断
			var na=/^[\u4E00-\u9FA5A-Za-z0-9\S]{0,25}$/
			if(!(na.test($("input[name='nick']").val()))){
				$(this).siblings('ul').css('display','block');
				$(this).siblings('ul').html("<img src='static/images/error.png'><span>最大字数为25字！</span>")
				return false;
			}else if(na){
				$(this).siblings('ul').css('display','none');
				return true;
			}
		}
		if($(this).is("input[id='loginPassword']")){             //密码判断
			 var na = /^[A-Za-z0-9]{8,20}$/
			 if ($("input[id='loginPassword']").val()!=""){
				 if (!(na.test($("input[id='loginPassword']").val()))) {
					 $(this).parent().siblings('ul').css('display', 'block');
					 $(this).parent().siblings('ul').html("<img src='static/images/error.png'><span>密码必须为8-20位的数字与字母的组合！</span>")
					 return false;
				 } else if (na) {
					var password=$("input[id='loginPassword']").val();
					var login_way=$("input[name='login_way']").val();
					var obj=$(this).parent().siblings('ul');
					$.ajax({
						type: "get",
						url: "/validate_password",
						data: {
							password: password,
							login_way:login_way,
						},
						success: function (data,status,xhr) {
						   if(data['success']) {
							   if (data['exsit']) {
								   obj.css('display', 'none');
								   return true;
							   } else {
								   obj.css('display', 'block');
								   obj.html("<img src='static/images/error.png'><span>密码错误，请重新输入</span>")
								   return false
							   }
						   }
					   }
				   })
				 }
			 } else {
				 $(this).parent().siblings('ul').css('display', 'block');
				 $(this).parent().siblings('ul').html("<img src='static/images/error.png'><span>请填写密码！</span>")
				 return false
			 }
		}
		if($(this).is("input[id='inputPassword']")){             //密码判断
		 var na = /^[A-Za-z0-9]{8,20}$/
		 if ($("input[id='inputPassword']").val()!=""){
			 if (!(na.test($("input[id='inputPassword']").val()))) {
				 $(this).parent().siblings('ul').css('display', 'block');
				 $(this).parent().siblings('ul').html("<img src='static/images/error.png'><span>密码必须为8-20位的数字与字母的组合！</span>")
				 return false;
			 } else if (na) {
				var password=$("input[id='inputPassword']").val();
				var login_way=$("input[name='login_way']").val();
				var obj=$(this).parent().siblings('ul');
				$.ajax({
					type: "get",
					url: "/validate_password",
					data: {
						password: password,
						login_way:login_way,
					},
					success: function (data,status,xhr) {
					   if(data['success']) {
						   if (data['exsit']) {
							   obj.css('display', 'none');
							   return true;
						   } else {
							   obj.css('display', 'block');
							   obj.html("<img src='static/images/error.png'><span>密码错误，请重新输入</span>")
							   return false
						   }
					   }
					}
				})
			 }
		 } else {
			 $(this).parent().siblings('ul').css('display', 'block');
			 $(this).parent().siblings('ul').html("<img src='static/images/error.png'><span>请填写密码！</span>")
			 return false
		 }
		}
		if($(this).is("input[id='regisPassword']")){             //密码判断
		 var na = /^[A-Za-z0-9]{8,20}$/
		 if ($("input[id='regisPassword']").val()!=""){
			 if (!(na.test($("input[id='regisPassword']").val()))) {
				 $(this).parent().siblings('ul').css('display', 'block');
				 $(this).parent().siblings('ul').html("<img src='static/images/error.png'><span>密码必须为8-20位的数字与字母的组合！</span>")
				 return false;
			 } else if (na) {
				$(this).parent().siblings('ul').css('display','none');
				return true;
			 }
		 } else {
			 $(this).parent().siblings('ul').css('display', 'block');
			 $(this).parent().siblings('ul').html("<img src='static/images/error.png'><span>请填写密码！</span>")
			 return false
		 }
		}
		if($(this).is("input[name='password2']")){             //确认密码判断
			 if (($("input[name='password2']").val()) != ($("input[id='regisPassword']").val())) {
				 $(this).parent().siblings('ul').css('display', 'block');
				 $(this).parent().siblings('ul').html("<img src='static/images/error.png'><span>与之前输入的密码不符！</span>")
				 return false;
			 } else if ($("input[name='password2']").val() == "") {
				 $(this).parent().siblings('ul').css('display', 'block');
				 $(this).parent().siblings('ul').html("<img src='static/images/error.png'><span>请再次填写以确认密码！</span>")
				 return false;
			 } else {
				 $(this).parent().siblings('ul').css('display', 'none');
				 return true;
			 }
		 }
	});
	$("textarea").blur(function(){
		if($(this).is("textarea[name='describe']")){             //任务描述判断
			var na=/^[\u4E00-\u9FA5A-Za-z0-9\S\s]{1,1000}$/g;
			var na2=/^[\s]{0,}$/g;
			if($("textarea[name='describe']").val()!=""){
				if(!(na.test($("textarea[name='describe']").val()))){
					$(this).parent().siblings('ul').css('display','block');
					$(this).parent().siblings('ul').html("<img src='static/images/error.png'><span>最大字数为1000字！</span>")
					return false;
				}else if(!(na2.test($("textarea[name='describe']").val()))){
					$(this).parent().siblings('ul').css('display','none');
					return true;
				}else{
					$(this).parent().siblings('ul').css('display','block');
					$(this).parent().siblings('ul').html("<img src='static/images/error.png'><span>请输入非空字符串，认真填写描述！</span>")
				}
			}else{
				$(this).parent().siblings('ul').css('display','block');
				$(this).parent().siblings('ul').html("<img src='static/images/error.png'><span>请填写描述！</span>")
			}
		}
		if($(this).is("textarea[name='needs']")){             //技能要求判断
			var na=/^[\u4E00-\u9FA5A-Za-z0-9\S\s]{1,1000}$/g;
			var na2=/^[\s]{0,}$/g;
			if($("textarea[name='needs']").val()!=""){
				if(!(na.test($("textarea[name='needs']").val()))){
					$(this).parent().siblings('ul').css('display','block');
					$(this).parent().siblings('ul').html("<img src='static/images/error.png'><span>最大字数为1000字！</span>")
					return false;
				}else if(!(na2.test($("textarea[name='needs']").val()))){
					$(this).parent().siblings('ul').css('display','none');
					return true;
				}else{
					$(this).parent().siblings('ul').css('display','block');
					$(this).parent().siblings('ul').html("<img src='static/images/error.png'><span>请输入非空字符串，认真填写技能要求！</span>")
				}
			}else{
				$(this).parent().siblings('ul').css('display','block');
				$(this).parent().siblings('ul').html("<img src='static/images/error.png'><span>请填写技能要求！</span>")
			}
		}
		if($(this).is("textarea[name='experience']")){             //项目经验判断
			var na=/^[\u4E00-\u9FA5A-Za-z0-9\S\s]{1,1000}$/g;
			var na2=/^[\s]{0,}$/g;
			if($("textarea[name='experience']").val()!=""){
				if(!(na.test($("textarea[name='experience']").val()))){
					$(this).parent().siblings('ul').css('display','block');
					$(this).parent().siblings('ul').html("<img src='static/images/error.png'><span>最大字数为1000字！</span>")
					return false;
				}else if(!(na2.test($("textarea[name='experience']").val()))){
					$(this).parent().siblings('ul').css('display','none');
					return true;
				}else{
					$(this).parent().siblings('ul').css('display','block');
					$(this).parent().siblings('ul').html("<img src='static/images/error.png'><span>请输入非空字符串，认真填写项目经历！</span>")
				}
			}else{
				$(this).parent().siblings('ul').css('display','block');
				$(this).parent().siblings('ul').html("<img src='static/images/error.png'><span>请填写项目经历！</span>")
			}
		}
		if($(this).is("textarea[name='note']")){             //备注判断
			var na=/^[\u4E00-\u9FA5A-Za-z0-9\S\s]{0,200}$/g

			if(!(na.test($("textarea[name='note']").val()))){
				$(this).parent().siblings('ul').css('display','block');
				$(this).parent().siblings('ul').html("<img src='static/images/error.png'><span>最大字数为200字！</span>")
				return false;
			}else if(na){
				$(this).parent().siblings('ul').css('display','none');
				return true;
			}

		}
		if($(this).is("textarea[name='note2']")){             //备注判断
			var na=/^[\u4E00-\u9FA5A-Za-z0-9\S\s]{0,64}$/g

			if(!(na.test($("textarea[name='note2']").val()))){
				$(this).parent().siblings('ul').css('display','block');
				$(this).parent().siblings('ul').html("<img src='static/images/error.png'><span>最大字数为200字！</span>")
				return false;
			}else if(na){
				$(this).parent().siblings('ul').css('display','none');
				return true;
			}

		}
	});
	$('#verification_code').click(function() {
		changeCode()
	});
});
