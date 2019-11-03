<template>
    <ScrollView ref="scrollView">
        <StackLayout orientation="horizontal" class="borderContents">
            <StackLayout @tap="onHeaderTap" :id="item.submit_id" orientation="horizontal" class="contents" >
                <GridLayout columns="auto, auto, *" rows="auto, auto, auto, auto, auto, auto, auto, auto" marginLeft="10" class="eachGrid">
                    <Image row="0" col="0" rowSpan="3" :src="item.img" class="iconStyle"></Image>
                    <Label row="0" col="1" :text="item.text" class="title"></Label>

                    <Label row="1" col="1" v-show="item.text != 'No Data'" class="officeType" horizontalAlignment="left" :text="item.out_office_name"></Label>
                    <Label row="1" col="2" class="detailContent" :text="item.outOfficeTime" horizontalAlignment="right"></Label>
                    
                    <Label row="2" col="1" colSpan="2" class="detailContent" :text="item.memo" horizontalAlignment="left"></Label>
                    <Label row="2" col="2" text="상세보기" horizontalAlignment="right" class="detailInfo"></Label>

                    <Label row="3" col="0" class="detailTitle firstDetailInfo" text="날짜" :visibility="detailDataVisability"></Label>
                    <Label row="3" col="1" class="detailContent firstDetailInfo" colSpan="2" horizontalAlignment="right" :text="item.date" :visibility="detailDataVisability"></Label>

                    <Label row="4" col="0" class="detailTitle" text="시작시간" :visibility="detailDataVisability"></Label>
                    <Label row="4" col="1" class="detailContent" colSpan="2" horizontalAlignment="right" :text="item.start_time" :visibility="detailDataVisability"></Label>

                    <Label row="5" col="0" class="detailTitle" text="종료시간" :visibility="detailDataVisability"></Label>
                    <Label row="5" col="1" class="detailContent" colSpan="2" horizontalAlignment="right" :text="item.end_time" :visibility="detailDataVisability"></Label>

                    <Label row="6" col="0" class="detailTitle" text="비고" :visibility="detailDataVisability"></Label>
                    <Label row="6" col="1" class="detailContent" colSpan="2" horizontalAlignment="right" :text="item.memo" :visibility="detailDataVisability"></Label>
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
                detailDataVisability: 'collapse',
                selectedBtn: null,
                _expandedId: null
            }
        },

        methods : {
            onHeaderTap: function(args) {
                this.selectedBtn = args.object.id;
                const isCurrentlyExpanded = this.selectedBtn === this._expandedId;
                if (isCurrentlyExpanded) {
                    this.expandCollapse(null);
                } else {
                    this.expandCollapse(this.selectedBtn);
                }
                this.$refs.scrollView.nativeView.scrollToVerticalOffset(0, false);
            },
            expandCollapse: function(expandId) {
                this.detailDataVisability = expandId === this.selectedBtn ? 'visible' : 'collapse';
                this._expandedId = expandId;
            },
        }
    }
</script>

<style scoped lang="css">
    
</style>
