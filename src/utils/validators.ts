export const validatePhone = (str: string) =>
  /((^09)|(^989)|(^\+989)|(^00989))[0-9]{9}$/.test(str);

export const validateUserName = (str: string) =>
  /^[a-zA-Z0-9$@$!%*?&#-^-_. +]+$/.test(str);

export const validateNationalId = (code: string) => {
  var L = code.length;

  if (L < 8 || parseInt(code, 10) == 0) return false;
  code = ("0000" + code).substr(L + 4 - 10);
  if (parseInt(code.substr(3, 6), 10) == 0) return false;
  var c = parseInt(code.substr(9, 1), 10);
  var s = 0;
  for (var i = 0; i < 9; i++) s += parseInt(code.substr(i, 1), 10) * (10 - i);
  s = s % 11;
  return (s < 2 && c == s) || (s >= 2 && c == 11 - s);
  return true;
};

export const checkBothCases = (str: string) => {
  if (str && str.match(/[A-Z]/) && str.match(/[a-z]/)) return true;
  return false;
};

export const checkHasNumber = (str: string) => {
  if (str.match(/[0-9]/)) return true;
  return false;
};

export const handleUsernameValidator = (
  value: string,
  setError: (t: any) => void
) => {
  const username = value.trim();
  if (
    username.length > 0 &&
    (!validateUserName(username) || checkHasNumber(username[0]))
  ) {
    setError({
      field: "username",
      message: "نام کاربری باید با حروف انگلیسی باشد و با عدد شروع نشود.",
    });
    return false;
  }
  return true;
};
