<template lang="html">
    <GridLayout rows="auto, *" class="sidedrawer sidedrawer-left">
        <StackLayout row="0" class="sidedrawer-header">
            <Label class="sidedrawer-header-brand" text="User Name"></Label>
            <Label class="sidedrawer-header-brand" text="userMail@yescnc.co.kr"></Label>
        </StackLayout>
    
        <ScrollView row="1" class="sidedrawer-content">
            <StackLayout>
                <GridLayout columns="auto, *" :class="'sidedrawer-list-item' + (selectedPage === 'Dashboard' ? ' selected': '')" @tap="onNavigationItemTap(Dashboard)">
                    <Label col="0" text.decode="&#xf200;" class="fa"></Label>
                    <Label col="1" text="Dashboard" class="p-r-10"></Label>
                </GridLayout>

                <GridLayout columns="auto, *" :class="'sidedrawer-list-item' + (selectedPage === 'Utm' ? ' selected': '')" @tap="onNavigationItemTap(Utm)">
                    <Label col="0" text.decode="&#xf022;" class="fa"></Label>
                    <Label col="1" text="UTM" class="p-r-10"></Label>
                </GridLayout>

                <GridLayout columns="auto, *" :class="'sidedrawer-list-item' + (selectedPage === 'Commute' ? ' selected': '')" @tap="onNavigationItemTap(Commute)">
                    <Label col="0" text.decode="&#xf022;" class="fa"></Label>
                    <Label col="1" text="근태 현황" class="p-r-10"></Label>
                </GridLayout>

                <GridLayout columns="auto, *" :class="'sidedrawer-list-item' + (selectedPage === 'Sign' ? ' selected': '')" @tap="onNavigationItemTap(Sign)">
                    <Label col="0" text.decode="&#xf022;" class="fa"></Label>
                    <Label col="1" text="결재 현황" class="p-r-10"></Label>
                </GridLayout>

                <StackLayout class="hr-light"></StackLayout>

                <GridLayout columns="auto, *" :class="'sidedrawer-list-item' + (selectedPage === 'Settings' ? ' selected': '')" @tap="onNavigationItemTap(Settings)">
                    <Label col="0" text.decode="&#xf013;" class="fa"></Label>
                    <Label col="1" text="Settings" class="p-r-10"></Label>
                </GridLayout>
            </StackLayout>
        </ScrollView>
    </GridLayout>
</template>

<script>
    import Dashboard from "~/views/Dashboard";
    import Utm from "~/views/Utm";
    import Commute from "~/views/Commute";
    import Settings from "~/views/Settings";
    import Sign_Status from "~/views/Sign_Status";
    import * as utils from "~/service/utils/utils";
    import SelectedPageService from "~/service/utils/selected-page-service";    
    
    export default {
        mounted() {
            SelectedPageService.getInstance().selectedPage$
                .subscribe((selectedPage) => this.selectedPage = selectedPage);
        },
        data () {
            return {
                Dashboard: Dashboard,
                Utm: Utm,
                Commute : Commute,
                Sign : Sign_Status,
                Settings: Settings,
                selectedPage: ""
            };
        },
        components: {
            Dashboard,
            Utm,
            Commute,
            Sign_Status,
            Settings
        },
        methods: {
            onNavigationItemTap(component) {
                this.$navigateTo(component, {
                    clearHistory: true
                });
                utils.closeDrawer();
            }
        }
    };
</script>

<style scoped lang="scss">
    // Custom common variables
    @import '../app-variables';

    // Drawer navigation custom styles
    $sidedrawer-header-image-offset-top: 20;
    $sidedrawer-header-image-offset-bottom: 5;
    $sidedrawer-list-item-offset-left: 15;
    $sidedrawer-list-icon-offset: 10;
    $sidedrawer-list-icon-size: 20;
    .sidedrawer {
        &.sidedrawer-left {
            background-color: $ab-background;

            .sidedrawer-header-image {
                color: $background-dark;
                padding: 0;
                margin-bottom: $sidedrawer-header-image-offset-bottom;
                margin-top: $sidedrawer-header-image-offset-top;
            }

            .footnote {
                color: rgba($ab-color, 0.5);
            }
        }

        .sidedrawer-header {
            background-color: $ab-background;
            height: 70;
            .sidedrawer-header-brand {
                color: $ab-color;
            }
        }

        .sidedrawer-content {
            background-color: $side-drawer-background;
        }

        .sidedrawer-list-item {
            padding-left: $sidedrawer-list-item-offset-left;

            Label {
                vertical-align: center;
                color: $blue-dark;
            }

            .fa {
                width: $sidedrawer-list-icon-size;
                margin-right: $sidedrawer-list-icon-offset;
            }

            &.selected {
                background-color: $item-active-background;

                Label {
                    color: $item-active-color;
                }
            }
        }
    }
</style>