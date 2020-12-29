 function commonParams() {
  return {
    title: document.title,
    href: location.href
  }
}
/**
 * 注册模块
 * 
 * 
 * 
 */
function moduleLogin() {
  var commonParams = commonParams();
  $('body').on('click','[data-sensors-login]',function(){
    sensors.register.loginButtonClick(commonParams.title);
  })
}

/**
 * 登录模块
 * 
 * 
 */

function moduleRegister() {
  var commonParams = commonParams();
  $('body').on("click",'[data-sensors-register]',function() {
    sensors.register.registerButtonClick(commonParams.title);
  })
}