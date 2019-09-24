<template>
    <ScrollView ref="scrollView">
        <StackLayout orientation="horizontal" class="borderContents">
            <StackLayout @tap="onHeaderTap" :id="item.submit_id" orientation="horizontal" class="contents" >
                <GridLayout columns="auto, *" rows="auto, auto, auto, auto, auto, auto, auto" marginLeft="10" class="eachGrid">
                    <Label row="0" col="0" :text="item.text" class="title"></Label>
                    <Label row="0" col="1" text.decode="&#xf103;" horizontalAlignment="right" class="fa icon"></Label>

                    <Label row="1" col="0" class="detailTitle" text="부서" :visibility="detailDataVisability"></Label>
                    <Label row="1" col="1" class="detailContent" :text="item.dept_name" horizontalAlignment="right" :visibility="detailDataVisability"></Label>

                    <Label row="2" col="0" class="detailTitle" text="이름" :visibility="detailDataVisability"></Label>
                    <Label row="2" col="1" class="detailContent" :text="item.name" horizontalAlignment="right" :visibility="detailDataVisability"></Label>

                    <Label row="3" col="0" class="detailTitle" text="근무타입" :visibility="detailDataVisability"></Label>
                    <Label row="3" col="1" class="detailContent" :text="item.out_office_name" horizontalAlignment="right" :visibility="detailDataVisability"></Label>

                    <Label row="4" col="0" class="detailTitle" text="시작시간" :visibility="detailDataVisability"></Label>
                    <Label row="4" col="1" class="detailContent" :text="item.start_time" horizontalAlignment="right" :visibility="detailDataVisability"></Label>

                    <Label row="5" col="0" class="detailTitle" text="종료시간" :visibility="detailDataVisability"></Label>
                    <Label row="5" col="1" class="detailContent" :text="item.end_time" horizontalAlignment="right" :visibility="detailDataVisability"></Label>

                    <Label row="6" col="0" class="detailTitle" text="비고" :visibility="detailDataVisability"></Label>
                    <Label row="6" col="1" class="detailContent" :text="item.memo" horizontalAlignment="right" :visibility="detailDataVisability"></Label>

                    <!-- 부서 -->
                    <!-- 이름 -->
                    <!-- 근무타입 -->
                    <!-- 시작시간 -->
                    <!-- 종료시간 -->
                    <!-- 비고 -->
                </GridLayout>
            </StackLayout>
        </StackLayout>
    </ScrollView>
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
                detailDataVisability: 'collapse'
            }
        },

        methods : {
            onHeaderTap: function() { // param : args
                // const buttonId = args.object.id;
                if (this.detailDataVisability == 'visible') {
                    this.detailDataVisability = 'collapse';
                } else {
                    this.detailDataVisability = 'visible'
                }
                this.$refs.scrollView.nativeView.scrollToVerticalOffset(0, false);
            }
        }
    }
</script>

<style scoped lang="css">
    
</style>
