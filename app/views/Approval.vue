<template>
    <Page class="page" actionBarHidden="true">
        <ScrollView class="mainContents">
            <StackLayout height="100%" width="100%">
                <StackLayout orientation="horizontal" class="titleArea">
                    <Label text="결재 현황" class="menuName" @tap="onDrawerButtonTap"></Label>
                </StackLayout>

                <StackLayout orientation="horizontal" class="optionsArea">
                    <!-- <Label :text="this.todayDay" width="40%"></Label> -->
                        <!-- <DatePickerField
                            :day="this.fromDay"
                            :month="this.fromMonth"
                            :year="this.year"/> -->
                        <!-- <DatePickerField 
                            class="datePickArea"
                            :date="this.toDate"
                            dateFormat="YYYY-MM-dd">
                        </DatePickerField> -->
                    <Label :text="this.$store.state.userInfo.dept_name" class="deptName"></Label>
                </StackLayout>

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

    export default {
        mounted(){
            SelectedPageService.getInstance().updateSelectedPage("Approval");
            var param = {};
            param.startDate = "2019-08-01";
            param.endDate = "2020-07-30";
            /* param.startDate = this.fromDate;
            param.endDate = this.toDate; */
            this.$store.dispatch('getApprovalData', param).then((res) => {
                this.listOfItems = this.$store.state.approvalAllList;
            })
        },

        computed : {
        
        },

        components : {
            ApprovalListComp    
        },

        data (){
            return {
                listOfItems: [],
                fromDate: this.$moment().add(-1, 'month').startOf('month').format("YYYY,MM,01"),
                toDate: this.$moment().add(+1, 'year').add(-2, 'month').endOf('month').format("YYYY,MM,DD"),
                year: this.$moment().add('year').format("YYYY"),
                fromMonth: this.$moment().add(-1, 'month').format("MM"),
                toMonth: this.$moment().add(+1, 'month').format("MM"),
                fromDay: this.$moment().startOf('month').format("DD"),
                toDay: this.$moment().endOf('month').format("DD"),
            }
        },

        

        methods : {
             onDrawerButtonTap() {
                utils.showDrawer();
            },
            onItemTap() {
                console.log("TAP");
            }
        }
    }
</script>

<style scoped>

</style>
