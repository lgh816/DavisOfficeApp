
import { getRootView } from "tns-core-modules/application"
import * as StoreJS from "~/store/store";

export const showDrawer = () => {
    let drawerNativeView = getRootView();
    if (drawerNativeView && drawerNativeView.showDrawer) {
        drawerNativeView.showDrawer();
    }
    
}

export const closeDrawer = () => {
    let drawerNativeView = getRootView();
    if (undefined == drawerNativeView.showDrawer) {
        drawerNativeView.showDrawer = true;
    }
    if (drawerNativeView && drawerNativeView.showDrawer) {
        drawerNativeView.closeDrawer();
    }
}

export const getDateFormat = (dateData) => {
    console.log
    var sDateFormat = "";
    if (dateData == null) {
        sDateFormat = "";
    }
    else {
        sDateFormat
        = dateData.getFullYear() + "-" + getzFormat(dateData.getMonth() + 1, 2) + "-" + getzFormat(dateData.getDate(), 2);
    }
    return sDateFormat;
}

export const getzFormat = (s, len) => {
    var sZero = "";
    s = s + "";
    if (s.length < len) {
        for (var i = 0; i < (len - s.length); i++) {
        sZero += "0";
        }
    }
    return sZero + s;
}

/* export const isSelectHoliday = (startDate) => {
    var isHoli = false; // true: 쉬는 날, false : 평일

    var start = new Date(startDate.substr(0, 4), startDate.substr(5, 2) - 1, startDate.substr(8, 2));

    var holidayInfos = this.options.holidayInfos;
    if (start.getDay() == 0 || start.getDay() == 6) {
        isHoli = true;
    } else {
        for (var j = 0; j < holidayInfos.length; j++) {
            var sDate = getDateFormat(start);
            if (holidayInfos[j].date == sDate) {
            isHoli = true;
            break;
            }
        }
    }
    return isHoli;
} */