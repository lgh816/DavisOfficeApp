<template>
    <StackLayout orientation="horizontal" class="borderContents">
        <StackLayout orientation="horizontal" class="contents" >
            <StackLayout>
                <Label text.decode="&#xf022;" class="fa icon" style="height:20px;" horizontalAlignment="center" />
            </StackLayout>

            <GridLayout columns="auto, *" rows="auto, auto, auto" marginLeft="10" >
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
    .fa.icon{
        height : 20px;
        color: blueviolet;
    }

    .contents{
        border-width: 1;
        border-color: rgb(173, 170, 170);
        padding: 5;
        font-size: 10;
        
    }

    .borderContents{
        padding-bottom:3;
    }

    .title{
        font-weight: bold;
    }


</style>
