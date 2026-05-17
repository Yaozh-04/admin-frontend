/// <reference types="E:/project/StudyRoom/admin-frontend/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="E:/project/StudyRoom/admin-frontend/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ElMessageBox } from 'element-plus';
const router = useRouter();
const route = useRoute();
// 提取我们在路由中配的主业务
const adminRoutes = computed(() => {
    const root = router.options.routes.find(r => r.path === '/');
    return root?.children || [];
});
const activeMenu = computed(() => route.path);
const currentTitle = computed(() => route.meta.title || '');
const handleCommand = (command) => {
    if (command === 'logout') {
        ElMessageBox.confirm('确定要退出自习室管理平台底座吗?', '防误触', {
            type: 'warning'
        }).then(() => {
            localStorage.removeItem('adminToken');
            router.push('/login');
        }).catch(() => { });
    }
};
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
let __VLS_0;
/** @ts-ignore @type {typeof __VLS_components.elContainer | typeof __VLS_components.ElContainer | typeof __VLS_components.elContainer | typeof __VLS_components.ElContainer} */
elContainer;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ class: "layout-container" },
}));
const __VLS_2 = __VLS_1({
    ...{ class: "layout-container" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5 = {};
/** @type {__VLS_StyleScopedClasses['layout-container']} */ ;
const { default: __VLS_6 } = __VLS_3.slots;
let __VLS_7;
/** @ts-ignore @type {typeof __VLS_components.elAside | typeof __VLS_components.ElAside | typeof __VLS_components.elAside | typeof __VLS_components.ElAside} */
elAside;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
    width: "220px",
    ...{ class: "aside" },
}));
const __VLS_9 = __VLS_8({
    width: "220px",
    ...{ class: "aside" },
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
/** @type {__VLS_StyleScopedClasses['aside']} */ ;
const { default: __VLS_12 } = __VLS_10.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "logo" },
});
/** @type {__VLS_StyleScopedClasses['logo']} */ ;
let __VLS_13;
/** @ts-ignore @type {typeof __VLS_components.elMenu | typeof __VLS_components.ElMenu | typeof __VLS_components.elMenu | typeof __VLS_components.ElMenu} */
elMenu;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({
    defaultActive: (__VLS_ctx.activeMenu),
    ...{ class: "el-menu-vertical" },
    backgroundColor: "#304156",
    textColor: "#bfcbd9",
    activeTextColor: "#409eff",
    router: true,
}));
const __VLS_15 = __VLS_14({
    defaultActive: (__VLS_ctx.activeMenu),
    ...{ class: "el-menu-vertical" },
    backgroundColor: "#304156",
    textColor: "#bfcbd9",
    activeTextColor: "#409eff",
    router: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
/** @type {__VLS_StyleScopedClasses['el-menu-vertical']} */ ;
const { default: __VLS_18 } = __VLS_16.slots;
for (const [route] of __VLS_vFor((__VLS_ctx.adminRoutes))) {
    let __VLS_19;
    /** @ts-ignore @type {typeof __VLS_components.elMenuItem | typeof __VLS_components.ElMenuItem | typeof __VLS_components.elMenuItem | typeof __VLS_components.ElMenuItem} */
    elMenuItem;
    // @ts-ignore
    const __VLS_20 = __VLS_asFunctionalComponent1(__VLS_19, new __VLS_19({
        key: (route.path),
        index: ('/' + route.path),
    }));
    const __VLS_21 = __VLS_20({
        key: (route.path),
        index: ('/' + route.path),
    }, ...__VLS_functionalComponentArgsRest(__VLS_20));
    const { default: __VLS_24 } = __VLS_22.slots;
    let __VLS_25;
    /** @ts-ignore @type {typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon} */
    elIcon;
    // @ts-ignore
    const __VLS_26 = __VLS_asFunctionalComponent1(__VLS_25, new __VLS_25({}));
    const __VLS_27 = __VLS_26({}, ...__VLS_functionalComponentArgsRest(__VLS_26));
    const { default: __VLS_30 } = __VLS_28.slots;
    const __VLS_31 = (route.meta?.icon);
    // @ts-ignore
    const __VLS_32 = __VLS_asFunctionalComponent1(__VLS_31, new __VLS_31({}));
    const __VLS_33 = __VLS_32({}, ...__VLS_functionalComponentArgsRest(__VLS_32));
    // @ts-ignore
    [activeMenu, adminRoutes,];
    var __VLS_28;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (route.meta?.title);
    // @ts-ignore
    [];
    var __VLS_22;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_16;
// @ts-ignore
[];
var __VLS_10;
let __VLS_36;
/** @ts-ignore @type {typeof __VLS_components.elContainer | typeof __VLS_components.ElContainer | typeof __VLS_components.elContainer | typeof __VLS_components.ElContainer} */
elContainer;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent1(__VLS_36, new __VLS_36({}));
const __VLS_38 = __VLS_37({}, ...__VLS_functionalComponentArgsRest(__VLS_37));
const { default: __VLS_41 } = __VLS_39.slots;
let __VLS_42;
/** @ts-ignore @type {typeof __VLS_components.elHeader | typeof __VLS_components.ElHeader | typeof __VLS_components.elHeader | typeof __VLS_components.ElHeader} */
elHeader;
// @ts-ignore
const __VLS_43 = __VLS_asFunctionalComponent1(__VLS_42, new __VLS_42({
    ...{ class: "header" },
}));
const __VLS_44 = __VLS_43({
    ...{ class: "header" },
}, ...__VLS_functionalComponentArgsRest(__VLS_43));
/** @type {__VLS_StyleScopedClasses['header']} */ ;
const { default: __VLS_47 } = __VLS_45.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "header-left" },
});
/** @type {__VLS_StyleScopedClasses['header-left']} */ ;
(__VLS_ctx.currentTitle);
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "header-right" },
});
/** @type {__VLS_StyleScopedClasses['header-right']} */ ;
let __VLS_48;
/** @ts-ignore @type {typeof __VLS_components.elDropdown | typeof __VLS_components.ElDropdown | typeof __VLS_components.elDropdown | typeof __VLS_components.ElDropdown} */
elDropdown;
// @ts-ignore
const __VLS_49 = __VLS_asFunctionalComponent1(__VLS_48, new __VLS_48({
    ...{ 'onCommand': {} },
    trigger: "click",
}));
const __VLS_50 = __VLS_49({
    ...{ 'onCommand': {} },
    trigger: "click",
}, ...__VLS_functionalComponentArgsRest(__VLS_49));
let __VLS_53;
const __VLS_54 = ({ command: {} },
    { onCommand: (__VLS_ctx.handleCommand) });
