export function transformTime(time) {
  const [hh, mm, ss] = time.split(":");
  return Number(hh * 3600) + Number(mm * 60) + Number(ss);
}

export function transformSeconds(seconds) {
  const hh = Math.floor(seconds / 3600);
  const mm = Math.floor((seconds - hh * 3600) / 60);
  const ss = seconds - hh * 3600 - mm * 60;

  return `${hh > 9 ? hh : `0${hh}`}:${mm > 9 ? mm : `0${mm}`}:${
    ss > 9 ? ss : `0${ss}`
  }`;
}
