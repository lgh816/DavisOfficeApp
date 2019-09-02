import axios from 'axios';

export const commuteToday = () => {
    return new Promise(function(resolve, reject) {
        var url = 'http://200.100.1.140:8081/mobile/commute/today';
        axios.post(url, {
            "startDate" : '2019-09-02'
        }).then(function (response) {
            resolve(response);
        }).catch(function (error) {
            console.log(error);
        });
    });
};