const { default: __VLS_55 } = __VLS_51.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "el-dropdown-link" },
});
/** @type {__VLS_StyleScopedClasses['el-dropdown-link']} */ ;
let __VLS_56;
/** @ts-ignore @type {typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon} */
elIcon;
// @ts-ignore
const __VLS_57 = __VLS_asFunctionalComponent1(__VLS_56, new __VLS_56({
    ...{ class: "el-icon--right" },
}));
const __VLS_58 = __VLS_57({
    ...{ class: "el-icon--right" },
}, ...__VLS_functionalComponentArgsRest(__VLS_57));
/** @type {__VLS_StyleScopedClasses['el-icon--right']} */ ;
const { default: __VLS_61 } = __VLS_59.slots;
let __VLS_62;
/** @ts-ignore @type {typeof __VLS_components.arrowDown | typeof __VLS_components.ArrowDown} */
arrowDown;
// @ts-ignore
const __VLS_63 = __VLS_asFunctionalComponent1(__VLS_62, new __VLS_62({}));
const __VLS_64 = __VLS_63({}, ...__VLS_functionalComponentArgsRest(__VLS_63));
// @ts-ignore
[currentTitle, handleCommand,];
var __VLS_59;
{
    const { dropdown: __VLS_67 } = __VLS_51.slots;
    let __VLS_68;
    /** @ts-ignore @type {typeof __VLS_components.elDropdownMenu | typeof __VLS_components.ElDropdownMenu | typeof __VLS_components.elDropdownMenu | typeof __VLS_components.ElDropdownMenu} */
    elDropdownMenu;
    // @ts-ignore
    const __VLS_69 = __VLS_asFunctionalComponent1(__VLS_68, new __VLS_68({}));
    const __VLS_70 = __VLS_69({}, ...__VLS_functionalComponentArgsRest(__VLS_69));
    const { default: __VLS_73 } = __VLS_71.slots;
    let __VLS_74;
    /** @ts-ignore @type {typeof __VLS_components.elDropdownItem | typeof __VLS_components.ElDropdownItem | typeof __VLS_components.elDropdownItem | typeof __VLS_components.ElDropdownItem} */
    elDropdownItem;
    // @ts-ignore
    const __VLS_75 = __VLS_asFunctionalComponent1(__VLS_74, new __VLS_74({
        command: "logout",
    }));
    const __VLS_76 = __VLS_75({
        command: "logout",
    }, ...__VLS_functionalComponentArgsRest(__VLS_75));
    const { default: __VLS_79 } = __VLS_77.slots;
    // @ts-ignore
    [];
    var __VLS_77;
    // @ts-ignore
    [];
    var __VLS_71;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_51;
var __VLS_52;
// @ts-ignore
[];
var __VLS_45;
let __VLS_80;
/** @ts-ignore @type {typeof __VLS_components.elMain | typeof __VLS_components.ElMain | typeof __VLS_components.elMain | typeof __VLS_components.ElMain} */
elMain;
// @ts-ignore
const __VLS_81 = __VLS_asFunctionalComponent1(__VLS_80, new __VLS_80({
    ...{ class: "main-content" },
}));
const __VLS_82 = __VLS_81({
    ...{ class: "main-content" },
}, ...__VLS_functionalComponentArgsRest(__VLS_81));
/** @type {__VLS_StyleScopedClasses['main-content']} */ ;
const { default: __VLS_85 } = __VLS_83.slots;
let __VLS_86;
/** @ts-ignore @type {typeof __VLS_components.routerView | typeof __VLS_components.RouterView | typeof __VLS_components.routerView | typeof __VLS_components.RouterView} */
routerView;
// @ts-ignore
const __VLS_87 = __VLS_asFunctionalComponent1(__VLS_86, new __VLS_86({}));
const __VLS_88 = __VLS_87({}, ...__VLS_functionalComponentArgsRest(__VLS_87));
{
    const { default: __VLS_91 } = __VLS_89.slots;
    const [{ Component }] = __VLS_vSlot(__VLS_91);
    let __VLS_92;
    /** @ts-ignore @type {typeof __VLS_components.transition | typeof __VLS_components.Transition | typeof __VLS_components.transition | typeof __VLS_components.Transition} */
    transition;
    // @ts-ignore
    const __VLS_93 = __VLS_asFunctionalComponent1(__VLS_92, new __VLS_92({
        name: "fade-transform",
        mode: "out-in",
    }));
    const __VLS_94 = __VLS_93({
        name: "fade-transform",
        mode: "out-in",
    }, ...__VLS_functionalComponentArgsRest(__VLS_93));
    const { default: __VLS_97 } = __VLS_95.slots;
    const __VLS_98 = (Component);
    // @ts-ignore
    const __VLS_99 = __VLS_asFunctionalComponent1(__VLS_98, new __VLS_98({}));
    const __VLS_100 = __VLS_99({}, ...__VLS_functionalComponentArgsRest(__VLS_99));
    // @ts-ignore
    [];
    var __VLS_95;
    // @ts-ignore
    [];
    __VLS_89.slots['' /* empty slot name completion */];
}
var __VLS_89;
// @ts-ignore
[];
var __VLS_83;
// @ts-ignore
[];
var __VLS_39;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=Layout.vue.js.map