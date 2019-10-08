<template>
    <Page class="page" actionBarHidden="true">
        <StackLayout height="100%" width="100%">
            <StackLayout orientation="horizontal" class="titleArea">
                <Label text="자산조회" class="menuName" @tap="onDrawerButtonTap"></Label>
            </StackLayout>

            <TabView v-show="this.$store.state.userInfo.admin == 9" :selectedIndex="selectedIndex">
                <TabViewItem title="자산 현황">
                    <ListView for="item in ItemUsageComp" separatorColor="transparent" class="itemList">
                        <v-template>
                            <DashboardSummaryComp :item="item" />
                        </v-template>
                    </ListView>
                </TabViewItem>
                <TabViewItem title="자산 조회">
                    <GridLayout class="page-content">
                        <Button class="btn btn-primary scanBtn" @tap="onGenerate">onGenerate</Button>
                        <StackLayout>
                            <Label :text="format"></Label>
                            <Label :text="text"></Label>
                            <Label :text="result"></Label>
                        </StackLayout>
                    </GridLayout>
                </TabViewItem>
            </TabView>

            <ListView v-show="this.$store.state.userInfo.admin != 9" for="item in ItemUsageComp" separatorColor="transparent" class="itemList">
                <v-template>
                    <DashboardSummaryComp :item="item" />
                </v-template>
            </ListView>
        </StackLayout>
    </Page>
</template>

<script>
    import * as utils from "~/service/utils/utils";
    import SelectedPageService from "~/service/utils/selected-page-service";
    import ItemUsageComp from "../components/itemusage/Item-Usage-Comp";
    import * as Camera from "nativescript-camera";
    const BarcodeScanner = require("nativescript-barcodescanner").BarcodeScanner;

    export default {
        mounted() {
            SelectedPageService.getInstance().updateSelectedPage("ItemUsage");
        },
        components : {
            "BarcodeScanner": require("nativescript-barcodescanner").BarcodeScannerView,
            ItemUsageComp : ItemUsageComp
        },
        computed: {
            
        },
        data() {
            return {
                scanner : null,
                format : 'testFormat',
                text : 'testText',
                result : 'testResult',
                selectedIndex: 0,
                itemUsageResult : []
            }
        },
        created() {
            this.scanner = new BarcodeScanner();
        },
        methods: {
            onDrawerButtonTap() {
                utils.showDrawer();
            },
            onScan() {
                Camera.requestCameraPermissions().then(() => {
                    this.scanner.scan({
                        formats: "QR_CODE, EAN_13",
                        cancelLabel: "Close",
                        cancelLabelBackgroundColor: "#FFFFFF",
                        message: "Use the volume buttons for extra light",
                        showFlipCameraButton: false,
                        preferFrontCamera: false,
                        showTorchButton: true,
                        beepOnScan: true,
                        torchOn: false,
                        closeCallback: function () { console.log("Scanner closed"); },
                        resultDisplayDuration: 500,
                        orientation: "portrait",
                        openSettingsIfPermissionWasPreviouslyDenied: true
                    }).then((result) => {
                        this.result = JSON.stringify(result);
                        this.format = result.format;
                        this.text = result.text;
                        console.log("Scan format : " + result.format);
                        console.log("Scan text :   " + result.text);
                    }, (error) => {
                        console.log("No scan: " + error);
                    });
                }).catch(e => {console.log("Error requesting permission");});

                console.log("this.scanner");
            },
            onGenerate() {
                console.log("Generate");
            }
        }
    };
</script>

<style scoped>
    .scanBtn {
        vertical-align: bottom;
        height: 50;
        margin-bottom: 50;
    }
</style>