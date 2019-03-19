/**
 * @param  {String} url
 * @param  {} data={}
 * @param  {} method="get"
 * @param  {} sucCb
 * @param  {} error
 */
function myReq(url,data={},method="get",sucCb=()=>{},errCb=()=>{}){
    data = data || {};
    method = method || "get";
    var loading = layer.load(1);
    $.ajax({
        url:url,
        method,
        data:data,
        success:function(res){
            if(res.res!=0){
                typeof sucCb == "function" && sucCb(res)
            }else{
                layer.alert(res.msg);   
            }
        },
        error:function(e){
            console.log(e);
            typeof errCb == "function" && errCb();
            layer.alert('网络请求错误!', {icon: 2});
        },
        complete:function(){
          layer.close(loading); 
        }
    })
}