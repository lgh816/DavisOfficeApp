<template>
    <StackLayout orientation="horizontal" class="borderContents">
        <StackLayout orientation="horizontal" class="contents" >
            <StackLayout>
                <Label text.decode="&#xf022;" class="fa icon" style="height:20px;" horizontalAlignment="center" />
            </StackLayout>

            <GridLayout columns="auto, *" rows="auto, auto, auto" marginLeft="10" >
                <Label row="0" col="0" :text="item.text" class="title"></Label>
                <Label row="0" col="1" text.decode="&#xf103;" horizontalAlignment="right" class="fa icon"></Label>
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
        /*  
            approval_ok : "결재완료"
            date : "2019-09-03"
            dept_name : "연구3팀"
            start_time : "09:00"
            end_time : "18:00"
            memo : "외근 상신 부탁"
            name : "이기환"
            out_office_name : "외근"
            submit_id : "140601"
        */
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

</style>
