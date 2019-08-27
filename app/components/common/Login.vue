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

                <StackLayout row="2" class="input-field">
                    <StackLayout orientation="horizontal">
                        <Button :text="loginTxt.text" @tap="submit()" class="btn btn-primary loginBtn"></Button>
                    </StackLayout>
                </StackLayout>

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
                    text : ['English', 'Korean']
                }
            };
        },
        methods: {
            submit() {
                if (this.user.userId == "q" && this.user.userPassword == "q") {
                    this.$navigateTo(
                        this.$routes.Dashboard, {clearHistory: true}
                    );
                } else {
                    this.errorMsgFlag = true;
                    this.errorMsg = "Information does not match.";
                }
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
        margin-bottom: 50;
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
        background-color: #0080dc;
        margin-left: 0;
        margin-right: 0;
    }

    .languageBtn {
        background-color: white;
        width: 30%;
        color: #0080dc;
        border-color: #0080dc;
        margin-left: 0;
        margin-right: 0;
    }
</style>
