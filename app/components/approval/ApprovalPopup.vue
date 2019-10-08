<template>
    <ScrollView class="modalPopup">
        <StackLayout class="popupStyle">
            <Label class="popupTitle" text="상신" />

            <StackLayout class="hr-light popupLine"></StackLayout>

            <TextView editable="false" class="decisionGubun gubunStyle" @tap="showGubunPopup">
                <Span :text="this.$store.state.selectedGubunData.name"/>
                <!-- <Span class="fa icon arrowIcon" horizontalAlignment="right" text.decode="&#xf0d7;"/> -->
            </TextView>

            <!-- <StackLayout orientation="horizontal">
                <DatePickerField
                    class="popupTwoDateStyle"
                    @dateChange="onToDateChange"
                    :date="fromDay" />
                <Label class="devideDate" text="~"></Label>
                <DatePickerField
                    class="popupTwoDateStyle"
                    @dateChange="onFromDateChange"
                    :date="toDay" />
            </StackLayout> -->

            <StackLayout orientation="horizontal">
                <DatePickerField
                    class="popupOneDateStyle"
                    @dateChange="onDateChange"
                    :date="toDay" />
            </StackLayout>

            <StackLayout class="hr-light popupLine"></StackLayout>

            <GridLayout column="auto, *" rows="auto">
                <Label row="0" col="0" class="labelStyle" text="잔여연차일수" />
                <Label row="0" col="1" class="labelStyle" horizontalAlignment="right" :text="$store.state.approvalVacationList.usable_count + ' 일'" />
            </GridLayout>

            <StackLayout class="hr-light popupLine"></StackLayout>

            <GridLayout column="auto, *" rows="auto">
                <Label row="0" col="0" class="labelStyle" text="신청 일수" />
                <Label row="0" col="1" class="labelStyle" horizontalAlignment="right" :text="requestDayCount + ' 일'" />
            </GridLayout>

            <StackLayout class="hr-light popupLine"></StackLayout>

            <Label class="subTitle" text="메모" />
            <TextField class="memoArea" v-model="textFieldValue" />

            <StackLayout class="hr-light popupLine"></StackLayout>

            <Label class="subTitle" text="결재자" />
            <TextView class="decisionGubun" editable="false">
                <Span :text="$store.state.approvalManager" />
            </TextView>

            <StackLayout class="hr-light popupLine"></StackLayout>

            <StackLayout orientation="horizontal" class="buttonArea">
                <Button class="btn btn-outline" text="상신" @tap="submit" />
                <Button class="btn btn-outline" text="취소" @tap="$modal.close()" />
            </StackLayout>
        </StackLayout>
    </ScrollView>
</template>

<script>
    import ApprovalGubunPopup from "../approval/ApprovalGubunPopup";

    export default {
        mounted() {
            var param = {};
            param.year = this.year;
            /* this.$store.dispatch('getGubunData').then(function(res) {
                this.$store.dispatch('getApprovalVacationList', param).then(function(res) {
                    this.$store.dispatch('getApprovalManager');
                });
            }); */
             this.$store.dispatch('getApprovalPopupData', param)
        },

        components : {
            ApprovalGubunPopup
        },

        data() {
            return {
                textFieldValue: "",
                requestDayCount: 1,
                year: this.$moment(new Date()).format('YYYY'),
                toDay: this.$moment(new Date()).format('YYYY-MM-DD'),
                fromDay : this.$moment(new Date()).format("YYYY-MM-DD")
            };
        },

        methods: {
            submit() {
                console.log("Submit");
            },

            showGubunPopup() {
                this.$showModal(ApprovalGubunPopup);
            },

            onToDateChange() {

            },

            onFromDateChange() {

            },

            onDateChange() {

            }
        }
    };
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
        font-size: 20;	
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