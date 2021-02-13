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

export const shadeColor = (color: string, percent: number): string => {
  var R = parseInt(color.substring(1, 3), 16);
  var G = parseInt(color.substring(3, 5), 16);
  var B = parseInt(color.substring(5, 7), 16);

  R = parseInt(`${(R * (100 + percent)) / 100}`);
  G = parseInt(`${(G * (100 + percent)) / 100}`);
  B = parseInt(`${(B * (100 + percent)) / 100}`);

  R = R < 255 ? R : 255;
  G = G < 255 ? G : 255;
  B = B < 255 ? B : 255;

  var RR = R.toString(16).length == 1 ? "0" + R.toString(16) : R.toString(16);
  var GG = G.toString(16).length == 1 ? "0" + G.toString(16) : G.toString(16);
  var BB = B.toString(16).length == 1 ? "0" + B.toString(16) : B.toString(16);

  return "#" + RR + GG + BB;
};

export const getTwoYearsDate = () => {
  let thisMonth = moment().format("jYYYY/jM").slice(5);
  let twoYearsAgo = (moment().jYear() - 2).toString().slice(2, 4);
  let oneYearsAgo = (moment().jYear() - 1).toString().slice(2, 4);
  let thisYear = moment().jYear().toString().slice(2, 4);
  let data: any = [];

  for (let year = Number(twoYearsAgo); year <= Number(thisYear); year++) {
    for (
      let month =
        year === Number(oneYearsAgo) || year === Number(thisYear)
          ? 1
          : Number(thisMonth);
      month <= (year === Number(thisYear) ? Number(thisMonth) : 12);
      month++
    ) {
      let convertToString = {
        year: year.toString(),
        month: month.toString()
      }
      data.push(convertToString);
    }
  }
  return data;
};