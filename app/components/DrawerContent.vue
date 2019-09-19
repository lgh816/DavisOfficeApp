<template lang="html">
    <GridLayout rows="auto, *" class="sidedrawer sidedrawer-left">
        
        <StackLayout  row="0" class="sidedrawer-header">
            <StackLayout orientation="horizontal">
                <Image class="userLogo" src="~/images/menu/menuTopUser.png"></Image>
            </StackLayout>
            <StackLayout orientation="horizontal">
                <Label class="sidedrawer-header-brand" width="80%" :text="this.$store.state.userInfo.id"></Label>
            </StackLayout>
            <StackLayout orientation="horizontal">
                <Label class="sidedrawer-header-brand" width="70%" :text="this.$store.state.userInfo.name +' 님'"></Label>
                <Label class="sidedrawer-header-brand logout" text="로그아웃" width="30%" @tap="logoutAction"></Label>
            </StackLayout>
        </StackLayout>
    
        <ScrollView row="1" class="sidedrawer-content">
            <StackLayout>
                <GridLayout columns="auto, *" :class="'sidedrawer-list-item' + (selectedPage === 'Dashboard' ? ' selected': '')" @tap="onNavigationItemTap(Dashboard)">
                    <Image class="logo" src="~/images/menu/dashboard.png"></Image>
                    <Label col="1" text="Dashboard" class="sideMenu"></Label>
                </GridLayout>

                <StackLayout class="hr-light"></StackLayout>

                <GridLayout columns="auto, *" :class="'sidedrawer-list-item' + (selectedPage === 'InOut' ? ' selected': '')" @tap="onNavigationItemTap(InOut)">
                    <Image class="logo" src="~/images/menu/inOut.png"></Image>
                    <Label col="1" text="출입 기록" class="sideMenu"></Label>
                </GridLayout>

                <StackLayout class="hr-light"></StackLayout>

                <GridLayout columns="auto, *" :class="'sidedrawer-list-item' + (selectedPage === 'Commute' ? ' selected': '')" @tap="onNavigationItemTap(Commute)">
                    <Image class="logo" src="~/images/menu/commute.png"></Image>
                    <Label col="1" text="근태 현황" class="sideMenu"></Label>
                </GridLayout>

                <StackLayout class="hr-light"></StackLayout>

                <GridLayout columns="auto, *" :class="'sidedrawer-list-item' + (selectedPage === 'Approval' ? ' selected': '')" @tap="onNavigationItemTap(Approval)">
                    <Image class="logo" src="~/images/menu/approval.png"></Image>
                    <Label col="1" text="결재 현황" class="sideMenu"></Label>
                </GridLayout>

                <StackLayout class="hr-light"></StackLayout>

                <!-- <GridLayout columns="auto, *" :class="'sidedrawer-list-item' + (selectedPage === 'Settings' ? ' selected': '')" @tap="onNavigationItemTap(Settings)">
                    <Image class="logo" src="~/images/menu/approval.png"></Image>
                    <Label col="1" text="Settings" class="sideMenu"></Label>
                </GridLayout>

                <StackLayout class="hr-light"></StackLayout> -->
            </StackLayout>
        </ScrollView>
    </GridLayout>
</template>

<script>
    import Dashboard from "~/views/Dashboard";
    import Commute from "~/views/Commute";
    import Settings from "~/views/Settings";
    import Approval from "~/views/Approval";
    import InOut from "~/views/InOut";
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
                Commute : Commute,
                Approval : Approval,
                InOut : InOut,
                Settings: Settings,
                selectedPage: ""
            };
        },
        components: {
            Dashboard,
            Commute,
            Approval,
            InOut,
            Settings
        },
        methods: {
            onNavigationItemTap(component) {
                this.$navigateTo(component, {
                    clearHistory: true
                });
                utils.closeDrawer();
            },
            logoutAction() {
                console.log("Logout");
            }
        }
    };
</script>

<style scoped lang="scss">
    // Custom common variables
    @import '../app-variables';
    // Drawer navigation custom styles
    $sidedrawer-header-image-offset-top: 0;
    $sidedrawer-header-image-offset-bottom: 5;
    $sidedrawer-list-item-offset-left: 15;
    $sidedrawer-list-icon-offset: 10;
    $sidedrawer-list-icon-size: 20;
    .sidedrawer {
        &.sidedrawer-left {
            .sidedrawer-header-image {
                /* color: $background-dark; */
                padding: 0;
                margin-bottom: $sidedrawer-header-image-offset-bottom;
                margin-top: $sidedrawer-header-image-offset-top;
            }
        }

        .sidedrawer-header {
            /* background-color: $ab-background; */
            background-image: url("~/images/menu/menuTopBg.png");
            background-repeat: no-repeat;
            height: 133;
            padding-left: 20;
            .sidedrawer-header-brand {
                color: $ab-color;
                font-size: 18;
                padding-top: 2;
                .logout {
                    font-size: 10 !important;
                }
            }
            .userLogo {
                width: 50;
                height: 50;
            }
            .icon {
                width: 25;
                height: 25;
            }
        }

        .sidedrawer-content {
            /* background-color: $side-drawer-background; */
            background-color: #405481;
            opacity: 0.9;
            .logo {
                width: 25;
                height: 25;
            }
            .sideMenu {
                font-size: 18;
                color: white;
                padding-left: 10;
            }
        }

        .sidedrawer-list-item {
            padding-left: $sidedrawer-list-item-offset-left;

            Label {
                vertical-align: center;
                /* color: $blue-dark; */
            }

            .fa {
                width: $sidedrawer-list-icon-size;
                margin-right: $sidedrawer-list-icon-offset;
            }

            &.selected {
                Label {
                    color: #9cff00;
                }
            }
        }
    }
</style>