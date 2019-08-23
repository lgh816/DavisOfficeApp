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
            <Label class="action-bar-title" text="Settings"></Label>
        </ActionBar>

        <GridLayout class="page-content">
            <Button class="btn btn-primary scanBtn" @tap="onScan">Scan</Button>
            <StackLayout>
                <Label :text="format"></Label>
                <Label :text="text"></Label>
                <Label :text="result"></Label>
            </StackLayout>
        </GridLayout>
    </Page>
</template>

<script>
    import * as utils from "~/service/utils/utils";
    import SelectedPageService from "~/service/utils/selected-page-service";
    import * as Camera from "nativescript-camera";
    const BarcodeScanner = require("nativescript-barcodescanner").BarcodeScanner;

    export default {
        mounted() {
            SelectedPageService.getInstance().updateSelectedPage("Settings");
        },
        components : {
            "BarcodeScanner": require("nativescript-barcodescanner").BarcodeScannerView
        },
        computed: {
            message() {
                return "<!-- Page content goes here -->";
            }
        },
        data() {
            return {
                scanner : null,
                format : 'testFormat',
                text : 'testText',
                result : 'testResult'
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
                        this.result = result;
                        this.fotmat = result.format;
                        this.text = result.text;
                        console.log("Scan format : " + result.format);
                        console.log("Scan text :   " + result.text);
                    }, (error) => {
                        console.log("No scan: " + error);
                    });
                }).catch(e => {console.log("Error requesting permission");});

                console.log("this.scanner");
            }
        }
    };
</script>

<style scoped>
    .scanBtn {
        height: 50;
    }
</style>