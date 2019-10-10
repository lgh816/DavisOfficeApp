<template>
    <ScrollView class="gubunPopup">
        <StackLayout class="gubunPopupStyle">
            <ListView for="item in this.$store.state.approvalGubunList" @itemTap="selectedItem">
                <v-template>
                    <Label :text="item.name" class="listItem"/>
                </v-template>
            </ListView>
        </StackLayout>
    </ScrollView>
</template>

<script>
    export default {
        methods: {
            selectedItem(event) {
                this.$store.state.selectedGubunData = event.item;
                const code = event.item.code;

                if (code == 'V01' || code == 'V04' || code == 'V05' || code == 'V06' || code == 'W02' || code == 'W03' || code == 'W04' || code == 'E01') {
                    // Show 'From' and 'To' DatePicker
                    this.$store.state.towDatePicker = true;
                    this.$store.state.oneDatePicker = false;
                } else if (code == 'V02' || code == 'V03' || code == 'V07' || code == 'V08' || code == 'B01' || code == 'W01') {
                    // Show a 'To' DatePicker
                    this.$store.state.towDatePicker = false;
                    this.$store.state.oneDatePicker = true;
                }

                if (code == 'V01' || code == 'V02' || code == 'V03' || code == 'E01') {
                    // Show 'Left days' and 'Request days' Area
                    this.$store.state.leftDateArea = true;
                    this.$store.state.requestDateArea = true;
                } else if (code == 'V04' || code == 'V05' || code == 'V06' || code == 'V07' || code == 'V08' || code == 'W02' || code == 'W03' || code == 'W04') {
                    // Show a 'Request days' Area
                    this.$store.state.leftDateArea = false;
                    this.$store.state.requestDateArea = true;
                } else if (code == 'W01' || code == 'B01') { // 외근
                    // All Hide Day
                    this.$store.state.leftDateArea = false;
                    this.$store.state.requestDateArea = false;
                }

                if (code == 'V02' || code == 'V03' || code == 'V07' || code == 'V08') {
                    this.$store.state.approvalData.day_count = 0.5;
                } else {
                    this.$store.commit('getRequestDateCount');
                }
                this.$modal.close();
            }
        }
    };
</script>

<style lang="css">
    /* .gubunPopup {
        height: 70%;
    } */
    .gubunPopupStyle {
        width: 70%;
        height: 70%;
    }
    .listItem {
        width: 100%;
        height: 100%;
        padding-left: 12;
        padding-bottom: 10;
        padding-top: 10;
    }
</style>