import Vue from "nativescript-vue";
import Vuex from "vuex";
import axios from 'axios';
import * as Https from 'nativescript-https';
import * as utils from "~/service/utils/utils";

Vue.use(Vuex);

export default new Vuex.Store({
    state : { // 데이터
        // =================== Login, Logout =========================
        // mobileUrl : 'http://200.100.1.140:8081',
        // mobileUrl : 'https://office.yescnc.co.kr',
        // mobileUrl : 'https://1.234.23.69:443',
        mobileUrl : 'http://200.100.1.209:18443',
        userInfo : {},
        holidayList : [],
        isLogin : false,
        failMsg : '',
        failMsgFlag : false,
        // ======================= Dashboard =========================
        dashboardSummary : {},
        summaryResult : [],
        // ======================= 근태 현황 =========================
        commuteList : [],
        orgCommuteList : [],
        // ======================= 결재 현황 =========================
        approvalAllList : [],
        approvalGubunList : [],
        selectedGubunData : {},
        approvalVacationList : {},
        approvalManager: '',
        //approvalUserList : [],
        // ======================= 결재 상신 팝업 ====================
        towDatePicker : true,
        oneDatePicker : false,
        leftDateArea : true,
        requestDateArea : true,
        outOfficePicker : false,
        approvalFromDay : '',
        approvalToDay : '',
        approvalData : {
            day_count : 1,
            decide_comment : '',
            doc_num : '',
            start_date : '',
            end_date : '',
            start_time : '',
            end_time : '',
            submit_id : '',
            submit_comment : '',
            manager_id : '',
            office_code : '',
            date_validate : true
        },
        // ======================= 출입 기록 =========================
        inOutList : []
    },
    // getters : {}, // state를 화면에 바인딩
        
    mutations : { // state에 있는 데이터 세팅 또는 변이(수정, 가공) 하는 부분
        // 1. state : 쓰든 안쓰든 넣어줘야함(?).. 그래야 두번째 파라미터의 데이터를 받을수있음.
        // 2. payload : setUserInfo로 넘어오는 파라미터값. 
        //              관습적?으로 'payload'라는 단어를 사용함. 다른 명칭 써도 상관없음.
        // =================== Login, Logout =========================
        initUserInfo: (state) => {
            state.userInfo = {};
            state.isLogin = false;
        },

        initFailMsg: (state) => {
            state.failMsg = '';
            state.failMsgFlag = false;
        },

        setUserInfo: (state, payload) => {
            state.userInfo = payload.user;
            state.isLogin = payload.isLogin;
        },

        loginFail: (state, payload) => {
            state.failMsg = payload.msg;
            state.failMsgFlag = true;
            state.isLogin = payload.isLogin;
        },
        
        setHolidayList: (state, payload) => {
            state.holidayList = [];
            state.holidayList = payload;
        },

        initHolidayList: (state) => {
            state.holidayList = [];
        },

        // ======================= Dashboard =========================
        setDashboardSummary: (state, payload) => {
            state.dashboardSummary = {};
            state.summaryResult = [];

            state.dashboardSummary = payload;
            state.summaryResult.push({text : payload.vacation_year + " 잔여 연차", data :  payload.vacation_year_remain});
            if (!_.isUndefined(payload.in_time_avg)) {
                state.summaryResult.push({text : "평균 출근 시간", data : payload.in_time_avg.substr(0,5)});
            }
            if (!_.isUndefined(payload.out_time_avg)) {
                state.summaryResult.push({text : "평균 퇴근 시간", data : payload.out_time_avg.substr(0,5)});
            }
            if (payload.perception > 0) {
                state.summaryResult.push({text : "지각", data : payload.perception + "일"});
            }
            if (payload.sick_leave > 0) {
                state.summaryResult.push({text : "조퇴", data : payload.sick_leave + "일"});
            }
            if (payload.absenteeism > 0) {
                state.summaryResult.push({text : "결근", data : payload.absenteeism + "일"});
            }
            if (payload.vacation > 0) {
                state.summaryResult.push({text : "휴가", data : payload.vacation + "일"});
            }
            if (payload.night_working_a > 0) {
                state.summaryResult.push({text : "야근 A", data : payload.night_working_a + "일"});
            }
            if (payload.night_working_b > 0) {
                state.summaryResult.push({text : "야근 B", data : payload.night_working_b + "일"});
            }
            if (payload.night_working_c > 0) {
                state.summaryResult.push({text : "야근 C", data : payload.night_working_c + "일"});
            }

        },
        initDashboardSummary: (state) => {
            state.dashboardSummary = {};
            state.summaryResult = [];
        },

        // ======================= 근태 현황 =========================
        setCommuteData: (state, payload) => {
            state.commuteList = [];
            state.orgCommuteList = [];
            for (var i = 0; i < payload.length; i++) {
                var text = '';
                text = payload[i].dept_name;
                text += ' ' + payload[i].name;
                /* text = payload[i].name;
                text += ' / ' + payload[i].out_office_name; */
                /* if (!_.isEmpty(payload[i].start_time)) {
                    text += ' / ' + payload[i].start_time;
                }
                if (!_.isEmpty(payload[i].end_time)) {
                    text += ' ~ ' + payload[i].end_time;
                } */
                if (payload[i].out_office_name == "연차휴가") {
                    payload[i].img = "~/images/icon/holiday.png"
                }
                if (payload[i].out_office_name == "오전반차") {
                    payload[i].img = "~/images/icon/holiday_morning.png"
                }
                if (payload[i].out_office_name == "오후반차") {
                    payload[i].img = "~/images/icon/holiday_afternoon.png"
                }
                if (payload[i].out_office_name == "파견") {
                    payload[i].img = "~/images/icon/dispatch.png"
                }
                if (payload[i].out_office_name == "경조휴가") {
                    payload[i].img = "~/images/icon/c_vacation.png"
                }
                if (payload[i].out_office_name == "교육") {
                    payload[i].img = "~/images/icon/education.png"
                }
                if (payload[i].out_office_name == "출장") {
                    payload[i].img = "~/images/icon/business_trip.png"
                }
                if (payload[i].out_office_name == "공적휴가(종일)") {
                    payload[i].img = "~/images/icon/p_vacation_day.png"
                }
                if (payload[i].out_office_name == "공적휴가(오전)") {
                    payload[i].img = "~/images/icon/p_vacation_morning.png"
                }
                if (payload[i].out_office_name == "공적휴가(오후)") {
                    payload[i].img = "~/images/icon/p_vacation_afternoon.png"
                }
                if (payload[i].out_office_name == "휴일근무") {
                    payload[i].img = "~/images/icon/holiday_work.png"
                }
                if (payload[i].out_office_name == "특별휴가") {
                    payload[i].img = "~/images/icon/special_holiday.png"
                }
                if (payload[i].out_office_name == "장기외근") {
                    payload[i].img = "~/images/icon/working_away.png"
                }
                if (payload[i].out_office_name == "외근") {
                    payload[i].img = "~/images/icon/outdoor_service.png"
                    var outOfficeTime = '';
                    if (!_.isEmpty(payload[i].start_time)) {
                        outOfficeTime = payload[i].start_time;
                    }
                    if (!_.isEmpty(payload[i].end_time)) {
                        outOfficeTime += ' ~ ' + payload[i].end_time;
                    }
                    payload[i].outOfficeTime = outOfficeTime;
                }
                payload[i].text = text;
                state.commuteList.push(payload[i]);
                state.orgCommuteList.push(payload[i]);
            }
        },
        initCommuteData: (state) => {
            state.commuteList = [];
            state.orgCommuteList = [];
            state.commuteList = [{text : 'No Data'}];
        },
        searchCommuteData: (state, payload) => {
            if (state.commuteList.text == 'No Data') {
                return;
            }
            const searchResult = _.filter(state.orgCommuteList, { name : payload} );
            state.commuteList = [];
            if (searchResult.length == 0) {
                state.commuteList = [{text : 'No Data'}];
            } else {
                state.commuteList = searchResult;
            }
        },
        searchInitCommuteData: (state) => {
            state.commuteList = [];
            state.commuteList = state.orgCommuteList
        },

        // ======================= 결재 현황 =========================
        setApprovalData: (state, payload) => {
            state.approvalAllList = [];
            //state.approvalUserList = [];
            for (var i = 0; i < payload.length; i++) {
                var text = '';
                var blackMarkText = '';
                if (payload[i].office_code != 'O01') {
                    switch (payload[i].black_mark) {
                        case '1':
                            payload[i].black_mark_text = "정상";
                            break;
                        case '2':
                            payload[i].black_mark_text = "당일결재";
                            break;
                        case '3':
                            payload[i].black_mark_text = "익일결재";
                            break;
                        case '4':
                            payload[i].black_mark_text = "당일상신";
                            break;
                        case '5':
                            payload[i].black_mark_text = "익일상신";
                            break;
                        default:
                            payload[i].black_mark_text = "";
                    }
                }
                var periodCnvt = '';
                text = payload[i].submit_dept_name;
                text += ' ' + payload[i].submit_name;
                if (payload[i].office_code == "V01") { // 연차휴가
                    payload[i].img = "~/images/icon/holiday.png"
                }
                if (payload[i].office_code == "V02") { // 오전반차
                    payload[i].img = "~/images/icon/holiday_morning.png"
                }
                if (payload[i].office_code == "V03") { // 오후반차
                    payload[i].img = "~/images/icon/holiday_afternoon.png"
                }
                if (payload[i].office_code == "W04") { // 파견
                    payload[i].img = "~/images/icon/dispatch.png"
                }
                if (payload[i].office_code == "B01") { // 휴일근무
                    payload[i].img = "~/images/icon/holiday_work.png"
                }
                if (payload[i].office_code == "W03") { // 장기외근
                    payload[i].img = "~/images/icon/working_away.png"
                }
                if (payload[i].office_code == "V06") { // 특별휴가
                    payload[i].img = "~/images/icon/special_holiday.png"
                }
                if (payload[i].office_code == "V04") { // 경조휴가
                    payload[i].img = "~/images/icon/c_vacation.png"
                }
                if (payload[i].office_code == "E01") { // 교육
                    payload[i].img = "~/images/icon/education.png"
                }
                if (payload[i].office_code == "W02") { // 출장
                    payload[i].img = "~/images/icon/business_trip.png"
                }
                if (payload[i].office_code == "V07") { // 공적휴가(오전)
                    payload[i].img = "~/images/icon/p_vacation_morning.png"
                }
                if (payload[i].office_code == "V05") { // 공적휴가(종일)
                    payload[i].img = "~/images/icon/p_vacation_day.png"
                }
                if (payload[i].office_code == "V08") { // 공적휴가(오후)
                    payload[i].img = "~/images/icon/p_vacation_afternoon.png"
                }
                if (payload[i].office_code == "W01") { // 외근
                    payload[i].img = "~/images/icon/outdoor_service.png"
                    var outOfficeTime = '';
                    if (!_.isEmpty(payload[i].start_time)) {
                        outOfficeTime = payload[i].start_time;
                    }
                    if (!_.isEmpty(payload[i].end_time)) {
                        outOfficeTime += ' ~ ' + payload[i].end_time;
                    }
                    payload[i].outOfficeTime = outOfficeTime;
                }
                if (payload[i].office_code_name == "초과근무") {
                    payload[i].img = "~/images/icon/overtime.png"
                }
                if (payload[i].start_date == payload[i].end_date) {
                    periodCnvt = payload[i].start_date;
                } else {
                    periodCnvt = payload[i].start_date + " ~ " + payload[i].end_date;
                }
                payload[i].periodCnvt = periodCnvt;
                payload[i].text = text;
                state.approvalAllList.push(payload[i]);
            }
        },

        initApprovalData: (state) => {
            state.approvalAllList = [];
            //state.approvalUserList = [];
        },

        initApprovalPopup: (state) => {
            state.towDatePicker = true;
            state.oneDatePicker = false;
            state.leftDateArea = true;
            state.requestDateArea = true;
            state.outOfficePicker = false;
            state.approvalData = {
                day_count : 1,
                decide_comment : '',
                doc_num : '',
                start_date : '',
                end_date : '',
                start_time : '',
                end_time : '',
                submit_id : '',
                submit_comment : '',
                manager_id : '',
                office_code : '',
                date_validate : true
            }
        },

        setApprovalGubunList: (state, payload) => {
            state.approvalGubunList = [];
            var userAffiliated = state.userInfo.affiliated;
            var arrGubunData = _.sortBy(payload, function(obj) {
                return obj.code.slice(0, 2) + obj.name;
            });
            for (var i = 0;  i < arrGubunData.length; i++) {
                var code = arrGubunData[i].code;
                if (code.length == 3 && code != "O01") {
                    if (userAffiliated != 0 && code != "B01") {
                        state.approvalGubunList.push(arrGubunData[i]);
                    }
                    if (userAffiliated == 0) {
                        state.approvalGubunList.push(arrGubunData[i]);
                    }
                    if (code == "V01") {
                        state.selectedGubunData = arrGubunData[i];
                    }
                }
            }
        },

        getRequestDateCount: (state) => {
            var sStart = state.approvalData.start_date;
            var sEnd = state.approvalData.end_date;

            var start = new Date(sStart.substr(0, 4), sStart.substr(5, 2) - 1, sStart.substr(8, 2));
            var end = new Date(sEnd.substr(0, 4), sEnd.substr(5, 2) - 1, sEnd.substr(8, 2));
            var day = 1000 * 60 * 60 * 24;

            var compareVal = parseInt((end - start) / day);
            var arrInsertDate = [];
            var holidayInfos = state.holidayList;
            if (compareVal >= 0) {
                // 차이
                for (var i = 0; i <= compareVal; i++) {
                    var dt = start.valueOf() + (i * day);
                    var resDate = new Date(dt);
                    if (resDate.getDay() != 0 && resDate.getDay() != 6) {
                        // 주말이 아닌 날짜
                        var isPush = true;
                        for (var j = 0; j < holidayInfos.length; j++) {
                            var sDate = utils.getDateFormat(resDate);
                            if (holidayInfos[j].date == sDate) {
                                isPush = false;
                                break;
                            }
                        }
                        if (isPush) {
                            arrInsertDate.push(sDate);
                        }
                    }
                }
            } else {
                if (start.getDay() != 0 && start.getDay() != 6) {
                // 주말이 아닌 날짜
                    for (var k = 0; k < holidayInfos.length; k++) {
                        if (holidayInfos[k].date != sStart) {
                            arrInsertDate.push(sStart);
                            break;
                        }
                    }
                }   
            }
            state.approvalData.day_count = arrInsertDate.length;
        },

        initApprovalGubunList: (state) => {
            state.approvalGubunList = [];
        },

        setApprovalVacationList: (state, payload) => {
            state.approvalVacationList = {};
            state.approvalVacationList = payload[0];
            var usableVacation = payload[0].total_day - payload[0].used_holiday - payload[0].approval_count;
            state.approvalVacationList.usable_count = usableVacation;
        },

        initApprovalVacationList: (state) => {
            state.approvalVacationList = {};
        },

        setApprovalManager: (state, payload) => {
            state.approvalManager = '';
            state.approvalManager = payload[0].approval_name;
        },

        initApprovalManager: (state) => {
            state.approvalManager = '';
        },

        // ======================= 출입 기록 =========================
        setInOutData: (state, payload) => {
            state.inOutList = [];
            for (var i = 0; i < payload.length; i++) {
                var text = '';
                text = payload[i].department;
                text += ' ' + payload[i].name;
                payload[i].text = text;
            }
            /* payload.sort(function(a, b) {
                a = new Date(a.char_date);
                b = new Date(a.char_date);
                return a > b ? 1 : a < b ? -1 : 0;
            }); */
            state.inOutList = payload;
        },

        initInOutData: (state) => {
            state.inOutList = [];
            state.inOutList =[{text : 'No Data'}]
        }
    },
    actions : { // axios를 사용하여 서버 통신
        // =================== 최신 App 버전 조회 =====================
        getApplicationVersion: ({ state, commit }) => {
            return axios.get(state.mobileUrl + '/mobile/mobileVersion').then((res) => {
                var result = res.data.version;
                console.log("GET VERSION = "+result);
                return result;
            }).catch((res) => {
                console.log("GET VERSION ERROR= "+res);
                return '';
            })

            /* return Https.request({
                url : state.mobileUrl + '/mobile/mobileVersion',
                method : 'GET'
            }).then(function(response) {
                console.log("GET VERSION = "+response);
            }).catch((res) => {
                console.log("GET VERSION Error = "+res);
            }) */

            /* HttpModule.getJSON(state.mobileUrl + '/mobile/mobileVersion').then((result) => {
                // var result = res.data.version;
                console.log(result)
                // return result;
            }, (e) => {
                return '';
            }); */
        },

        // =================== Login, Logout =========================
        loginAction: ({ state, commit }, payload) => {
            return axios.put(state.mobileUrl + '/mobile', payload).then((res) => {
                var result = res.data.isLogin;
                if (result) {
                    commit('setUserInfo', res.data);
                } else {
                    commit('loginFail', res.data);
                }
                return result;
            }).catch((res) => {
                commit('loginFail', res.data);
                return false;
            })
        },

        getHolidayList: ({ state, commit }, payload) => {
            return axios.get(state.mobileUrl + '/mobile/holiday', { params : payload }).then((res) => {
                var result = res.data.length;
                if (result > 0) {
                    commit('setHolidayList', res.data);
                } else {
                    commit('initHolidayList');
                }
            }).catch(() => {
                commit('initHolidayList');
            });
        },

        logoutAction: ({ state, commit }) => {
            return axios.delete(state.mobileUrl + '/mobile').then((res) => {
                return true;
            })
        },
        
        // ======================= Dashboard =========================
        getDashboardSummary: ({ state, commit }, payload) => {
            payload.id = state.userInfo.id;
            return axios.post(state.mobileUrl + '/mobile/dashboard/summary', payload).then((res) => {
                var result = res.data.length;
                if(result > 0) {
                    commit('setDashboardSummary', res.data[0]);
                } else {
                    commit('initDashboardSummary');
                }
                return true;
            }).catch((res) => {
                commit('initDashboardSummary');
                return false;
            });
        },

        // ======================= 근태 현황 =========================
        getCommuteData: ({ state, commit }, payload) => {
            return axios.post(state.mobileUrl + '/mobile/commute/today', payload).then((res) => {
                var result = res.data.length;
                if (result > 0) {
                    commit('setCommuteData', res.data);
                } else {
                    commit('initCommuteData');
                }
                // return true;
            }).catch((res) => {
                commit('initCommuteData');
                // return false;
            });
        },

        // ======================= 결재 현황 =========================
        getApprovalData: ({ state, commit }) => {
            var param = {};
            param.startDate = state.approvalFromDay;
            param.endDate = state.approvalToDay;
            return axios.get(state.mobileUrl + '/mobile/approval/list', { params : param }).then((res) => {
                var result = res.data.length;
                if (result > 0) {
                    commit('setApprovalData', res.data);
                } else {
                    commit('initApprovalData');
                }
            }).catch((res) => {
                commit('initApprovalData');
            });
        },

        getGubunData: ({ state, commit }) => {
            return axios.get(state.mobileUrl + '/mobile/approval/vacation/gubunList').then((res) => {
                var result = res.data.length;
                if (result > 0) {
                    commit('setApprovalGubunList', res.data);
                } else {
                    commit('initApprovalGubunList');
                }
                return true;
            }).catch((res) => {
                commit('initApprovalGubunList');
            });
        },

        getApprovalVacationList: ({ state, commit }, payload) => {
            payload.id = state.userInfo.id;
            return axios.get(state.mobileUrl + '/mobile/approval/vacation/list', { params : payload }).then((res) => {
                var result = res.data.length;
                if (result > 0) {
                    commit('setApprovalVacationList', res.data);
                } else {
                    commit('initApprovalVacationList');
                }
                return true;
            }).catch((res) => {
                commit('initApprovalVacationList');
            });
        },

        getApprovalManager: ({ state, commit }) => {
            var param = {};
            param.id = state.userInfo.id;
            return axios.get(state.mobileUrl + '/mobile/approval/manager', { params : param }).then((res) => {
                var result = res.data.length;
                if (result > 0) {
                    commit('setApprovalManager', res.data);
                } else {
                    commit('initApprovalManager');
                }
                return true;
            }).catch((res) => {
                commit('initApprovalManager');
            });
        },

        getApprovalPopupData: ({ state, commit }, payload) => {
            return axios.get(state.mobileUrl + '/mobile/approval/vacation/gubunList').then((res) => {
                var result = res.data.length;
                if (result > 0) {
                    commit('setApprovalGubunList', res.data);
                } else {
                    commit('initApprovalGubunList');
                }
                payload.id = state.userInfo.id;
                axios.get(state.mobileUrl + '/mobile/approval/vacation/list', { params : payload }).then((res) => {
                    var result = res.data.length;
                    if (result > 0) {
                        commit('setApprovalVacationList', res.data);
                    } else {
                        commit('initApprovalVacationList');
                    }
                    var param = {};
                    param.id = state.userInfo.id;
                    axios.get(state.mobileUrl + '/mobile/approval/manager', { params : param }).then((res) => {
                        var result = res.data.length;
                        if (result > 0) {
                            commit('setApprovalManager', res.data);
                        } else {
                            commit('initApprovalManager');
                        }
                    }).catch((res) => {
                        commit('initApprovalManager');
                    });
                }).catch((res) => {
                    commit('initApprovalVacationList');
                });
            }).catch((res) => {
                commit('initApprovalGubunList');
            });
        },

        saveApprovalProcess: ({ state, commit }, payload) => {
            return axios.get(state.mobileUrl + '/mobile/approval/appIndex', { params : payload }).then((res) => {
                var result = res.data;
                if (result.length > 0) {
                    var newParam = {};
                    newParam.seq = result[0].maxSeq;
                    newParam.yearmonth = payload.yearmonth;

                    return axios.post(state.mobileUrl + '/mobile/approval/appIndex/add', newParam).then((res) => {
                        if (res.data.success) {
                            var paramData = JSON.parse(res.config.data);
                            var seqData = paramData.seq;
                            var yearMonthData = paramData.yearmonth;
                            seqData = (seqData == null) ? 1 : seqData + 1;
                            var doc_num = yearMonthData + "-" + utils.getzFormat(seqData, 3);
                            state.approvalData.doc_num = doc_num;
                            state.approvalData.manager_id = state.userInfo.approval_id;
                            state.approvalData.office_code = state.selectedGubunData.code;
                            state.approvalData.submit_id = state.userInfo.id;
                            return axios.post(state.mobileUrl + '/mobile/approval', state.approvalData).then((res) => {
                                return res.data;
                            });
                        }
                    });
                }
            })
        },

        cancelApprovalProcess: ({ state, commit }, payload) => {
            var param = {doc_num : payload.doc_num};
            return axios.get(state.mobileUrl + '/approval/info', { params : param }).then((res) => {
                var result = res.data;
                if (result.length > 0) {
                    result[0]._id = payload.doc_num;
                    result[0].state = payload.stateVal;
                    var newParam = {};
                    newParam.data = result;
                    newParam._id = payload.doc_num;
                    return axios.put(state.mobileUrl + '/approval/bulk', newParam).then((res) => {
                        return res.data;
                    });
                }
            });
        },

        // ======================= 출입 기록 =========================
        getInOutData: ({ state, commit }, payload) => {
            return axios.get(state.mobileUrl + '/mobile/inout/list', { params : payload }).then((res) => {
                var result = res.data.length;
                if (result > 0) {
                    commit('setInOutData', res.data);
                } else {
                    commit('initInOutData');
                }
            }).catch((res) => {
                commit('initInOutData');
            });
        }
    }
});