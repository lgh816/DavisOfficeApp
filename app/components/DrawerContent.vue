<template lang="html">
    <GridLayout rows="auto, *" class="sidedrawer sidedrawer-left">
        
        <StackLayout  row="0" class="sidedrawer-header">
            <StackLayout orientation="horizontal">
                <Image class="userLogo" src="~/images/menu/menuTopUser.png" @tap="clickImage"></Image>
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
                    <Label col="1" text="결재 관리" class="sideMenu"></Label>
                </GridLayout>

                <StackLayout class="hr-light"></StackLayout>

                <GridLayout columns="auto, *" :class="'sidedrawer-list-item' + (selectedPage === 'ItemUsage' ? ' selected': '')" @tap="onNavigationItemTap(ItemUsage)">
                    <Image class="logo" src="~/images/menu/asset.png"></Image>
                    <Label col="1" text="자산 조회" class="sideMenu"></Label>
                </GridLayout>

                <StackLayout class="hr-light"></StackLayout>

                <!-- <GridLayout v-show="this.$store.state.userInfo.admin == 9" columns="auto, *" :class="'sidedrawer-list-item' + (selectedPage === 'DateDemo' ? ' selected': '')" @tap="onNavigationItemTap(DateDemo)">
                    <Image class="logo" src="~/images/menu/approval.png"></Image>
                    <Label col="1" text="DateDemo" class="sideMenu"></Label>
                </GridLayout>

                <StackLayout v-show="this.$store.state.userInfo.admin == 9" class="hr-light"></StackLayout> -->

            </StackLayout>
        </ScrollView>
    </GridLayout>
</template>

<script>
    import Dashboard from "~/views/Dashboard";
    import Commute from "~/views/Commute";
    import ItemUsage from "~/views/ItemUsage";
    import Approval from "~/views/Approval";
    import DateDemo from "~/views/DateDemo";
    import InOut from "~/views/InOut";
    import * as utils from "~/service/utils/utils";
    import SelectedPageService from "~/service/utils/selected-page-service";    
    import { exit } from 'nativescript-exit';
    
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
                ItemUsage: ItemUsage,
                DateDemo: DateDemo,
                selectedPage: "",
                count: 0
            };
        },
        components: {
            Dashboard,
            Commute,
            Approval,
            InOut,
            ItemUsage,
            DateDemo
        },
        methods: {
            onNavigationItemTap(component) {
                this.$navigateTo(component, {
                    clearHistory: true
                });
                utils.closeDrawer();
            },
            logoutAction() {
                this.$store.dispatch('logoutAction').then((res) => {
                    exit();
                });
            },
            clickImage() {
                this.count += 1;
                if (this.count == 10) {
                    console.log("test");
                    this.count = 0;
                }
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
        .sidedrawer-header {
            /* background-color: $ab-background; */
            background-image: url("~/images/menu/menuTopBg.png");
            background-repeat: no-repeat;
            background-size: 100% 100%;
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
                width: 45;
                height: 45;
                margin-left: 5;
            }
            .icon {
                width: 25;
                height: 25;
            }
        }

        .sidedrawer-content {
            /* background-color: $side-drawer-background; */
            background-color: #405481;
            /* opacity: 0.9; */
            .logo {
                width: 25;
                height: 25;
            }
            .sideMenu {
                font-size: 18;
                color: white;
                padding-left: 10;
            }
            .hr-light {
                opacity: 0.2;
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