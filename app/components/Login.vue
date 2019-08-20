<template>
    <Page actionBarHidden="true">
        <FlexboxLayout class="page">
            <StackLayout class="form">
                
                <!-- <Image class="logoLine" src="~/images/login/logoLine.png"></Image> -->
                <Image class="logo" src="~/images/login/portal.png"></Image>
                
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

                <StackLayout row="2" orientation="horizontal" class="input-field">
                    <StackLayout orientation="horizontal" class="licenseBtn" @tap="addLicense">
                        <Image class="licenseIcon" src="~/images/login/ico_login_license.png"></Image>
                        <Label :text="license.text" verticalAlignment="center"></Label>
                    </StackLayout>
                    <StackLayout orientation="horizontal" class="languageBtn" @tap="selectLanguage">
                        <Label :text="language.text" verticalAlignment="center"></Label>
                    </StackLayout>
                </StackLayout>

                <Button :text="loginTxt.text" @tap="submit()" class="btn btn-primary"></Button>
                <Label :v-show="errorMsgFlag" :text="errorMsg" class="errorMsgTxt"></Label>
            </StackLayout>

        </FlexboxLayout>
    </Page>
</template>

<script>
    export default {
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
                    text : ['English', 'Korean', 'Japan']
                }
            };
        },
        methods: {
            submit() {
                if (this.user.userId == "q" && this.user.userPassword == "q") {
                    this.$navigateTo(
                        this.$routes.Home, {clearHistory: true}
                    );
                } else {
                    this.errorMsgFlag = true;
                    this.errorMsg = "Information does not match.";
                }
                // if (!this.user.email || !this.user.password) {
                //     this.alert(
                //         "Please provide both an email address and password."
                //     );
                //     return;
                // }

                // this.processing = true;
                // if (this.isLoggingIn) {
                //     this.login();
                // } else {
                //     this.register();
                // }
                
                // this.$navigateTo(Home, { clearHistory: true });
            },

            login() {
                this.$backendService
                    .login(this.user)
                    .then(() => {
                        this.processing = false;
                        this.$navigateTo(Home, { clearHistory: true });
                    })
                    .catch(() => {
                        this.processing = false;
                        this.alert(
                            "Unfortunately we could not find your account."
                        );
                    });
            },
            initErrorMsg() {
                this.errorMsgFlag = false;
                this.errorMsg = "";
            },
            addLicense() {
                this.alert("Add License");
            },

            selectLanguage() {
                var options = {
                    title : 'Select language',
                    cancelButtonText : 'Cancel',
                    cancelable: true,
                    actions : ['English', '한국어', '日本語']
                }

                action(options).then((result) => {
                    if (result != 'Cancel') {
                        this.language.text = result;
                        if (result == '한국어') {
                            this.license.text = "라이선스";
                            this.loginTxt.text = "로그인";
                        } else if (result == 'English') {
                            this.license.text = 'License';
                            this.loginTxt.text = "Login";
                        } else if (result == '日本語') {
                            this.license.text = 'ライセンス';
                            this.loginTxt.text = "ログイン";
                        }
                    }
                });
            },

            register() {
                if (this.user.password != this.user.confirmPassword) {
                    this.alert("Your passwords do not match.");
                    this.processing = false;
                    return;
                }

                this.$backendService
                    .register(this.user)
                    .then(() => {
                        this.processing = false;
                        this.alert(
                            "Your account was successfully created.");
                        this.isLoggingIn = true;
                    })
                    .catch(() => {
                        this.processing = false;
                        this.alert(
                            "Unfortunately we were unable to create your account."
                        );
                    });
            },

            forgotPassword() {
                prompt({
                    title: "Forgot Password",
                    message: "Enter the email address you used to register for APP NAME to reset your password.",
                    inputType: "email",
                    defaultText: "",
                    okButtonText: "Ok",
                    cancelButtonText: "Cancel"
                }).then(data => {
                    if (data.result) {
                        this.$backendService
                            .resetPassword(data.text.trim())
                            .then(() => {
                                this.alert(
                                    "Your password was successfully reset. Please check your email for instructions on choosing a new password."
                                );
                            })
                            .catch(() => {
                                this.alert(
                                    "Unfortunately, an error occurred resetting your password."
                                );
                            });
                    }
                });
            },

            focusPassword() {
                this.$refs.password.nativeView.focus();
            },
            focusConfirmPassword() {
                if (!this.isLoggingIn) {
                    this.$refs.confirmPassword.nativeView.focus();
                }
            },

            alert(message) {
                return alert({
                    title: "Information",
                    okButtonText: "OK",
                    message: message
                });
            }
        }
    };
</script>

<style scoped>
    .page {
        align-items: center;
    }

    .form {
        vertical-align: middle;
    }

    .logo {
        margin-bottom: 12;
        width: 80%;
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

    .licenseIcon {
        width: 15;
        height: 15;
        margin-left: -5;
    }

    .licenseBtn {
        width: 49%;
        height: 40;
        border-width: 1px;
        border-color: #0854dc;
        background-color: white;
        margin-right: 1%;
        horizontal-align: center;
    }
    .languageBtn {
        width: 49%;
        height: 40;
        border-width: 1px;
        border-color: #0854dc;
        background-color: white;
        margin-left: 1%;
        horizontal-align: center;
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
        margin-bottom: 18;
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

    .btn-primary {
        width: 100%;
        background-color: #0080dc;
    }
</style>
