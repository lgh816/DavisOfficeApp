import Vue from "nativescript-vue";
import Vuex from "vuex";
Vue.use(Vuex);

export const loginStore = new Vuex.Store({
    state : { // 데이터 선언 부분
        
    },
    getters : {
        countOfUser : state => {
            return state.userCount++;
        }
    },
    mutations : { // state에 있는 데이터를 변이(수정, 가공) 하는 부분
        // 1. state : 쓰든 안쓰든 넣어줘야함. 그래야 두번째 파라미터의 데이터를 받을수있음.
        // 2. payload : setUserInfo로 넘어오는 파라미터값. 
        //              관습적?으로 'payload'라는 단어를 사용함. 다른 명칭 써도 상관없음.
        setUserInfo(state, payload) {

        }
    },
    actions : { // axios를 사용하여 서버 통신에 사용

    }
})