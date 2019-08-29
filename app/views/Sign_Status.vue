<template>
    <Page class="page">
        <ActionBar class="action-bar">
            <NavigationButton ios:visibility="collapsed" icon="res://menu" @tap="onDrawerButtonTap"></NavigationButton>
            <ActionItem icon="res://navigation/menu" 
                android:visibility="collapsed" 
                @tap="onDrawerButtonTap"
                ios.position="left">
            </ActionItem>
            <Label class="action-bar-title" text="결제현황"></Label>
        </ActionBar>

        <ScrollView class="mainContents">
            <ListView ref="listview" for="item in dataProvider" @itemTap="onItemTap"  separatorColor="transparent" 
                        class="itemList">
                <v-template>
                    <ListComp :item="item" />
                </v-template>
            </ListView>
            <!-- <FlexboxLayout class="page" flexDirection="column" >
                <ListComp v-for="item in dataProvider" :item="item"></ListComp>
            </FlexboxLayout> -->
             

        </ScrollView>

    </Page>
</template>

<script>

    import * as utils from "~/service/utils/utils"
    import SelectedPageService from "~/service/utils/selected-page-service";
    import ListComp from "../components/sign_status/Sign-List-Comp";

    export default {
        mounted(){

        },

        components :{
            ListComp
        },

        data (){
            return {
                dataProvider : [
                    {part:'연구1팀', name : '김현진', type : '외근', sign_date : '2019-08-27 09:20:12', period : '2019-08-27', time:'09:00 ~ 18:00', days:'5일'},
                    {part:'연구1팀', name : '김현진', type : '장기외근', sign_date : '2019-08-27 09:20:12', period : '2019-08-27 ~ 2019-08-31', time:'', days:''},
                    {part:'연구1팀', name : '김현진', type : '연차휴가', sign_date : '2019-08-27 09:20:12', period : '2019-08-27 ~ 2019-08-31 ', time:'', days:'5일'},
                    {part:'연구1팀', name : '김현진', type : '오전반차', sign_date : '2019-08-27 09:20:12', period : '2019-08-27', time:'', days:'0.5일'},
                    {part:'연구1팀', name : '김현진', type : '초과근무', sign_date : '2019-08-27 09:20:12', period : '2019-08-27', time:'', days:''},
                    {part:'연구1팀', name : '김현진', type : '외근', sign_date : '2019-08-27 09:20:12', period : '2019-08-27', time:'09:00 ~ 18:00', days:'5일'},
                    {part:'연구1팀', name : '김현진', type : '장기외근', sign_date : '2019-08-27 09:20:12', period : '2019-08-27 ~ 2019-08-31', time:'', days:''},
                    {part:'연구1팀', name : '김현진', type : '연차휴가', sign_date : '2019-08-27 09:20:12', period : '2019-08-27 ~ 2019-08-31 ', time:'', days:'5일'},
                    {part:'연구1팀', name : '김현진', type : '오전반차', sign_date : '2019-08-27 09:20:12', period : '2019-08-27', time:'', days:'0.5일'},
                    {part:'연구1팀', name : '김현진', type : '초과근무', sign_date : '2019-08-27 09:20:12', period : '2019-08-27', time:'', days:''}
                ]

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

<style scoped lang="css">
    .mainContents{
        margin: 5;
    }
</style>