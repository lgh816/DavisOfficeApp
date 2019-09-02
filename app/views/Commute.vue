<template>
    <Page class="page">
        <ActionBar class="action-bar">
            <!-- 
            Use the NavigationButton as a side-drawer button in Android
            because ActionItems are shown on the right side of the ActionBar
            -->
            <NavigationButton ios:visibility="collapsed" icon="res://menu" @tap="onDrawerButtonTap"></NavigationButton>
            <!-- 
            Use the ActionItem for IOS with position set to left. Using the
            NavigationButton as a side-drawer button in iOS is not possible,
            because its function is to always navigate back in the application.
            -->
            <ActionItem icon="res://navigation/menu" 
                android:visibility="collapsed" 
                @tap="onDrawerButtonTap"
                ios.position="left">
            </ActionItem>
            <Label class="action-bar-title" text="근태 현황"></Label>
        </ActionBar>

        <ScrollView>
            <FlexboxLayout flexDirection="column">
                <StackLayout row="0" height="500" class="utmArea">
                        <GridLayout columns="auto, *, auto, auto, auto, auto" rows="50" class="table table-standings">
                            <Label text="날짜" textWrap="true" row="0" col="0" class="th no"></Label>
                            <Label text="부서" textWrap="true" row="0" col="1" class="th id"></Label>
                            <Label text="이름" textWrap="true" row="0" col="2" class="th name"></Label>
                            <Label text="타입" textWrap="true" row="0" col="3" class="th sn"></Label>
                        </GridLayout>
                        <ListView for="item in listOfItems" >
                            <v-template>
                                <GridLayout columns="auto, *, auto, auto, auto, auto" rows="40" class="table table-list">
                                    <Label :text="item.date" textWrap="true" row="0" col="0" class="th no"></Label>
                                    <Label :text="item.dept_name" textWrap="true" row="0" col="1" class="th id"></Label>
                                    <Label :text="item.name" textWrap="true" row="0" col="2" class="th name"></Label>
                                    <Label :text="item.out_office_name" textWrap="true" row="0" col="3" class="th sn"></Label>
                                </GridLayout>
                            </v-template>
                        </ListView>
                </StackLayout>

            </FlexboxLayout>
        </ScrollView>

    </Page>
</template>

<script>
    import * as utils from "~/service/utils/utils";
    import SelectedPageService from "~/service/utils/selected-page-service";
    import * as CommuteService from  '../service/commute/CommuteService';

    export default {
        mounted() {
            SelectedPageService.getInstance().updateSelectedPage("Utm");
            CommuteService.commuteToday().then((response) => {
                var result = response.data;
                this.listOfItems = result;
            });
        },
        data() {
            return {
                listOfItems: []
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
    .utmArea {
        border: 1;
        border-color: black;
    }

    .utmTitle {
        background-color: #5699e8;
        color: white;
        height: 25;
        font-size: 16;
        width: 100%;
        text-align: left;
        padding-left: 10;
        margin-top: 5;
    }

    .table {
        width: 100%;
        background-color: #fff;
    }

    .table-standings {
        border-width: 1 1 0 1;
        border-color: #e6eef4
    }

    .table-standings Label {
        white-space: nowrap;
        color: #5c6265;
        vertical-align: middle
    }

    .table .th {
        background-color: #e6eef4
    }

    .table .th Label {
        color: #00476d
    }

    .table .th,
    .table .td {
        padding: 10;
        border-color: #e6eef4
    }
    
</style>