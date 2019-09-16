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
        commuteList : []
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
            state.summaryResult.push({text : "평균 출근 시간", data : payload.in_time_avg.substr(0,5)});
            state.summaryResult.push({text : "평균 퇴근 시간", data : payload.out_time_avg.substr(0,5)});
            if (payload.sick_leave > 0) {
                state.summaryResult.push({text : "조퇴", data : payload.sick_leave + "일"});
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
            if (payload.absenteeism > 0) {
                state.summaryResult.push({text : "결근", data : payload.absenteeism + "일"});
            }

        },
        initDashboardSummary: (state) => {
            state.dashboardSummary = {};
            state.summaryResult = [];
        },

        // ======================= 근태 현황 =========================
        setCommuteData: (state, payload) => {
            state.commuteList = [];
            for (var i = 0; i < payload.length; i++) {
                var text = '';
                text = payload[i].name;
                text += ' / ' + payload[i].out_office_name;
                if (!_.isEmpty(payload[i].start_time)) {
                    text += ' / ' + payload[i].start_time;
                }
                if (!_.isEmpty(payload[i].end_time)) {
                    text += ' ~ ' + payload[i].end_time;
                }
                payload[i].text = text;
                state.commuteList.push(payload[i]);
            }
        },
        initCommuteData: (state) => {
            state.commuteList = [];
            state.commuteList =[{text : 'No Data'}]
        },

        // ======================= 결재 현황 =========================
        setApprovalData: (state, payload) => {

        },

        initApprovalData: (state) => {

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
            return axios.post(state.mobileUrl + '/mobile/approval/list', payload).then((res) => {
                var result = res.data.length;
                if (result > 0) {
                    commit('setApprovalData', res.data);
                } else {
                    commit('initApprovalData');
                }
            }).catch((res) => {
                commit('initApprovalData');
            });
        }
    }
});