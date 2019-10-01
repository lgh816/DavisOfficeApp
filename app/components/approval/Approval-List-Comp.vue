<template>
    <ScrollView ref="scrollView">
        <StackLayout orientation="horizontal" class="borderContents">
            <StackLayout @tap="onHeaderTap" :id="item.submit_id" orientation="horizontal" class="contents" >
                <GridLayout columns="auto, auto, *" rows="auto, auto, auto, auto, auto, auto, auto" marginLeft="10" class="eachGrid">
                    <Image row="0" col="0" rowSpan="2" :src="item.img" class="iconStyle"></Image>
                    <Label row="0" col="1" :text="item.text" class="title"></Label>
                    
                    <Label row="1" col="1" class="officeType" horizontalAlignment="left" :text="item.office_code_name"></Label>
                    <Label row="1" col="2" text="상세보기" horizontalAlignment="right" class="detailInfo"></Label>

                    <Label row="2" col="0" class="detailTitle firstDetailInfo" text="신청일자" :visibility="detailDataVisability"></Label>
                    <Label row="2" col="1" colSpan="2" class="detailContent firstDetailInfo" :text="requestDateCnvt" horizontalAlignment="right" :visibility="detailDataVisability"></Label>

                    <Label row="3" col="0" class="detailTitle" text="처리일자" :visibility="detailDataVisability"></Label>
                    <Label row="3" col="1" colSpan="2" class="detailContent" :text="decideDateCnvt" horizontalAlignment="right" :visibility="detailDataVisability"></Label>

                    <Label row="4" col="0" class="detailTitle" text="신청기간" :visibility="detailDataVisability"></Label>
                    <Label row="4" col="1" colSpan="2" class="detailContent" :text="item.periodCnvt" horizontalAlignment="right" :visibility="detailDataVisability"></Label>

                    <Label row="5" col="0" class="detailTitle" text="신청일수" :visibility="detailDataVisability"></Label>
                    <Label row="5" col="1" colSpan="2" class="detailContent" v-show="item.day_count > 0" :text="item.day_count + '일'" horizontalAlignment="right" :visibility="detailDataVisability"></Label>

                    <Label row="6" col="0" class="detailTitle" text="외근시간" :visibility="detailDataVisability"></Label>
                    <Label row="6" col="1" colSpan="2" class="detailContent" :text="item.outOfficeTime" horizontalAlignment="right" :visibility="detailDataVisability"></Label>

                    <!-- <Label row="6" col="0" class="detailTitle" text="비고" :visibility="detailDataVisability"></Label>
                    <Label row="6" col="1" class="detailContent" :text="item.submit_comment" horizontalAlignment="right" :visibility="detailDataVisability"></Label> -->
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
        data() {
            return {
                detailDataVisability: 'collapse',
                selectedBtn: null,
                _expandedId: null
            }
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
            requestDateCnvt() {
                var date = this.item.submit_date;
                if (_.isNull(date)) {
                    return "-";
                }
                var resultDate = this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
                return resultDate;
            }
        },

        methods : {
            onHeaderTap: function(args) { // param : args
                //const buttonId = args.object.id;
                this.selectedBtn = args.object.id;
                const isCurrentlyExpanded = this.selectedBtn === this._expandedId;
                if (isCurrentlyExpanded) {
                    this.expandCollapse(null);
                } else {
                    this.expandCollapse(this.selectedBtn);
                }
                this.$refs.scrollView.nativeView.scrollToVerticalOffset(0, false);
                /* if (this.detailDataVisability == 'visible') {
                    this.detailDataVisability = 'collapse';
                } else {
                    this.detailDataVisability = 'visible'
                }
                this.$refs.scrollView.nativeView.scrollToVerticalOffset(0, false); */
            },
            expandCollapse: function(expandId) {
                this.detailDataVisability = expandId === this.selectedBtn ? 'visible' : 'collapse';
                this._expandedId = expandId;
            }
        }
    }
</script>

<style scoped lang="css">
    
</style>
