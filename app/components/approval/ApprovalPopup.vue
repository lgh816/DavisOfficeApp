<template>
    <ScrollView class="modalPopup">
        <StackLayout class="popupStyle">
            <Label class="popupTitle" text="상신" />

            <StackLayout class="hr-light popupLine"></StackLayout>

            <Label class="subTitle" text="구분" />
            <TextView editable="false" class="decisionGubun gubunStyle" @tap="showGubunPopup">
                <Span :text="$store.state.selectedGubunData.name"/>
                <!-- <Span class="fa icon arrowIcon" horizontalAlignment="right" text.decode="&#xf0d7;"/> -->
            </TextView>

            <StackLayout class="hr-light popupLine"></StackLayout>

            <Label class="subTitle" text="기간" style="margin-bottom: 0;"/>
            <StackLayout v-show="$store.state.towDatePicker" orientation="horizontal">
                <DatePickerField
                    class="popupTwoDateStyle"
                    @dateChange="onFromDateChange"
                    :date="$store.state.approvalData.start_date" />
                <Label class="devideDate" text="~"></Label>
                <DatePickerField
                    class="popupTwoDateStyle"
                    @dateChange="onToDateChange"
                    :date="$store.state.approvalData.end_date" />
            </StackLayout>

            <StackLayout v-show="$store.state.oneDatePicker" orientation="horizontal">
                <DatePickerField
                    class="popupOneDateStyle"
                    @dateChange="onFromDateChange"
                    :date="$store.state.approvalData.start_date" />
            </StackLayout>

            <Label v-show="$store.state.outOfficePicker" class="subTitle" text="외근시간" style="margin-bottom: 0;margin-top: 10;"/>
            <StackLayout v-show="$store.state.outOfficePicker" orientation="horizontal">
                <TimePickerField
                    class="popupTwoDateStyle"
                    @timeChange="onOfficeFromTimeChange"
                    :time="$store.state.approvalData.start_time" />
                <Label class="devideDate" text="~"></Label>
                <TimePickerField
                    class="popupTwoDateStyle"
                    @timeChange="onOfficeToTimeChange"
                    :time="$store.state.approvalData.end_time" />
            </StackLayout>

            <StackLayout class="hr-light popupLine"></StackLayout>

            <GridLayout v-show="$store.state.leftDateArea" column="auto, *" rows="auto">
                <Label row="0" col="0" class="labelStyle" text="잔여연차일수" />
                <Label row="0" col="1" class="labelStyle" horizontalAlignment="right" :text="$store.state.approvalVacationList.usable_count + ' 일'" />
            </GridLayout>

            <StackLayout v-show="$store.state.leftDateArea" class="hr-light popupLine"></StackLayout>

            <GridLayout v-show="$store.state.requestDateArea" column="auto, *" rows="auto">
                <Label row="0" col="0" class="labelStyle" text="신청 일수" />
                <Label row="0" col="1" class="labelStyle" horizontalAlignment="right" :text="$store.state.approvalData.day_count + ' 일'" />
            </GridLayout>

            <StackLayout v-show="$store.state.requestDateArea" class="hr-light popupLine"></StackLayout>

            <Label class="subTitle" text="메모" />
            <TextField class="memoArea" v-model="memoText"/>

            <StackLayout class="hr-light popupLine"></StackLayout>

            <Label class="subTitle" text="결재자" />
            <TextView class="decisionGubun" editable="false">
                <Span :text="$store.state.approvalManager" />
            </TextView>

            <StackLayout class="hr-light popupLine"></StackLayout>

            <StackLayout orientation="horizontal" class="buttonArea">
                <Button class="btn btn-outline" text="상신" @tap="approvalSubmit" />
                <Button class="btn btn-outline" text="취소" @tap="$modal.close()" />
            </StackLayout>
        </StackLayout>
    </ScrollView>
</template>

