/* eslint-disable */

export const isEmail = (email) => {
  const emailRegex =
    /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

  return emailRegex.test(email);
};

export const isPhoneNumber = (phone) => {
  const phoneRegex = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
  return phoneRegex.test(phone);
};

export const isAuthNumber = (num) => {
  const authNumRegex = /\d{4}$/;
  return authNumRegex.test(num);
};

export const isMbti = (mbti) => {
  const mbtiRegex = /(E|I)(S|N)(F|T)(J|P)$/i;
  return mbtiRegex.test(mbti);
};

export const isPassword = (pw) => {
  const passwordRegex =
    /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
  return passwordRegex.test(pw);
};

export const isNickname = (name) => {
  const nameRegex = /^[a-z0-9_.]{2,10}$/;
  return nameRegex.test(name);
};
