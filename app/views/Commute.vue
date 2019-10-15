<template>
    <Page class="page" actionBarHidden="true">
        <ScrollView class="mainContents">
            <StackLayout height="100%" width="100%">
                <StackLayout orientation="horizontal" class="titleArea">
                    <Label text="근태 현황" class="menuName" @tap="onDrawerButtonTap"></Label>
                    <Label :text="this.$store.state.userInfo.dept_name" class="deptName"></Label>
                </StackLayout>

                <StackLayout orientation="horizontal" class="optionsArea">
                    <DatePickerField
                        class="oneDateStyle"
                        @dateChange="onDateChange"
                        :date="todayDay" />
                </StackLayout>

                <StackLayout>
                    <SearchBar ref="searchBar" class="searchBarStyle" hint="이름" @textChange="onTextChanged" @submit="searchName" /> 
                </StackLayout>

                <ListView v-show="this.$store.state.commuteList.length > 0 && this.$store.state.commuteList[0].text != 'No Data'" for="item in this.$store.state.commuteList" separatorColor="transparent" class="itemList">
                    <v-template class="commuteTemplate">
                        <CommuteListComp :item="item" />
                    </v-template>
                </ListView>

                <StackLayout v-show="this.$store.state.commuteList.length > 0 && this.$store.state.commuteList[0].text == 'No Data'">
                    <Label class="nodataMsg" text="No Data"/>
                </StackLayout>

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
            const param = {};
            param.startDate = this.todayDay;
            this.searchData(param);
            setTimeout(() => {
                this.$refs.searchBar.nativeView.dismissSoftInput();
            }, 300);
            
            // param.startDate = "2019-08-16";
            /* this.$store.dispatch('getCommuteData', param).then((res) => {
                this.listOfItems = this.$store.state.commuteList;
            }) */
        },
        components : {
            CommuteListComp
        },

        data() {
            return {
                // listOfItems: this.$store.state.commuteList,
                // noDataFlag: false,
                todayDay: this.$moment(new Date()).format('YYYY-MM-DD')
            }
        },
        methods: {
            searchData(param) {
                this.$store.dispatch('getCommuteData', param).then(() => {
                    /* if (this.$store.state.commuteList[0].text == 'No Data') {
                        this.noDataFlag = true;
                    } else {
                        this.noDataFlag = false;
                    } */
                });
                //this.hideKeyboard();
            },

            onDrawerButtonTap() {
                utils.showDrawer();
            },

            onDateChange(args) {
                const changedDate = this.$moment(args.value).format('YYYY-MM-DD');
                const param = {};
                param.startDate = changedDate;
                this.searchData(param);
            },

            onTextChanged(args) {
                if (args.value == '') {
                    this.$store.commit("searchInitCommuteData");
                }
            },

            searchName(args) {
                const param = args.object.text;
                this.$store.commit("searchCommuteData", param);

                //this.hideKeyboard();
            }
        }
    };
</script>

<style scoped>
    .searchBarStyle {
        border-width: 1;
        border-color: rgb(173, 170, 170);
        border-radius: 5;
        margin-right: 5;
        margin-left: 5;
        height: 45;
    }
</style>