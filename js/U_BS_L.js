Namespace.register("U.BS.L");//注册命名空间
U.BS.L.Init=function () {
    U.BS.L={};
    U.BS.L.a = $(".U_BS_L_a")[0];
    U.BS.L.p = $(".U_BS_L_p")[0];
    U.BS.L.pInfo = $(".U_BS_L_pInfo")[0];
    U.BS.L.submit = $(".U_BS_L_Submit")[0];
    U.BS.L.url = window.location.search;
    U.BS.L.Cd = "http://cd.1473.cn/net";//cd.1473
    U.BS.L.Db = "db.1473.cn";//db.1473
    U.BS.L.SqlName = "UseStudio_FeedBack";//数据库名
    U.UF.Cookie.del("usestudiosso");
    U.BS.L.Callback=function(data){
        console.log(data.url);
        window.location.href = data.url;
    }
    U.BS.L.Return=function(){
        if(window.event.keyCode == "13"){
            U.BS.L.submit.onclick();
        }else{
            return false;
        }
    }
    U.BS.L.Bind=function(){
        U.BS.L.submit.onclick=function(){
            U.UF.CD.loadAjaxCrossDomain(function () {
                U.A.Request(US.AUTH, ["UserLogin", U.BS.L.a.value,  U.BS.L.p.value],function(r){
                    if(r!=false){
                        var key = r;
                        U.A.Request(US.AUTH, ["GetUserLoginData", U.BS.L.a.value], function(r){
                            if(r.value!=false){
                                U.A.Request(U.BS.L.Cd,[U.BS.L.Db,U.BS.L.SqlName,"InsertUser",key.value[0].UserId,key.value[0].UserName],function (r){})
                                if(!U.BS.L.url){
                                    confirm("请在网址后面加地址,例如:http://login.1473.cn/?callback=http://feedback.1473.cn")
                                    return false;
                                }
                                U.BS.L.Callback({url:U.BS.L.url.substring(U.BS.L.url.lastIndexOf('=')+1, U.BS.L.url.length)});
                            }else{
                                U.BS.L.pInfo.innerText = "请输入正确的账号密码!"
                            }
                        })
                    }else{
                        return false;
                    }
                });
            });
        }
    }

    U.BS.L.Bind();
}();
