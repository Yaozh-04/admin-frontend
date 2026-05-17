/// <reference types="E:/project/StudyRoom/admin-frontend/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="E:/project/StudyRoom/admin-frontend/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import request from '@/utils/request';
const router = useRouter();
const loginForm = ref();
const loading = ref(false);
const form = reactive({
    username: '',
    password: ''
});
const rules = {
    username: [{ required: true, message: '请提供管理员身份', trigger: 'blur' }],
    password: [{ required: true, message: '必须输入密钥', trigger: 'blur' }]
};
const handleLogin = () => {
    loginForm.value.validate(async (valid) => {
        if (valid) {
            loading.value = true;
            try {
                const res = await request.post('/admin/auth/login', form);
                localStorage.setItem('adminToken', res.data.token);
                ElMessage.success('验证通过，正在载入环境...');
                router.push('/');
            }
            catch (err) {
                // request.ts 已有错误提示
            }
            finally {
                loading.value = false;
            }
        }
    });
};
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "login-container" },
});
/** @type {__VLS_StyleScopedClasses['login-container']} */ ;
let __VLS_0;
/** @ts-ignore @type {typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components.elCard | typeof __VLS_components.ElCard} */
elCard;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ class: "login-box" },
}));
const __VLS_2 = __VLS_1({
    ...{ class: "login-box" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
/** @type {__VLS_StyleScopedClasses['login-box']} */ ;
const { default: __VLS_5 } = __VLS_3.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "title" },
});
/** @type {__VLS_StyleScopedClasses['title']} */ ;
let __VLS_6;
/** @ts-ignore @type {typeof __VLS_components.elForm | typeof __VLS_components.ElForm | typeof __VLS_components.elForm | typeof __VLS_components.ElForm} */
elForm;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
    ...{ 'onKeyup': {} },
    model: (__VLS_ctx.form),
    rules: (__VLS_ctx.rules),
    ref: "loginForm",
}));
const __VLS_8 = __VLS_7({
    ...{ 'onKeyup': {} },
    model: (__VLS_ctx.form),
    rules: (__VLS_ctx.rules),
    ref: "loginForm",
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
let __VLS_11;
const __VLS_12 = ({ keyup: {} },
    { onKeyup: (__VLS_ctx.handleLogin) });
var __VLS_13 = {};
const { default: __VLS_15 } = __VLS_9.slots;
let __VLS_16;
/** @ts-ignore @type {typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem} */
elFormItem;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent1(__VLS_16, new __VLS_16({
    prop: "username",
}));
const __VLS_18 = __VLS_17({
    prop: "username",
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
const { default: __VLS_21 } = __VLS_19.slots;
let __VLS_22;
/** @ts-ignore @type {typeof __VLS_components.elInput | typeof __VLS_components.ElInput} */
elInput;
// @ts-ignore
const __VLS_23 = __VLS_asFunctionalComponent1(__VLS_22, new __VLS_22({
    modelValue: (__VLS_ctx.form.username),
    placeholder: "超级管理员账号",
    prefixIcon: "User",
}));
const __VLS_24 = __VLS_23({
    modelValue: (__VLS_ctx.form.username),
    placeholder: "超级管理员账号",
    prefixIcon: "User",
}, ...__VLS_functionalComponentArgsRest(__VLS_23));
// @ts-ignore
[form, form, rules, handleLogin,];
var __VLS_19;
let __VLS_27;
/** @ts-ignore @type {typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem} */
elFormItem;
// @ts-ignore
const __VLS_28 = __VLS_asFunctionalComponent1(__VLS_27, new __VLS_27({
    prop: "password",
}));
const __VLS_29 = __VLS_28({
    prop: "password",
}, ...__VLS_functionalComponentArgsRest(__VLS_28));
const { default: __VLS_32 } = __VLS_30.slots;
let __VLS_33;
/** @ts-ignore @type {typeof __VLS_components.elInput | typeof __VLS_components.ElInput} */
elInput;
// @ts-ignore
const __VLS_34 = __VLS_asFunctionalComponent1(__VLS_33, new __VLS_33({
    modelValue: (__VLS_ctx.form.password),
    type: "password",
    placeholder: "安全密码",
    prefixIcon: "Lock",
    showPassword: true,
}));
const __VLS_35 = __VLS_34({
    modelValue: (__VLS_ctx.form.password),
    type: "password",
    placeholder: "安全密码",
    prefixIcon: "Lock",
    showPassword: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_34));
// @ts-ignore
[form,];
var __VLS_30;
let __VLS_38;
/** @ts-ignore @type {typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components.elButton | typeof __VLS_components.ElButton} */
elButton;
// @ts-ignore
const __VLS_39 = __VLS_asFunctionalComponent1(__VLS_38, new __VLS_38({
    ...{ 'onClick': {} },
    type: "primary",
    ...{ class: "login-btn" },
    loading: (__VLS_ctx.loading),
}));
const __VLS_40 = __VLS_39({
    ...{ 'onClick': {} },
    type: "primary",
    ...{ class: "login-btn" },
    loading: (__VLS_ctx.loading),
}, ...__VLS_functionalComponentArgsRest(__VLS_39));
let __VLS_43;
const __VLS_44 = ({ click: {} },
    { onClick: (__VLS_ctx.handleLogin) });
/** @type {__VLS_StyleScopedClasses['login-btn']} */ ;
const { default: __VLS_45 } = __VLS_41.slots;
// @ts-ignore
[handleLogin, loading,];
var __VLS_41;
var __VLS_42;
// @ts-ignore
[];
var __VLS_9;
var __VLS_10;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
var __VLS_14 = __VLS_13;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=Login.vue.js.map