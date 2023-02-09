function msToTime(ms) {
    let d, h, m, s;

    s = Math.floor(ms / 1000);
    m = Math.floor(s / 60);
    s = s % 60;
    h = Math.floor(m / 60);
    m = m % 60;
    d = Math.floor(h / 24);
    h = h % 24;
    h += d * 24;

    const duration = h + "h " + m + "min";
    if (s < 10) {
      s = "0" + s;
    }
    const trackTime = m + ":" + s;
    let albumDuration = "";
    if (h > 0) {
      albumDuration = h + "h " + m + "min " + s + "sec";
    } else {
      albumDuration = m + "min " + s + "sec";
    }

    return [duration, trackTime, albumDuration];
  }

  export default msToTime
