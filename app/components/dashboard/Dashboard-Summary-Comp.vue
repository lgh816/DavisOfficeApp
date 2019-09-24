<template>
    <StackLayout orientation="horizontal" class="borderContents">
        <StackLayout orientation="horizontal" class="contents" >
            <!-- <StackLayout>
                <Label text.decode="&#xf022;" class="fa icon" style="height:20px;" horizontalAlignment="center" />
            </StackLayout> -->

            <GridLayout columns="auto, *" rows="auto, auto" marginLeft="10" class="eachGrid">
                <Label row="0" col="0" :text="item.text" class="title"></Label>
                <Label row="0" col="1" :text="item.data" horizontalAlignment="right" class="contentArea"></Label>
            </GridLayout>
        </StackLayout>
    </StackLayout>
</template>

<script>
    export default {
        props : ["item"],
        mounted () {
            
        },

        computed : {
            convertTitle(){
          
            }
        },

        data (){
            return {

            }
        }
    }
</script>

<style scoped lang="css">
    .contentArea {
        background-color: rgb(185, 224, 240);
        padding-left: 5;
        padding-right: 5;
        border-radius: 10;
    }
</style>
