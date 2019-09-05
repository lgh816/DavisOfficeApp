import axios from 'axios';

export const loginAction = (userId, password, isAttend) => {
    return new Promise(function(resolve, reject) {
        var userInfo = {
            id : userId,
            password : password,
            isAttend : isAttend
        };
        var url = 'http://200.100.1.140:8081/mobile';

        axios.put(url, {
            user : userInfo,
            initPassword : false
        }).then(function (response) {
            resolve(response);
        }).catch(function (error) {
            console.log(error);
        });
    });
};

