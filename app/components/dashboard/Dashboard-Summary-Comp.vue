<template>
    <StackLayout orientation="horizontal" class="borderContents">
        <StackLayout orientation="horizontal" class="contents" >
            <StackLayout>
                <Label text.decode="&#xf022;" class="fa icon" style="height:20px;" horizontalAlignment="center" />
            </StackLayout>

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
    .borderContents{
        padding-bottom: 5;
    }

    .contents{
        border-width: 1;
        border-color: rgb(173, 170, 170);
        border-radius: 5;
        padding: 6;
        font-size: 17;
        margin-right: 5;
        margin-left: 5;
        height: 45;
    }

    .fa.icon{
        color: blueviolet;
    }   

    .title{
        font-weight: bold;
    }

    .eachGrid {
        vertical-align: middle;
    }

    .contentArea {
        background-color: rgb(185, 224, 240);
        padding-left: 5;
        padding-right: 5;
        border-radius: 10;
    }
</style>
