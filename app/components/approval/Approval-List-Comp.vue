<template>
    <StackLayout orientation="horizontal" class="borderContents">
        <StackLayout orientation="horizontal" class="contents" >
            <StackLayout>
                <Label text.decode="&#xf022;" class="fa icon" style="height:20px;" horizontalAlignment="center" />
                <Label text="상세보기"/>
            </StackLayout>

            <GridLayout columns="auto, *" rows="auto, auto, auto" marginLeft="10" >
                <Label row="0" col="0" :text="item.submit_name" class="title"></Label>
                <Label row="0" col="1" :text="decideDateCnvt" horizontalAlignment="right"></Label>
                <Label row="1" col="0" :text="item.office_code_name" class="title"></Label>
                <Label row="1" col="1" :text="outOffiecCnvt" horizontalAlignment="right"></Label>
                <Label v-show="item.day_count > 0" row="2" col="0" :text="item.day_count + '일'" class="title"></Label>
                <Label row="2" col="1" :text="periodCnvt" horizontalAlignment="right"></Label>
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
            decideDateCnvt() {
                var date = this.item.decide_date;
                if (_.isNull(date)) {
                    return "-";
                }
                var resultDate = this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
                return resultDate;
            },
            outOffiecCnvt() {
                var type = this.item.office_code_name;
                if(type == "외근") {
                    var startTime = this.item.start_time;
                    var endTime = this.item.end_time;
                    return startTime + " ~ " + endTime;
                }
            },
            periodCnvt() {
                var startDate = this.item.start_date;
                var endDate = this.item.end_date;
                if (startDate == endDate) {
                    return startDate;
                } else {
                    return startDate + " ~ " + endDate;
                }
            }
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

    .borderContents{
        padding-bottom:6;
    }

    .title{
        font-weight: bold;
    }


</style>
