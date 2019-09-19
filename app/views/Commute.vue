<template>
    <Page class="page" actionBarHidden="true">
        <ScrollView class="mainContents">
            <StackLayout height="100%" width="100%">
                <StackLayout orientation="horizontal" class="titleArea">
                    <Label text="근태 현황" class="menuName" @tap="onDrawerButtonTap"></Label>
                </StackLayout>

                <StackLayout orientation="horizontal" class="optionsArea">
                    <Label :text="this.todayDay" width="80%"></Label>
                    <Label :text="this.$store.state.userInfo.dept_name" width="20%" class="deptName"></Label>
                </StackLayout>

                 <ListView for="item in listOfItems" @itemTap="onItemTap"  separatorColor="transparent" class="itemList">
                    <v-template>
                        <CommuteListComp :item="item" />
                    </v-template>
                </ListView>
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
    import * as utils from "~/service/utils/utils";
    import SelectedPageService from "~/service/utils/selected-page-service";
    import CommuteListComp from "../components/commute/Commute-List-Comp";

    export default {
        mounted() {
            SelectedPageService.getInstance().updateSelectedPage("Commute");
            var param = {};
            // param.startDate = this.todayDay;
            param.startDate = "2019-08-16";
            this.$store.dispatch('getCommuteData', param).then((res) => {
                this.listOfItems = this.$store.state.commuteList;
            })
        },
        components : {
            CommuteListComp
        },

        data() {
            return {
                listOfItems: [],
                todayDay: this.$moment(new Date()).format('YYYY-MM-DD')
            }
        },
        methods: {
            onDrawerButtonTap() {
                utils.showDrawer();
            },

            onItemTap(e){
                console.log(e.item);
            }
        }
    };
</script>

<style scoped>
    
</style>