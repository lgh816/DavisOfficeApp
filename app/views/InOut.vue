<template>
    <Page class="page" actionBarHidden="true">
        <ScrollView class="mainContents">
            <StackLayout height="100%" width="100%">

                <!-- <GridLayout rows="auto, auto, auto, auto,  *"> -->
                    <StackLayout orientation="horizontal" class="titleArea">
                        <Label text="출입 기록" class="menuName" @tap="onDrawerButtonTap"></Label>
                        <Label :text="this.$store.state.userInfo.dept_name" class="deptName"></Label>
                    </StackLayout>

                    <StackLayout orientation="horizontal" class="optionsArea">
                        <DatePickerField
                            class="twoDateStyle"
                            @dateChange="onToDateChange"
                            :date="this.fromDay" />
                        <Label text="~" width="10%" style="text-align: center"></Label>
                        <DatePickerField
                            class="twoDateStyle"
                            @dateChange="onFromDateChange"
                            :date="this.toDay" />
                    </StackLayout>

                    <ListView v-show="this.$store.state.inOutList.length > 0 && this.$store.state.inOutList[0].text != 'No Data'" for="item in this.$store.state.inOutList" @itemTap="onItemTap"  separatorColor="transparent" class="itemList">
                        <v-template>
                            <InOutListComp :item="item" />
                        </v-template>
                    </ListView>

                    <StackLayout background-color="blue" row="2" v-show="this.$store.state.inOutList.length > 0 && this.$store.state.inOutList[0].text == 'No Data'">
                        <Label class="nodataMsg" text="No Data"/>
                    </StackLayout>

                    <!-- <ActivityIndicator rowSpan="6" class="pageLoadingStyle" :busy="processing"></ActivityIndicator>Z -->
                <!-- </GridLayout> -->

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
            /* param.start = "2019-09-10";
            param.end = "2019-09-17"; */
            param.start = this.fromDay;
            param.end = this.toDay;
            this.searchData(param);
            /* this.$store.dispatch('getInOutData', param).then(() => {
                this.listOfItems = this.$store.state.inOutList;
            }); */

        },

        components : {
            InOutListComp    
        },

        data (){
            return {
                // listOfItems: [],
                // noDataFlag: false,
                processing: false,
                toDay: this.$moment(new Date()).format('YYYY-MM-DD'),
                fromDay : this.$moment(new Date()).add(-7, 'day').format("YYYY-MM-DD"),
            }
        },

        methods : {
            searchData(param) {
                this.processing = true;
                this.$store.dispatch('getInOutData', param).then(() => {
                    // this.processing = false;
                    // this.listOfItems = this.$store.state.inOutList;
                    /* if (this.listOfItems[0].text == 'No Data') {
                        this.noDataFlag = true;
                    } else {
                        this.noDataFlag = false;
                    } */
                });
            },

            onDrawerButtonTap() {
                utils.showDrawer();
            },

            onToDateChange(args) {
                const changedDate = this.$moment(args.value).format('YYYY-MM-DD');
                this.fromDay = changedDate;
                const param = {};
                param.start = this.fromDay;
                param.end = this.toDay;
                this.searchData(param);
            },

            onFromDateChange(args) {
                const changedDate = this.$moment(args.value).format('YYYY-MM-DD');
                this.toDay = changedDate;
                const param = {};
                param.start = this.fromDay;
                param.end = this.toDay;
                this.searchData(param);
            },

            onItemTap(e){
                console.log(e.item);
            }
        }
    }
</script>

<style scoped>

</style>
