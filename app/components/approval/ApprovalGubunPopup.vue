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
                this.$modal.close();
            }
        }
    };
</script>

<style lang="css">
    .gubunPopup {
        width: 90%;
    }
    .gubunPopupStyle {
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