<script>
    import ApprovalGubunPopup from "../approval/ApprovalGubunPopup";
    import * as utils from "~/service/utils/utils";

    export default {
        mounted() {
            this.$store.commit('initApprovalPopup');
            var param = {};
            param.year = this.year;
            this.$store.dispatch('getApprovalPopupData', param)
            this.$store.state.approvalData.start_date = this.$moment(new Date()).format('YYYY-MM-DD');
            this.$store.state.approvalData.end_date = this.$moment(new Date()).format('YYYY-MM-DD');
            this.$store.state.approvalData.start_time = this.$moment(new Date()).format('HH:mm');
            this.$store.state.approvalData.end_time = this.$moment(new Date()).format('HH:mm');
        },

        components : {
            ApprovalGubunPopup
        },

        data() {
            return {
                year: this.$moment(new Date()).format('YYYY'),
                memoText: ''
            };
        },

        methods: {
            async approvalSubmit() {
                var messageObj = {
                    message : '', 
                    title : "알림", 
                    cancelable : true, 
                    okButtonText : '닫기'
                };
                this.$store.state.approvalData.submit_comment = this.memoText;
                if (this.memoText == '' ) {
                    messageObj.message = "메모를 입력하세요.";
                    alert(messageObj);
                    return;
                }

                var dateValidate = this.$store.state.approvalData.date_validate;
                if (!dateValidate) {
                    messageObj.message = "기간을 잘못 입력하였습니다.";
                    alert(messageObj);
                    return;
                }

                var code = this.$store.state.selectedGubunData.code;
                if (code == 'B01') {
                    if (!this.isSelectHoliday()) {
                        messageObj.message = "선택 날짜는 휴일이 아닙니다.";
                        alert(messageObj);
                        return;
                    }
                } else if (code == 'V02' || code == 'V03') {
                    if (this.isSelectHoliday()) {
                        messageObj.message = "선택 날짜는 근무 하는 날이 아닙니다.";
                        alert(messageObj);
                        return;
                    }
                }

                var usingDayCnt = this.$store.state.approvalData.day_count;
                var usableDayCnt = this.$store.state.approvalVacationList.usable_count;
                if (!this.isDateCompare()) {
                    messageObj.message = "기간을 잘못 입력 하였습니다.";
                    alert(messageObj);
                    return;
                } else if (!this.checkYear()) {
                    messageObj.message = "시작일자 / 종료일자는 같은 연도에서만 가능합니다.";
                    alert(messageObj);
                    return;
                } else if (usingDayCnt != 0 && usingDayCnt > 31) {
                    messageObj.message = "최대 기간을 초과했습니다.(31일)";
                    alert(messageObj);
                    return;
                } else if ((code == 'V01' || code == 'V02' || code == 'V03') && (usingDayCnt > usableDayCnt))  {
                    messageObj.message = "잔여 연차 일수를 초과 했습니다.";
                    alert(messageObj);
                    return;
                }

                var yearMonth = this.$moment(new Date()).format('YYYYMM');
                await this.$store.dispatch('saveApprovalProcess', {yearmonth : yearMonth}).then((res) => {
                    var msg = '';
                    if (res.success) {
                        msg = '결재가 상신되었습니다.';
                    } else {
                        msg = res.msg;
                    }
                    alert( {message : msg, title : "알림", cancelable : true, okButtonText : '닫기'} ).then(() => {
                        this.$modal.close();
                    })
                });
            },

            showGubunPopup() {
                this.$showModal(ApprovalGubunPopup);
            },

            onFromDateChange(args) {
                var fromDate = this.$moment(args.value).format('YYYY-MM-DD');
                var toDate = this.$store.state.approvalData.end_date;
                if (fromDate > toDate) {
                    this.$store.state.approvalData.end_date = fromDate;    
                }
                this.$store.state.approvalData.start_date = fromDate;
                this.cnvtReqDate();
            },

            onToDateChange(args) {
                var toDate = this.$moment(args.value).format('YYYY-MM-DD');
                this.$store.state.approvalData.end_date = toDate;
                this.cnvtReqDate();
            },

            onOfficeFromTimeChange(args) {
                var fromTime = this.$moment(args.value).format('HH:mm');
                var toTime = this.$store.state.approvalData.end_time;
                if (fromTime > toTime) {
                    this.$store.state.approvalData.end_time = fromTime;    
                }
                this.$store.state.approvalData.start_time = fromTime;
            },

            onOfficeToTimeChange(args) {
                var toTime = this.$moment(args.value).format('HH:mm');
                this.$store.state.approvalData.end_time = toTime;
            },

            cnvtReqDate() {
                var code = this.$store.state.selectedGubunData.code;
                if (code == 'V02' || code == 'V03' || code == 'V07' || code == 'V08') {
                    this.$store.state.approvalData.day_count = 0.5;
                } else {
                    this.$store.commit('getRequestDateCount');
                }
            },

            isSelectHoliday() {
                var isHoli = false; // true: 쉬는 날, false : 평일

                var sStart = this.$store.state.approvalData.start_date;
                var start = new Date(sStart.substr(0, 4), sStart.substr(5, 2) - 1, sStart.substr(8, 2));

                var holidayInfos = this.$store.state.holidayList;
                if (start.getDay() == 0 || start.getDay() == 6) {
                    isHoli = true;
                } else {
                    for (var j = 0; j < holidayInfos.length; j++) {
                        var sDate = utils.getDateFormat(start);
                        if (holidayInfos[j].date == sDate) {
                            isHoli = true;
                            break;
                        }
                    }
                }
                return isHoli;
            },

            isDateCompare() {
                var startDate = this.$store.state.approvalData.start_date;
                var endDate = this.$store.state.approvalData.end_date;

                var start = new Date(startDate);
                var end = new Date(endDate);

                if (start > end) {
                    return false;
                }

                return true;
            },

            checkYear() {
                var startDate = this.$store.state.approvalData.start_date;
                var endDate = this.$store.state.approvalData.end_date;

                var start = new Date(startDate);
                var end = new Date(endDate);

                if (start.getFullYear() != end.getFullYear()) {
                    return false;
                }

                return true;
            }
        }
    }
</script>

<style lang="css">
    .modalPopup {
        height: 100%;
        width: 100%;
    }

    .popupStyle {
        padding-left: 20;
        padding-right: 20;
    }
    .popupTitle {
        margin-top: 20;
        font-size: 26;
        font-weight: bold;
        color: #425582;
    }

    .subTitle {
        font-size: 19;	
        font-weight: bold;
        margin-bottom: 5;
        color: #425582;
	} 
	.labelStyle {
        font-size: 20;
        color: #425582;
    }

    .popupLine {
        margin-top: 10;
        margin-bottom: 15;
    }

    .btn-outline {
        border-radius: 5;
    }

    .memoArea {
        /* height: 70; */
        border-width: 1;
    }

    .decisionGubun {
        background-color: #425582;
        color: white;
        padding-left: 10;
    }

    .gubunStyle {
        margin-bottom: 5;
    }

    .buttonArea {
        margin-bottom: 15;
        padding: 0;
        margin-top: 0;
    }

    .popupTwoDateStyle,
    .popupOneDateStyle {
        margin: 0;
        margin-top: 10;
        background-color: #425582;
        color: #ffffff;
        height: 30;
        padding-top: 0;
        padding-bottom: 0;
    }

    .popupTwoDateStyle {
        width: 46%;
    }

    .popupOneDateStyle {
        width: 100%;
    }

    .devideDate {
        margin-top: 10;
        text-align: center;
        width: 10%;
    }

    .arrowIcon {
        color: yellow;
    }
</style>