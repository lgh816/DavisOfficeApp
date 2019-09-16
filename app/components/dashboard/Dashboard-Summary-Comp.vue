<template>
    <StackLayout orientation="horizontal" class="borderContents">
        <StackLayout orientation="horizontal" class="contents" >
            <StackLayout>
                <Label text.decode="&#xf022;" class="fa icon" style="height:20px;" horizontalAlignment="center" />
            </StackLayout>

            <GridLayout columns="auto, *" rows="auto, auto" marginLeft="10">
                <Label row="0" col="0" :text="item.text" class="title"></Label>
                <Label row="0" col="1" :text="item.data" horizontalAlignment="right"></Label>
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
        padding-bottom: 6;
    }

    .contents{
        border-width: 1;
        border-color: rgb(173, 170, 170);
        padding: 6;
        font-size: 12;
        margin-right: 5;
        margin-left: 5;
    }

    .fa.icon{
        height : 20px;
        color: blueviolet;
    }   

    .title{
        font-weight: bold;
    }
</style>
