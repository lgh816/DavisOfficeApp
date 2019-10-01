<template>
    <ScrollView ref="scrollView">
        <StackLayout orientation="horizontal" class="borderContents">
            <StackLayout @tap="onHeaderTap" :id="item.id" :confirmData="item.need_confirm" orientation="horizontal" class="contents" >
                <GridLayout columns="auto, *" rows="auto, auto, auto, auto, auto, auto, auto" marginLeft="10" class="eachGrid">
                    <Label row="0" col="0" :text="item.text" class="title"></Label>
                    <Label row="0" col="1" rowSpan="2" :text="item.char_date" class="contentsss" horizontalAlignment="right"></Label>

                    <Label row="1" col="0" :text="item.type" class="title"></Label>
                    <Label row="1" col="1" v-show="item.need_confirm == 2" text="상세보기" horizontalAlignment="right" class="detailInfo"></Label>

                    <Label row="2" col="0" class="detailTitle firstDetailInfo" text="지정IP" :visibility="detailDataVisability"></Label>
                    <Label row="2" col="1" colSpan="2" class="detailContent firstDetailInfo" :text="item.members_ip_pc" horizontalAlignment="right" :visibility="detailDataVisability"></Label>

                    <Label row="3" col="0" class="detailTitle" text="로그인IP" :visibility="detailDataVisability"></Label>
                    <Label row="3" col="1" colSpan="2" class="detailContent" :text="item.ip_pc" horizontalAlignment="right" :visibility="detailDataVisability"></Label>

                    <Label row="4" col="0" class="detailTitle" text="지정 공인IP" :visibility="detailDataVisability"></Label>
                    <Label row="4" col="1" colSpan="2" class="detailContent" :text="item.member_ip_office" horizontalAlignment="right" :visibility="detailDataVisability"></Label>

                    <Label row="5" col="0" class="detailTitle" text="로그인 공인IP" :visibility="detailDataVisability"></Label>
                    <Label row="5" col="1" colSpan="2" class="detailContent" :text="item.ip_office" horizontalAlignment="right" :visibility="detailDataVisability"></Label>

                    <Label row="6" col="0" class="detailTitle" text="로그인 플랫폼" :visibility="detailDataVisability"></Label>
                    <Label row="6" col="1" colSpan="2" class="detailContent" :text="item.platform_type" horizontalAlignment="right" :visibility="detailDataVisability"></Label>
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

        data (){
            return {
                detailDataVisability: 'collapse',
                selectedBtn: null,
                _expandedId: null
            }
        },

        computed : {
            
        },

        methods : {
            onHeaderTap: function(args) { // param : args
                const confirm = args.object.confirmData;
                if (confirm == 1) {
                    return;
                }
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
            }
        }
    }
</script>

<style scoped lang="css">
    .contentsss {
        font-size: 14;
    }
</style>
