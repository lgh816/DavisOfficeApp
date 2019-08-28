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

        <ScrollView>
            <FlexboxLayout class="page">
            </FlexboxLayout>

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
</script>