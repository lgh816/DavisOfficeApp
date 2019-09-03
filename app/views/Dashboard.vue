<template>
    <Page class="page">
        <ActionBar class="action-bar">
            <NavigationButton ios:visibility="collapsed" icon="res://menu" @tap="onDrawerButtonTap"></NavigationButton>
            <ActionItem icon="res://navigation/menu" 
                android:visibility="collapsed" 
                @tap="onDrawerButtonTap"
                ios.position="left">
            </ActionItem>
            <Label class="action-bar-title" text="Dashboard"></Label>
        </ActionBar>
        <ScrollView>
            <FlexboxLayout flexDirection="column">

                <StackLayout row="0" height="120">
                    <Label class="chartTitle" text="Partner Management Status"></Label>
                    <GridLayout columns="*, *, *" rows="40, 50" class="gridStyle">
                        <Label text="Partner" textWrap="true" row="0" col="0" class="gridTitle"></Label>
                        <Label text="Customer" textWrap="true" row="0" col="1" class="gridTitle"></Label>
                        <Label text="UTM" textWrap="true" row="0" col="2" class="gridTitle"></Label>
                        <Label :text="partnerCnt" textWrap="true" row="1" col="0" class="gridContents"></Label>
                        <Label :text="customerCnt" textWrap="true" row="1" col="1" class="gridContents"></Label>
                        <Label :text="utmCnt" textWrap="true" row="1" col="2" class="gridContents"></Label>
                    </GridLayout>
                </StackLayout>

                <StackLayout row="1" height="120">
                    <Label class="chartTitle" text="Partner Asset Status"></Label>
                    <GridLayout columns="*, *, *, auto" rows="40, 50" class="gridStyle">
                        <Label text="Total" textWrap="true" row="0" col="0" class="gridTitle"></Label>
                        <Label text="Stock" textWrap="true" row="0" col="1" class="gridTitle"></Label>
                        <Label text="Sale" textWrap="true" row="0" col="2" class="gridTitle"></Label>
                        <Label text="Sub Partner" textWrap="true" row="0" col="3" class="gridTitle"></Label>
                        <Label :text="totalCnt" textWrap="true" row="1" col="0" class="gridContents"></Label>
                        <Label :text="stockCnt" textWrap="true" row="1" col="1" class="gridContents"></Label>
                        <Label :text="saleCnt" textWrap="true" row="1" col="2" class="gridContents"></Label>
                        <Label :text="subPartnerCnt" textWrap="true" row="1" col="3" class="gridContents"></Label>
                    </GridLayout>
                </StackLayout>

                <StackLayout row="2" height="200">
                    <Label class="chartTitle" text="Web Filter Category TOP5"></Label>
                    <RadPieChart allowAnimation="true" row="0">
                        <PieSeries v-tkPieSeries
                                    selectionMode="DataPoint"
                                    expandRadius="0.4"
                                    outerRadiusFactor="0.7"
                                    valueProperty="Amount"
                                    legendLabel="Category"
                                    :items="pieItems" />

                        <RadLegendView v-tkPieLegend position="Left" offsetOrigin="TopRight" width="150" enableSelection="true"></RadLegendView>
                    </RadPieChart>
                </StackLayout>

                <StackLayout row="3" height="200">
                    <Label class="chartTitle" text="Anti Spam Block State"></Label>
                    <RadCartesianChart>
                        <CategoricalAxis v-tkCartesianHorizontalAxis></CategoricalAxis>
                        <LinearAxis v-tkCartesianVerticalAxis></LinearAxis>
                        <BarSeries v-tkCartesianSeries :items="barItems" categoryProperty="Category" valueProperty="Amount"></BarSeries>
                    </RadCartesianChart>
                </StackLayout>

            </FlexboxLayout>
        </ScrollView>
    </Page>
</template>

<script>
    import * as utils from "~/service/utils/utils";
    import SelectedPageService from "~/service/utils/selected-page-service";
    import * as DashboardService from  "../service/dashboard/dashboardService";

    export default {
        mounted() {
            SelectedPageService.getInstance().updateSelectedPage("Dashboard");
            DashboardService.dashboardSummary().then((response) => {
                var result = response.data;
            });
        },
        data () {
            return {
                // items : getPieData()
                pieItems : [
                    { Category: 'Test Company1', Amount: 10 },
                    { Category: 'Test Company2', Amount: 76 },
                    { Category: 'Test Company3', Amount: 60 },
                    { Category: 'Test Company4', Amount: 24 },
                    { Category: 'Test Company5', Amount: 40 }
                ],
                barItems : [
                    { Category: 'Block', Amount: 479},
                    { Category: 'Log', Amount: 499},
                    { Category: 'Notfication', Amount: 502},
                    { Category: 'Pass', Amount: 450}
                ],
                partnerCnt : 12,
                customerCnt : 50,
                utmCnt : 123,
                totalCnt : 231,
                stockCnt : 53,
                saleCnt : 164,
                subPartnerCnt : 14
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