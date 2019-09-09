import Vue from "nativescript-vue";
import Vuex from "vuex";
import axios from 'axios';

Vue.use(Vuex);

export const loginStore = new Vuex.Store({
    state : { // 데이터
        loginUrl : 'http://200.100.1.140:8081/mobile',
        userInfo : {
            userId : null,
            isAttend : false,
        }
    },
    getters : { // state를 화면에 바인딩
        countOfUser : state => {
            return state.userCount++;
        }
    },
    mutations : { // state에 있는 데이터를 변이(수정, 가공) 하는 부분
        // 1. state : 쓰든 안쓰든 넣어줘야함. 그래야 두번째 파라미터의 데이터를 받을수있음.
        // 2. payload : setUserInfo로 넘어오는 파라미터값. 
        //              관습적?으로 'payload'라는 단어를 사용함. 다른 명칭 써도 상관없음.
        loginSuccess: (state, payload) => {
            state.userInfo.userId = payload.id;
            state.userInfo.isAttend = payload.isAttend;
        },

        loginFail: (state, payload) => {

        }
    },
    actions : { // axios를 사용하여 서버 통신에 사용
        loginAction: ({ commit }, payload) => {
            commit('loginSuccess', payload);
            return "Success";
            /* axios.put(state.loginUrl, payload).then((res) => {
                return commit('loginSuccess', res.data);
            }).catch((res) => {
                return commit('loginFail', res.data);
            }) */
        }
    }
})