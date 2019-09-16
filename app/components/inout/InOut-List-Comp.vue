<template>
        <StackLayout orientation="horizontal" class="borderContents">
            <StackLayout orientation="horizontal" class="contents" >
                <StackLayout>
                    <Label text.decode="&#xf022;" class="fa icon" style="height:20px;" horizontalAlignment="center" />
                    <Label text="상세보기"  />
                </StackLayout>

                <GridLayout columns="auto, *" rows="auto, auto, auto" marginLeft="10" >
                    <Label row="0" col="0" :text="mergePartName" class="title"></Label>
                    <Label row="0" col="1" :text="item.sign_date" horizontalAlignment="right"></Label>
                    <Label row="1" col="0" :text="blankProcess(item.type)" class="title"></Label>
                    <Label row="1" col="1" :text="blankProcess(item.time)" horizontalAlignment="right"></Label>
                    <Label row="2" col="0" :text="blankProcess(item.days)" class="title"></Label>
                    <Label row="2" col="1" :text="blankProcess(item.period)" horizontalAlignment="right"></Label>
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
            mergePartName(){
                return this.item.part + " "  + this.item.name;
            }
            
        },

        data (){
            return {

            }
        },

        methods : {
            blankProcess(val){
                return val==""?"-":val;
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
