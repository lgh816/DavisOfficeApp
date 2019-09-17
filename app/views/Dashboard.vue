<template>
    <Page class="page" actionBarHidden="true">
        <ScrollView class="mainContents">
            <StackLayout height="100%" width="100%">
                <StackLayout orientation="horizontal" class="titleArea">
                    <!-- <Label text.decode="&#xf039;" class="fa icon sideButton" @tap="onDrawerButtonTap"></Label> -->
                    <Label text="Dashboard" class="menuName" @tap="onDrawerButtonTap"></Label>
                </StackLayout>

                <StackLayout orientation="horizontal" class="optionsArea">
                    <Label :text="this.todayDay" width="80%"></Label>
                    <Label :text="this.$store.state.userInfo.dept_name" width="20%" class="deptName"></Label>
                </StackLayout>

                <ListView for="item in summaryResult" separatorColor="transparent" class="itemList">
                    <v-template>
                        <DashboardSummaryComp :item="item" />
                    </v-template>
                </ListView>
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
    import * as utils from "~/service/utils/utils";
    import SelectedPageService from "~/service/utils/selected-page-service";
    import DashboardSummaryComp from "../components/dashboard/Dashboard-Summary-Comp";

    export default {
        mounted() {
            SelectedPageService.getInstance().updateSelectedPage("Dashboard");
            var param = {}
            param.start = this.startDate;
            param.end = this.endDate;
            param.year = this.startDate.substr(0,4);

            this.$store.dispatch('getDashboardSummary', param).then((res) => {
                this.summaryResult = this.$store.state.summaryResult;
            });
        },
        components : {
            DashboardSummaryComp
        },
        data () {
            return {
                summaryResult : [],
                todayDay : this.$moment(new Date()).format('YYYY-MM-DD'),
                startDate : this.$moment().add(-1, 'month').startOf('month').format("YYYY-MM-DD"),
                endDate : this.$moment().add(-1, 'month').endOf('month').format("YYYY-MM-DD HH:mm:ss")
            }
        },
        methods: {
            onDrawerButtonTap() {
                utils.showDrawer();
            }
        }
    };
</script>

<style scoped>
    /*========== Need to change common CSS ==========*/
    .titleArea {
        margin: 15;
    }
    .optionsArea {
        margin-right: 10;
        margin-left: 10;
        margin-bottom: 15;
        font-size: 15;
    }
    .menuName {
        font-size: 30;
        font-weight: bold;
        color: rgb(80, 144, 218);
    }
    .deptName {
        text-align: right;
        color: rgb(80, 144, 218);
    /*===============================================*/
    }
</style>