export function formatDate(str) {


    var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);

    let s = [date.getFullYear(), mnth, day].join("-");
    // return s.split("-").reverse().join("-");
    return s;

}