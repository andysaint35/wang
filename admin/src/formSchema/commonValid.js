/**
 * Created by wangyang on 2018/12/21.
 */

const valid = {
  mobile: /^((13|14|15|17|18)[0-9]{1}\d{8})$/,
  //手机
  tel: /^(\d{3}-)(\d{8})$|^(\d{4}-)(\d{7})$|^(\d{4}-)(\d{8})$/,
  //电话
  email: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
};

function mobileCheck(value){
  value = value || '';
  return value.length === 11 && valid.mobile.test(value);
}

function emailCheck(value){
  value = value || '';
  return valid.email.test(value)
}


module.exports={
  mobileCheck,
  emailCheck
}