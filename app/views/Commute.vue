<template>
    <Page class="page" actionBarHidden="true">
        <ScrollView class="mainContents">
            <StackLayout height="100%" width="100%">
                <StackLayout orientation="horizontal"  marginBottom="5">
                    <Label text="iCon"  @tap="onDrawerButtonTap" marginRight="5"></Label>
                    <Label text="근태현황"></Label>
                </StackLayout>

                 <ListView for="item in listOfItems" @itemTap="onItemTap"  separatorColor="transparent" 
                            class="itemList">
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
    import * as CommuteService from  "../service/commute/commuteService";
    import CommuteListComp from "../components/commute_status/Commute-List-Comp";

    export default {
        mounted() {
            SelectedPageService.getInstance().updateSelectedPage("Commute");
            CommuteService.commuteToday().then((response) => {
                var result = response.data;
                this.listOfItems = result;
            });
        },
        components : {
            CommuteListComp
        },

        data() {
            return {
                listOfItems: []
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
    .mainContents{
        margin: 5;
    }
    .utmArea {
        border: 1;
        border-color: black;
    }

    .utmTitle {
        background-color: #5699e8;
        color: white;
        height: 25;
        font-size: 16;
        width: 100%;
        text-align: left;
        padding-left: 10;
        margin-top: 5;
    }

    .table {
        width: 100%;
        background-color: #fff;
    }

    .table-standings {
        border-width: 1 1 0 1;
        border-color: #e6eef4
    }

    .table-standings Label {
        white-space: nowrap;
        color: #5c6265;
        vertical-align: middle
    }

    .table .th {
        background-color: #e6eef4
    }

    .table .th Label {
        color: #00476d
    }

    .table .th,
    .table .td {
        padding: 10;
        border-color: #e6eef4
    }
    
</style>