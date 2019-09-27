<template>
    <Page class="page" actionBarHidden="true">
        <ScrollView class="mainContents">
            <StackLayout height="100%" width="100%">
                <StackLayout orientation="horizontal" class="titleArea">
                    <!-- <Label text.decode="&#xf039;" class="fa icon sideButton" @tap="onDrawerButtonTap"></Label> -->
                    <Label text="Dashboard" class="menuName" @tap="onDrawerButtonTap"></Label>
                    <Label :text="this.$store.state.userInfo.dept_name" class="deptName"></Label>
                </StackLayout>

                <StackLayout orientation="horizontal" class="optionsArea">
                    <!-- <Label :text="this.todayDay" width="80%"></Label> -->
                    <DatePickerField
                        class="oneDateStyle"
                        @dateChange="onDateChange"
                        :date="todayDay"
                        dateFormat="MMMM YYYY" />
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
            // this.searchData(param);

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
                todayDay : this.$moment(new Date()).format('YYYY-MM'),
                startDate : this.$moment().add(-1, 'month').startOf('month').format("YYYY-MM-DD"),
                endDate : this.$moment().add(-1, 'month').endOf('month').format("YYYY-MM-DD HH:mm:ss")
            }
        },
        methods: {
            searchData(param) {
                this.$store.dispatch('getDashboardSummary', param).then((res) => {
                    this.summaryResult = this.$store.state.summaryResult;
                });
            },

            onDrawerButtonTap() {
                utils.showDrawer();
            },

            onDateChange(args) {
                const param = {};
                const startDate = this.$moment(args.value).startOf('month').format('YYYY-MM-DD');
                const endDate = this.$moment(args.value).endOf('month').format("YYYY-MM-DD HH:mm:ss")
                param.start = startDate;
                param.end = endDate;
                param.year = startDate.substr(0,4);
                this.searchData(param);
            }
        }
    };
</script>

<style scoped>
   
</style>