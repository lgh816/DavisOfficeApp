<template>
    <Page class="page" actionBarHidden="true">
        <ScrollView class="mainContents">
            <StackLayout height="100%" width="100%">
                <StackLayout orientation="horizontal" class="titleArea">
                    <Label text="결재 현황" class="menuName" @tap="onDrawerButtonTap"></Label>
                </StackLayout>

                <StackLayout orientation="horizontal" class="optionsArea">
                    <Label :text="this.todayDay" width="80%"></Label>
                    <Label :text="this.$store.state.userInfo.dept_name" width="20%" class="deptName"></Label>
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
            this.$store.dispatch('getApprovalData', param).then((res) => {
                this.listOfItems = this.$store.state.approvalAllList;
            })
        },

        components : {
            ApprovalListComp    
        },

        data (){
            return {
                listOfItems: [],
                todayDay: this.$moment(new Date()).format('YYYY-MM-DD')
            }
        },

        

        methods : {
             onDrawerButtonTap() {
                utils.showDrawer();
            },

            onItemTap(e){
                console.log(e.item);
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
    /*===============================================*/
</style>
