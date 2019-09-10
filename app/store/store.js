import Vue from "nativescript-vue";
import Vuex from "vuex";
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state : { // 데이터
        loginUrl : 'http://200.100.1.140:8081',
        userInfo : {},
        isLogin : false,
        failMsg : '',
        failMsgFlag : false
    },
    // getters : {}, // state를 화면에 바인딩
        
    mutations : { // state에 있는 데이터 세팅 또는 변이(수정, 가공) 하는 부분
        // 1. state : 쓰든 안쓰든 넣어줘야함(?).. 그래야 두번째 파라미터의 데이터를 받을수있음.
        // 2. payload : setUserInfo로 넘어오는 파라미터값. 
        //              관습적?으로 'payload'라는 단어를 사용함. 다른 명칭 써도 상관없음.
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
        }
    },
    actions : { // axios를 사용하여 서버 통신
        loginAction: ({ state, commit }, payload) => {
            return axios.put(state.loginUrl+'/mobile', payload).then((res) => {
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
        }
    }
});