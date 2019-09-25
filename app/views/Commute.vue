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

                <!-- <StackLayout>
                    <SearchBar class="searchBarStyle" hint="Search" :text="searchPhrase" @textChange="onTextChanged" @submit="onSubmit" /> 
                </StackLayout> -->

                <ListView for="item in listOfItems" separatorColor="transparent" class="itemList">
                    <v-template class="commuteTemplate">
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
            const param = {};
            param.startDate = this.todayDay;
            this.searchData(param);
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
                listOfItems: [],
                todayDay: this.$moment(new Date()).format('YYYY-MM-DD')
            }
        },
        methods: {
            searchData(param) {
                this.$store.dispatch('getCommuteData', param).then((res) => {
                    this.listOfItems = this.$store.state.commuteList;
                })
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

            onTextChanged() {
                console.log("TEXT Changed");
            },

            onSubmit() {
                console.log("Search Submit");
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