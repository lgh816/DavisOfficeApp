<template>
    <Page class="page" actionBarHidden="true">
        <!-- <ActionBar class="action-bar">
            <NavigationButton ios:visibility="collapsed" icon="res://menu" @tap="onDrawerButtonTap"></NavigationButton>
            <ActionItem icon="res://navigation/menu" 
                android:visibility="collapsed" 
                @tap="onDrawerButtonTap"
                ios.position="left">
            </ActionItem>
            <StackLayout backgroundColor="rgba(0,0,0,0.5)">
                <Label class="action-bar-title" text="결제현황"></Label>
                <Label text="결제현황1"></Label>
            </StackLayout>
        </ActionBar> -->

<<<<<<< HEAD
        <ScrollView class="mainContents">
            <StackLayout height="100%" width="100%">
                <StackLayout orientation="horizontal"  marginBottom="5">
                    <Label text="iCon"  @tap="onDrawerButtonTap" marginRight="5"></Label>
                    <Label text="결제관리"  ></Label>
                </StackLayout>

                <!-- <FlexboxLayout class="page" flexDirection="column" >
                    <ListComp v-for="item in dataProvider" :item="item"></ListComp>
                </FlexboxLayout> -->
             
                 <ListView for="item in dataProvider" @itemTap="onItemTap"  separatorColor="transparent" 
                            class="itemList">
                    <v-template>
                        <ListComp :item="item" />
                    </v-template>
                </ListView>
                
            </StackLayout>

            
=======
        <ScrollView>
            <FlexboxLayout class="page">
            </FlexboxLayout>
>>>>>>> b0b238016b3f8d780a71a22438baecc8ad9cf2e1

        </ScrollView>

    </Page>
</template>

<script>

    import * as utils from "~/service/utils/utils"
    import SelectedPageService from "~/service/utils/selected-page-service";

    export default {
        mounted(){

        },

        data (){
            return {

            }
        },

        methods : {
             onDrawerButtonTap() {
                utils.showDrawer();
            }
        }
    }
<<<<<<< HEAD
</script>

<style scoped lang="css">
    .mainContents{
        margin: 5;
    }

    
</style>
=======
</script>
>>>>>>> b0b238016b3f8d780a71a22438baecc8ad9cf2e1
