<template>
    <Page actionBarHidden="true">
        <FlexboxLayout class="page">
            <StackLayout class="form">
                
                <!-- <Image class="logoLine" src="~/images/login/logoLine.png"></Image> -->
                <!-- <Image class="logo" src="~/images/login/portal.png"></Image> -->
                <Label class="logoTitle" text="YES Office Plus"/>
                <Image class="logo" src="~/images/login/login_img.png"></Image>
                
                <StackLayout row="0" class="input-field">
                    <StackLayout orientation="horizontal">
                        <Image class="loginIcon" src="~/images/login/img_id.png"></Image>
                        <TextField class="input" keyboardType="url" hint="ID" v-model="user.userId" @tap="initErrorMsg"></TextField>
                    </StackLayout>
                    <StackLayout class="hr-light"></StackLayout>
                </StackLayout>

                <StackLayout row="1" class="input-field">
                    <StackLayout orientation="horizontal">
                        <Image class="loginIcon" src="~/images/login/img_pw.png"></Image>
                        <TextField class="input" secure="true" hint="PASSWORD" v-model="user.userPassword" @tap="initErrorMsg"></TextField>
                    </StackLayout>
                    <StackLayout class="hr-light"></StackLayout>
                </StackLayout>

                <StackLayout row="2" class="input-field loginBtnMargintTop">
                    <StackLayout orientation="horizontal" class="loginBtnCenter">
                        <Button :text="loginTxt.text" @tap="submit()" class="btn btn-primary loginBtn"></Button>
                    </StackLayout>
                </StackLayout>

                <Label :v-show="errorMsgFlag" :text="errorMsg" class="errorMsgTxt"></Label>

            </StackLayout>

        </FlexboxLayout>
    </Page>
</template>

<script>
    import CryptoJS from 'crypto-js/sha256';
    import * as LoginService from  '../service/login/loginService';
    // createNamespacedHelpers : Sotre가 여러개로 나눠져있을때 특정 Sotre에 접근하기위에 Vuex에서 제공하는 놈.
    import { createNamespacedHelpers } from 'vuex';
    const { mapState, mapMutations, mapActions, mapGetters } = createNamespacedHelpers('../store/login/loginStore');

    export default {
        computed : {
            // ...mapState([]),
            ...mapGetters([
                'countOfUser'
            ])
        },
        data() {
            return {
                errorMsgFlag: false,
                errorMsg: '',
                isLoggingIn: true,
                processing: false,
                loginTxt: {
                    text : 'Login'
                },
                language: {
                    text :'English'
                },
                license: {
                    text :'License'
                },
                user: {
                    userId: '',
                    userPassword: ''
                },
                listOfItems : {
                    text : ['English', 'Korean']
                }
            };
        },
        methods: {
            // ...mapMutations([]),
            // ...mapActions([]),
            submit() {
                //=========== 로그인 귀찮으면 아래꺼 쓰세요 ===========
                this.$navigateTo(
                    this.$routes.Dashboard, {clearHistory: true}
                );
                //===================================================

                //================== Login Process ==================
                /* var userPwd = this.user.userPassword;
                var userId = this.user.userId;
                var hashPassword = CryptoJS(userPwd).toString();
                LoginService.loginAction(userId, hashPassword, false).then((response) => {
                    var responseData = response.data;
                    var loginResult = responseData.isLogin;
                    var resultMsg = responseData.msg;

                    if(loginResult) { // Login Success
                        this.$navigateTo(
                            this.$routes.Dashboard, {clearHistory: true}
                        );
                    } else { // Login Fail
                        this.errorMsgFlag = true;
                        this.errorMsg = resultMsg;
                    }
                }); */
                //===================================================
            },

            initErrorMsg() {
                this.errorMsgFlag = false;
                this.errorMsg = "";
            }
        }
    };
</script>

<style scoped>
    .page {
        align-items: center;
        background: linear-gradient(to bottom, #2d91cd, #4751bb);
    }

    .form {
        vertical-align: middle;
    }

    .logoTitle {
        horizontal-align: center;
        color: white;
        font-weight: bold;
        font-size: 35;
        margin-top: 50;
    }

    .logo {
        margin-bottom: 30;
        height: 40%;
        width: 40%;
        font-weight: bold;
    }

    .logoLine {
        vertical-align: top;
    }

    .loginIcon {
        width: 20;
        height: 20;
        margin-right: 10;
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
        margin-bottom: 20;
    }

    .input {
        font-size: 18;
        width: 100%;
        placeholder-color: #A8A8A8;
    }

    .input:disabled {
        background-color: white;
        opacity: 0.5;
    }

    .login-label {
        horizontal-align: center;
        color: #A8A8A8;
        font-size: 16;
    }

    .sign-up-label {
        margin-bottom: 20;
    }

    .bold {
        color: #000000;
    }

    .loginBtn {
        background-color: white;
        color: #0080dc;
        border-radius: 25;
        width: 60%;
        margin-left: 0;
        margin-right: 0;
    }

    .loginBtnCenter {
        horizontal-align: center;
    }

    .loginBtnMargintTop {
        margin-top: 50;
    }

</style>
