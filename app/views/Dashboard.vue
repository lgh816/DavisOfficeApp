<template>
    <Page class="page" actionBarHidden="true">
        <ScrollView class="mainContents">
            <StackLayout height="100%" width="100%">
                <StackLayout orientation="horizontal"  marginBottom="5">
                    <Label text="iCon"  @tap="onDrawerButtonTap" marginRight="5"></Label>
                    <Label text="Dashboard"></Label>
                </StackLayout>

                 <ListView for="item in summaryResult" separatorColor="transparent" 
                            class="itemList">
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
    import * as DashboardService from  "../service/dashboard/dashboardService";
    import DashboardSummaryComp from "../components/dashboard_summary/Dashboard-Summary-Comp";
    import { createNamespacedHelpers } from 'vuex';
    const { mapGetters } = createNamespacedHelpers('../store/login/loginStore');

    export default {
        computed : {
            ...mapGetters([
                'countOfUser'
            ])
        },
        mounted() {
            SelectedPageService.getInstance().updateSelectedPage("Dashboard");
            DashboardService.dashboardSummary().then((response) => {
                var data = response.data[0];
                // this.setSummaryData(data);
                this.summaryResult.push({text : data.vacation_year + " 잔여 연차 " + data.vacation_year_remain});
                this.summaryResult.push({text : "평균 출근 시간 " + data.in_time_avg.substr(0,5)});
                this.summaryResult.push({text : "평균 퇴근 시간 " + data.out_time_avg.substr(0,5)});
            });
        },
        components : {
            DashboardSummaryComp
        },
        data () {
            return {
                summaryData : {},
                summaryResult : []
            }
        },
        computed: {
            message() {
                return "<!-- Page content goes here -->";
            }
        },
        methods: {
            onDrawerButtonTap() {
                utils.showDrawer();
            },
            setSummaryData(data) {
                this.summaryResult.push({text : "잔여 연차 " + data.vacation + data.vacation_year_remain});
                this.summaryResult.push({text : "평균 출근 시간 " + data.in_time_avg.substr(0,5)});
                this.summaryResult.push({text : "평균 퇴근 시간 " + data.out_time_avg.substr(0,5)});
            }
        }
    };
</script>

<style scoped>
    .pieChartArea {
        border: 1;
        border-color: black;
    }

    .chartTitle {
        background-color: #5699e8;
        color: white;
        height: 25;
        font-size: 16;
        width: 100%;
        text-align: left;
        padding-left: 10;
        margin-top: 5;
    }

    .gridStyle {
        border-width: 1;
        border-color: rgb(173, 170, 170);
        margin: 3;
    }

    .gridTitle {
        background-color: rgb(178, 202, 236);
        text-align: center;
        border-width: 1;
        border-color: rgb(173, 170, 170);
        padding-top: 10;
    }

    .gridContents {
        text-align: center;
        border-width: 1;
        border-color: rgb(173, 170, 170);
        padding-top: 10;
    }
</style>