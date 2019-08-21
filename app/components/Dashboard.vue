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

                <StackLayout row="0" height="200" class="pieChartArea">
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

                <StackLayout row="1" height="200">
                    <Label class="chartTitle" text="Anti Spam Block State"></Label>
                    <RadCartesianChart>
                        <CategoricalAxis v-tkCartesianHorizontalAxis></CategoricalAxis>
                        <LinearAxis v-tkCartesianVerticalAxis></LinearAxis>
                        <BarSeries v-tkCartesianSeries :items="barItems" categoryProperty="Category" valueProperty="Amount"></BarSeries>
                    </RadCartesianChart>
                </StackLayout>

                <StackLayout row="0" height="200" class="pieChartArea">
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

            </FlexboxLayout>
        </ScrollView>
    </Page>
</template>

<script>
    import * as utils from "~/shared/utils";
    import SelectedPageService from "../shared/selected-page-service";
    // import GetDashboardData from "../service/dashboard";
    // import { getPieData } from "../service/dashboard";

    export default {
        mounted() {
            SelectedPageService.getInstance().updateSelectedPage("Dashboard");
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
                ]
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
</style>