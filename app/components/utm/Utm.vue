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
            <Label class="action-bar-title" text="UTM"></Label>
        </ActionBar>

        <ScrollView>
            <FlexboxLayout flexDirection="column">

                <StackLayout row="0" height="250" class="utmArea">
                    <Label class="utmTitle" text="PartnerInfo"></Label>
                </StackLayout>

                <StackLayout row="1" height="300" class="utmArea">
                    <Label class="utmTitle" text="UTM List"></Label>
                        <GridLayout columns="auto, *, auto, auto, auto, auto, auto, auto" rows="50" class="table table-standings">
                                <Label text="No." textWrap="true" row="0" col="0" class="th no"></Label>
                                <Label text="ID" textWrap="true" row="0" col="1" class="th id"></Label>
                                <Label text="Name" textWrap="true" row="0" col="2" class="th name"></Label>
                                <Label text="S/N" textWrap="true" row="0" col="3" class="th sn"></Label>
                                <Label text="Status" textWrap="true" row="0" col="4" class="th status"></Label>
                                <Label text="Period" textWrap="true" row="0" col="5" class="th Period"></Label>
                        </GridLayout>
                        <ListView for="item in listOfItems" >
                            <v-template>
                                <GridLayout columns="auto, *, auto, auto, auto, auto, auto, auto" rows="40" class="table table-list">
                                    <Label :text="item.no" textWrap="true" row="0" col="0" class="th no"></Label>
                                    <Label :text="item.name" textWrap="true" row="0" col="1" class="th id"></Label>
                                    <Label :text="item.id" textWrap="true" row="0" col="2" class="th name"></Label>
                                    <Label :text="item.sn" textWrap="true" row="0" col="3" class="th sn"></Label>
                                    <Label :text="item.status" textWrap="true" row="0" col="4" class="th status"></Label>
                                    <Label :text="item.peroid" textWrap="true" row="0" col="5" class="th Period"></Label>
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

    export default {
        mounted() {
            SelectedPageService.getInstance().updateSelectedPage("Utm");
        },
        data() {
            return {
                listOfItems: [
                    {no:1, id: "choi", name: "seongjin", sn: "A123", status: "active", peroid: 10 },
                    {no:2, id: "choi", name: "seongjin", sn: "A123", status: "active", peroid: 10 },
                    {no:3, id: "choi", name: "seongjin", sn: "A123", status: "active", peroid: 10 },
                    {no:4, id: "choi", name: "seongjin", sn: "A123", status: "active", peroid: 10 },
                    {no:5, id: "choi", name: "seongjin", sn: "A123", status: "active", peroid: 10 },
                    {no:6, id: "choi", name: "seongjin", sn: "A123", status: "active", peroid: 10 }
                ]
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
        font-size: 12;
        color: #5c6265;
        vertical-align: middle
    }


    .table-list .th {
        background-color: #e6eef4
    }

    .table-list .th Label {
        color: #00476d
    }

    .table-list .th,
    .table-list .td {
        padding: 10;
        border-color: #e6eef4
    }
    

    
</style>