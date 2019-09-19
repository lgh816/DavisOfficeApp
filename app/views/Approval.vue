<template>
    <Page class="page" actionBarHidden="true">
        <ScrollView class="mainContents">
            <StackLayout height="100%" width="100%">
                <StackLayout orientation="horizontal" class="titleArea">
                    <Label text="결재 현황" class="menuName" @tap="onDrawerButtonTap"></Label>
                </StackLayout>

                <StackLayout orientation="horizontal" class="optionsArea">
                    <!-- <Label :text="this.todayDay" width="40%"></Label> -->
                        <DatePickerField 
                            class="datePickArea"
                            :date="this.fromDate"
                            dateFormat="YYYY-MM-dd">
                        </DatePickerField>
                        
                        <DatePickerField 
                            class="datePickArea"
                            :date="this.toDate"
                            dateFormat="YYYY-MM-dd">
                        </DatePickerField>
                    <Label :text="this.$store.state.userInfo.dept_name" class="deptName"></Label>
                </StackLayout>

                <ListView for="item in listOfItems" @itemTap="onItemTap"  separatorColor="transparent" class="itemList">
                    <v-template>
                        <ApprovalListComp :item="item" />
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
                fromDate: this.$moment().add(-1, 'month').startOf('month').format("YYYY-MM-01"),
                toDate: this.$moment().add(+1, 'year').add(-2, 'month').endOf('month').format("YYYY-MM-DD")
            }
        },

        

        methods : {
             onDrawerButtonTap() {
                utils.showDrawer();
            }
        }
    }
</script>

<style scoped>
    /*========== Need to change common CSS ==========*/
    .titleArea,
    .optionsArea {
        margin: 5;
    }
    .menuName {
        font-size: 20;
        font-weight: bold;
        color: rgb(80, 144, 218);
    }
    .deptName {
        text-align: right;
        color: rgb(80, 144, 218);
    }
    .datePickArea {
        text-align: left;
        font-size: 15;
        height: 20;
        padding-top: 0;
        padding-bottom: 0;
        font-weight: 400;
    }
    /*===============================================*/
</style>
