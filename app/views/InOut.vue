<template>
    <Page class="page" actionBarHidden="true">
        <ScrollView class="mainContents">
            <StackLayout height="100%" width="100%">
                <StackLayout orientation="horizontal" class="titleArea">
                    <Label text="출입 기록" class="menuName" @tap="onDrawerButtonTap"></Label>
                </StackLayout>

                <StackLayout orientation="horizontal" class="optionsArea">
                    <Label :text="this.todayDay" width="80%"></Label>
                    <Label :text="this.$store.state.userInfo.dept_name" width="20%" class="deptName"></Label>
                </StackLayout>

                <ListView for="item in listOfItems" @itemTap="onItemTap"  separatorColor="transparent" class="itemList">
                    <v-template>
                        <InOutListComp :item="item" />
                    </v-template>
                </ListView>
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>

    import * as utils from "~/service/utils/utils"
    import SelectedPageService from "~/service/utils/selected-page-service";
    import InOutListComp from "../components/inout/InOut-List-Comp";

    export default {
        mounted(){
            SelectedPageService.getInstance().updateSelectedPage("InOut");
            var param = {};
            param.start = "2019-09-10";
            param.end = "2019-09-17";
            this.$store.dispatch('getInOutData', param).then(() => {
                this.listOfItems = this.$store.state.inOutList;
            });
        },

        components : {
            InOutListComp    
        },

        data (){
            return {
                listOfItems: [],
                todayDay: this.$moment(new Date()).format('YYYY-MM-DD')
            }
        },

        

        methods : {
             onDrawerButtonTap() {
                utils.showDrawer();
            },

            onItemTap(e){
                console.log(e.item);
            }
        }
    }
</script>

<style scoped>

</style>
