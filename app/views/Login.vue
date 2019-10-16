<template>
    <Page actionBarHidden="true">
        <FlexboxLayout class="page">
            <StackLayout class="form">

                <GridLayout rows="auto, auto, auto, auto, auto, auto">
                    <Label row="0" class="logoTitle" text="YES Office Plus"/>
                    <Image row="1" class="logo" src="~/images/login/login_img.png"></Image>
                    
                    <StackLayout row="2" class="input-field inputArea">
                        <StackLayout orientation="horizontal">
                            <Image class="loginIcon" src="~/images/login/loginId.png"></Image>
                            <TextField class="input" keyboardType="number" hint="ID" v-model="user.userId" @tap="initErrorMsg"></TextField>
                        </StackLayout>
                        <StackLayout class="hr-light"></StackLayout>
                    </StackLayout>

                    <StackLayout row="3" class="input-field inputArea">
                        <StackLayout orientation="horizontal">
                            <Image class="loginIcon" src="~/images/login/loginPw.png"></Image>
                            <TextField class="input" secure="true" hint="PASSWORD" v-model="user.userPassword" @tap="initErrorMsg"></TextField>
                        </StackLayout>
                        <StackLayout class="hr-light"></StackLayout>
                    </StackLayout>
                    
                    <!-- <Label :v-show="this.$store.state.failMsgFlag" class="fa icon" text.decode="&#xf071;"></Label> -->
                    <Label row="4" :v-show="this.$store.state.failMsgFlag" :text="this.$store.state.failMsg" class="errorMsgTxt"></Label>

                    <StackLayout row="5" class="input-field loginBtnMargintTop">
                        <StackLayout orientation="horizontal" class="loginBtnCenter">
                            <Button text="Login" @tap="submit()" class="btn btn-primary loginBtn"></Button>
                        </StackLayout>
                    </StackLayout>
                    <ActivityIndicator rowSpan="6" class="loadingStyle" :busy="processing"></ActivityIndicator>
                </GridLayout>

            </StackLayout>
        </FlexboxLayout>
    </Page>
</template>

<script>
    import CryptoJS from 'crypto-js/sha256';
    
    export default {
        mounted() {
            console.log("Application Version = "+this.$AppVersion);
        },

        data() {
            return {
                user: {
                    userId: '',
                    userPassword: '',
                },
                processing: false
            };
        },
        methods: {
            // this.$store.state.xxx = Store - state의 xxx 호출.
            // this.$store.commit("xxx") = Store - mutations의 xxx 호출.
            // this.$store.getters.xxx = Store - getters의 xxx 호출.
            // this.$store.dispatch("xxx", payload) = Store - actions의 xxx 호출. payload는 파라미터값.

            submit() {
                var param = {};
                var userPwd = this.user.userPassword;
                var userId = this.user.userId;
                var hashPassword = CryptoJS(userPwd).toString();
                var year = this.$moment(new Date()).format('YYYY');

                param.id = userId,
                param.password = hashPassword,
                param.isAttend = false
                // this.processing = true;
                this.$store.dispatch("loginAction", {user: param, initPassword : false}).then((res) => {
                    // this.processing = false;
                    if (res) {
                        this.$store.dispatch("getHolidayList", { year : year });
                        this.$navigateTo(
                            this.$routes.Dashboard, {clearHistory: true}
                        );
                    }
                });
            },

            initErrorMsg() {
                this.$store.commit("initFailMsg");
            }
        }
    };
</script>

<style scoped>
    .page {
        align-items: center;
        background: linear-gradient(to bottom, #4751bb, #2d91cd);
    }

    .form {
        vertical-align: middle;
    }

    .logoTitle {
        horizontal-align: center;
        color: white;
        font-weight: bold;
        font-size: 35;
        margin-top: 20;
    }

    .logo {
        margin-top: 10;
        margin-bottom: 0;
        height: 35%;
        width: 40%;
        font-weight: bold;
    }

    .loginIcon {
        width: 20;
        height: 20;
        margin-left: 10;
        margin-right: 10;
        margin-bottom: 10;
    }

    .errorMsgTxt {
        color: red;
        horizontal-align: center;
    }
    .header {
        horizontal-align: center;
        font-size: 25;
        font-weight: 600;
        text-align: center;
        color: #D51A1A;
    }

    .input-field {
        margin-bottom: 10;
    }

    .input {
        font-size: 18;
        color: white;
        width: 100%;
        placeholder-color: #A8A8A8;
    }


    .loginBtn {
        background-color: white;
        color: #0080dc;
        border-radius: 25;
        width: 80%;
        height: 40;
        margin-left: 0;
        margin-right: 0;
    }

    .loginBtnCenter {
        horizontal-align: center;
    }

    .loginBtnMargintTop {
        margin-top: 10;
    }

    .inputArea {
        padding-left: 30;
        padding-right: 30;
    }

</style>
