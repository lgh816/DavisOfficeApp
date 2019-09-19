<template>
        <StackLayout orientation="horizontal" class="borderContents">
            <StackLayout orientation="horizontal" class="contents" >
                <StackLayout>
                    <Label text.decode="&#xf022;" class="fa icon" style="height:20px;" horizontalAlignment="center" />
                </StackLayout>

                <GridLayout columns="auto, *" rows="auto, auto, auto" marginLeft="10" >
                    <Label row="0" col="0" :text="item.name" class="title"></Label>
                    <Label row="0" col="1" rowSpan="2" :text="item.char_date" class="contentsss" horizontalAlignment="right"></Label>
                    <Label row="1" col="0" :text="item.type" class="title"></Label>
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
            
        },

        data (){
            return {

            }
        },

        methods : {
        
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
        height: 60;
    }
    
    .fa.icon{
        color: blueviolet;
    }   

    .title{
        font-weight: bold;
    }
    .contentsss {
        width: 100%;
        text-align: right;
        vertical-align: middle;
    }
</style>
