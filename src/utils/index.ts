import moment from "moment-jalaali";

export const englishDigits = (text: string) => {
  const num: Record<string, string> = {
    "۰": "0",
    "۱": "1",
    "۲": "2",
    "۳": "3",
    "۴": "4",
    "۵": "5",
    "۶": "6",
    "۷": "7",
    "۸": "8",
    "۹": "9",
  };
  text = text.replace(/./g, function (c: string) {
    return num[c] || c;
  });
  return text;
};

export const persianDigits = (text: string) => {
  const num: Record<string, string> = {
    "0": "۰",
    "1": "۱",
    "2": "۲",
    "3": "۳",
    "4": "۴",
    "5": "۵",
    "6": "۶",
    "7": "۷",
    "8": "۸",
    "9": "۹",
  };
  text = text.replace(/./g, function (c: string) {
    return num[c] || c;
  });
  return text;
};

export const formatNumber = (value: string | null = null) => {
  if (value) {
    return `${value}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  return "";
};

export const removeCommas = (number?: string | number): number | undefined => {
  if (!number) return;

  let result = "" + number;
  if (result.indexOf(",") !== -1) {
    result = result.replace(/,\s?/g, "");
  }

  return parseInt(result, 10);
};

export const formatCardNumber = (value: string) => {
  return value.toString().replace(/(\d)(?=(\d{4})+(?!\d))/g, "$1-");
};

export const formatExpirationDate = (value: string) => {
  let v: Array<string> = value ? value.split("").filter((n) => n !== "/") : [];
  let result = value;
  if (v.length > 3) {
    const year = v[0] + v[1];
    const month = v[2] + v[3];
    if (Number(month) < 13) {
      result = `${year}/${month}`;
    } else {
      result = `${year}/12`;
    }
  }
  return result;
};

export const debounce = (callback: any, delay = 4000) => {
  let timeoutId: any;
  return (...args: any) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      timeoutId = null;
      callback(...args);
    }, delay);
  };
};

export const jalaliDate = (value: string) => {
  const date = moment(value);
  return `${date.jYear()}/${date.jMonth()}/${date.jDate()}`;
};

export const convertEpotchToDate = (date: number) => {
  var d = new Date(date);
  const convertDate =
    d.getFullYear() +
    "-" +
    ("00" + (d.getMonth() + 1)).slice(-2) +
    "-" +
    ("00" + d.getDate()).slice(-2) +
    " " +
    ("00" + d.getHours()).slice(-2) +
    ":" +
    ("00" + d.getMinutes()).slice(-2);
  const formatedDate = moment(convertDate, "YYYY-M-D HH:mm:ss").format(
    "jYYYY/jM/jD HH:mm"
  );
  return formatedDate;
};
