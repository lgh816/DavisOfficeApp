import Vue from "nativescript-vue";
import Vuex from "vuex";
import axios from 'axios';
import { ChartAxisPlotMode } from "nativescript-ui-chart";

Vue.use(Vuex);

export default new Vuex.Store({
    state : { // 데이터
        // =================== Login, Logout =========================
        mobileUrl : 'http://200.100.1.140:8081',
        userInfo : {},
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
                if (payload[i].out_office_name == "공적휴가(종일)") {
                    payload[i].img = "~/images/icon/p_vacation_day.png"
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
            const searchResult = _.filter(state.orgCommuteList, { submit_id : payload} );
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
                var periodCnvt = '';
                text = payload[i].submit_dept_name;
                text += ' ' + payload[i].submit_name;
                if (payload[i].office_code_name == "연차휴가") {
                    payload[i].img = "~/images/icon/holiday.png"
                }
                if (payload[i].office_code_name == "오전반차") {
                    payload[i].img = "~/images/icon/holiday_morning.png"
                }
                if (payload[i].office_code_name == "오후반차") {
                    payload[i].img = "~/images/icon/holiday_afternoon.png"
                }
                if (payload[i].office_code_name == "파견") {
                    payload[i].img = "~/images/icon/dispatch.png"
                }
                if (payload[i].office_code_name == "휴일근무") {
                    payload[i].img = "~/images/icon/holiday_work.png"
                }
                if (payload[i].office_code_name == "장기외근") {
                    payload[i].img = "~/images/icon/working_away.png"
                }
                if (payload[i].office_code_name == "특별휴가") {
                    payload[i].img = "~/images/icon/special_holiday.png"
                }
                if (payload[i].office_code_name == "경조휴가") {
                    payload[i].img = "~/images/icon/c_vacation.png"
                }
                if (payload[i].office_code_name == "외근") {
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
            state.inOutList = payload;
        },

        initInOutData: (state) => {
            state.inOutList = [];
            state.inOutList =[{name : 'No Data'}]
        }
    },
    actions : { // axios를 사용하여 서버 통신
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
        getApprovalData: ({ state, commit }, payload) => {
            return axios.get(state.mobileUrl + '/mobile/approval/list', { params : payload }).then((res) => {
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