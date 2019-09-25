<template>
    <StackLayout orientation="horizontal" class="borderContents">
        <StackLayout orientation="horizontal" class="contents" >
            <GridLayout columns="auto, *" rows="auto, auto, auto" marginLeft="10" class="eachGrid">
                <Label row="0" col="0" :text="item.name" class="title"></Label>
                <Label row="0" col="1" rowSpan="2" :text="item.char_date" class="contentsss" horizontalAlignment="right"></Label>
                <Label row="1" col="0" :text="item.type" class="title"></Label>
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
   
</style>
