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
