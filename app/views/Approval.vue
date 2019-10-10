<template>
    <Page class="page" actionBarHidden="true">
        <ScrollView class="mainContents">
            <StackLayout height="100%" width="100%">
                <StackLayout orientation="horizontal" class="titleArea">
                    <Label text="결재 관리" class="menuName" @tap="onDrawerButtonTap"></Label>
                    <Label :text="this.$store.state.userInfo.dept_name" class="deptName"></Label>
                </StackLayout>

                <StackLayout orientation="horizontal" class="optionsArea">
                    <DatePickerField
                        class="twoDateStyle"
                        @dateChange="onToDateChange"
                        :date="this.fromDay" />
                    <Label text="~" width="10%" style="text-align: center"></Label>
                    <DatePickerField
                        class="twoDateStyle"
                        @dateChange="onFromDateChange"
                        :date="this.toDay" />
                </StackLayout>

                <Button text="상신" @tap="showApprovalPopup"/>
                <ListView for="item in listOfItems" @itemTap="onItemTap"  separatorColor="transparent" class="itemList">
                    <v-template>
                        <ApprovalListComp :item="item"/>
                    </v-template>
                </ListView>
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
    import * as utils from "~/service/utils/utils"
    import SelectedPageService from "~/service/utils/selected-page-service";
    import ApprovalListComp from "../components/approval/Approval-List-Comp";
    import ApprovalPopup from "../components/approval/ApprovalPopup";

    export default {
        mounted(){
            SelectedPageService.getInstance().updateSelectedPage("Approval");
            var param = {};
            /* param.startDate = "2019-08-01";
            param.endDate = "2020-07-30"; */
            param.startDate = this.fromDay;
            param.endDate = this.toDay;
            this.searchData(param);
            /* this.$store.dispatch('getApprovalData', param).then((res) => {
                this.listOfItems = this.$store.state.approvalAllList;
            }) */
        },

        computed : {
        
        },

        components : {
            ApprovalListComp,
            ApprovalPopup
        },

        data (){
            return {
                listOfItems: [],
                toDay: this.$moment(new Date()).add(+1, 'year').format('YYYY-MM-DD'),
                fromDay : this.$moment(new Date()).add(-1, 'month').startOf('month').format("YYYY-MM-DD"),
            }
        },

        methods : {
            searchData(param) {
                this.$store.dispatch('getApprovalData', param).then((res) => {
                    this.listOfItems = this.$store.state.approvalAllList;
                })
            },

             onDrawerButtonTap() {
                utils.showDrawer();
            },
            onItemTap() {
                console.log("TAP");
            },

            onToDateChange(args) {
                const changedDate = this.$moment(args.value).format('YYYY-MM-DD');
                this.fromDay = changedDate;
                const param = {};
                param.startDate = this.fromDay;
                param.endDate = this.toDay;
                this.searchData(param);
            },

            onFromDateChange(args) {
                const changedDate = this.$moment(args.value).format('YYYY-MM-DD');
                this.toDay = changedDate;
                const param = {};
                param.startDate = this.fromDay;
                param.endDate = this.toDay;
                this.searchData(param);
            },

            showApprovalPopup() {
                this.$showModal(ApprovalPopup);
            }
        }
    }
</script>

<style scoped>

</style>
