<template>
        <StackLayout orientation="horizontal" class="borderContents">
            <StackLayout orientation="horizontal" class="contents" >
                <StackLayout>
                    <Label text.decode="&#xf022;" class="fa icon" style="height:20px;" horizontalAlignment="center" />
                    <Label text="상세보기"  />
                </StackLayout>

                <GridLayout columns="auto, *" rows="auto, auto, auto" marginLeft="10" >
                    <Label row="0" col="0" :text="item.submit_name" class="title"></Label>
                    <Label row="0" col="1" :text="item.submit_date" horizontalAlignment="right"></Label>
                    <Label row="1" col="0" :text="item.office_code_name" class="title"></Label>
                    <!-- <Label row="1" col="1" :text="item.submit_date" horizontalAlignment="right"></Label> -->
                    <Label v-show="item.day_count > 0" row="2" col="0" :text="item.day_count + '일'" class="title"></Label>
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
    .fa.icon{
        height : 20px;
        color: blueviolet;
    }

    .contents{
        border-width: 1;
        border-color: rgb(173, 170, 170);
        padding: 5;
        font-size: 12;
        margin-right: 5;
        margin-left: 5;
    }

    .borderContents{
        padding-bottom:6;
    }

    .title{
        font-weight: bold;
    }


</style>
