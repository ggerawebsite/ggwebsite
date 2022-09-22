module.exports.timeToHours = (t) => {
    let [hrs, mins] = t.split(' ');
    hrs = +hrs.replace('h', '');
    mins = +mins.replace('m', '');
    return (mins / 60) + hrs
}