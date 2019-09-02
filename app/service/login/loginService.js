import axios from 'axios';

export const loginAction = (userId, password, isAttend) => {
    return new Promise(function(resolve, reject) {
        var url = 'http://200.100.1.140:8081/mobile';
        axios.post(url, {
            "id" : userId,
            "password" : password,
            "isAttend" : isAttend
        }).then(function (response) {
            console.log("success");
            resolve(response);
        }).catch(function (error) {
            console.log(error);
        });
    });
};

