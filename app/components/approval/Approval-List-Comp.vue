<template>
    <ScrollView ref="scrollView">
        <StackLayout orientation="horizontal" class="borderContents">
            <StackLayout @tap="onHeaderTap" :id="item.submit_id" orientation="horizontal" class="contents" >
                <GridLayout @longPress="onLongPress" columns="auto, auto, *" rows="auto, auto, auto, auto, auto, auto, auto, auto, auto" marginLeft="10" class="eachGrid">
                    <Image row="0" col="0" rowSpan="2" :src="item.img" class="iconStyle"></Image>
                    <Label row="0" col="1" :text="item.text" class="title"></Label>
                    <Label row="0" col="2" :text="item.state" horizontalAlignment="right" class="approvalState"></Label>

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

                    <Label row="7" col="0" class="detailTitle" text="메모" :visibility="detailDataVisability"></Label>
                    <Label row="7" col="1" colSpan="2" class="detailContent" :text="item.submit_comment" horizontalAlignment="right" :visibility="detailDataVisability"></Label>

                    <Label row="8" col="0" class="detailTitle" text="비고" :visibility="detailDataVisability"></Label>
                    <Label row="8" col="1" colSpan="2" class="detailContent" :text="item.black_mark_text" horizontalAlignment="right" :visibility="detailDataVisability"></Label>

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
        mounted (){

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
            },

            onLongPress(args) {
                var messageObj = {
                    message : '', 
                    title : "알림", 
                    okButtonText : '확인',
                    cancelButtonText : '닫기'
                };
                var argObj = args.object;
                var selectedData = argObj.bindingContext;
                var state = selectedData.state; // 처리 상태
                var stateVal = '';
                var resultMsg = '';
                var loginId = this.$store.state.userInfo.id;

                if (state == "결재완료" && loginId == selectedData.submit_id) {
                    messageObj.message = "상신된 결재를 취소 요청 하시겠습니까?";
                    stateVal = "취소요청";
                    resultMsg = "결재상신이 취소되었습니다.";
                } else if (state == "상신" && loginId == selectedData.submit_id) { // 상신
                    messageObj.message = "해당 결재를 취소하시겠습니까?";
                    stateVal = "상신취소";
                    resultMsg = "취소 요청이 완료되었습니다."
                } else {
                    return;
                }
                var docNum = selectedData.doc_num;
                // title, 
                confirm(messageObj).then((res) => {
                    if (res) { // 확인 버튼 클릭
                        this.$store.dispatch('cancelApprovalProcess', {doc_num : docNum, stateVal : stateVal}).then((res) => {
                            if (res.success) {
                                alert( {message : resultMsg, title : "알림", cancelable : true, okButtonText : '닫기'} ).then(() => {
                                    this.$modal.close();
                                })
                            }
                        });
                    } else { // 닫기 버튼 클릭
                        this.$modal.close();
                    }
                });
            }
        }
    }
</script>

<style scoped lang="css">
    
</style>
