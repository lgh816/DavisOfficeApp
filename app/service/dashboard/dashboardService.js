import axios from 'axios';

export const dashboardSummary = () => {
    return new Promise(function(resolve, reject) {
        var url = 'http://200.100.1.140:8081/mobile/dashboard/summary';
        axios.post(url, {
            "start" : "2019-07-01",
            "end" : "2019-07-31 23:59:59",
            "year" : 2019,
            "id" : 140601
        }).then(function (response) {
            resolve(response);
        }).catch(function (error) {
            console.log(error);
        });
    });
};