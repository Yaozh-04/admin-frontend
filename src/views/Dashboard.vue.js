/// <reference types="E:/project/StudyRoom/admin-frontend/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="E:/project/StudyRoom/admin-frontend/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, onMounted } from 'vue';
import request from '@/utils/request';
import { ElMessage } from 'element-plus';
const stats = ref({
    totalUsers: 0,
    totalRooms: 0,
    todayReservations: 0,
    todayBreaches: 0
});
const loadStats = async () => {
    try {
        const res = await request.get('/admin/dashboard/stats');
        stats.value = res.data;
    }
    catch (err) {
        ElMessage.error('读取大盘数据失败');
    }
};
onMounted(() => {
    loadStats();
});
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['stat-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-icon']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "dashboard-container" },
});
/** @type {__VLS_StyleScopedClasses['dashboard-container']} */ ;
let __VLS_0;
/** @ts-ignore @type {typeof __VLS_components.elRow | typeof __VLS_components.ElRow | typeof __VLS_components.elRow | typeof __VLS_components.ElRow} */
elRow;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    gutter: (20),
}));
const __VLS_2 = __VLS_1({
    gutter: (20),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_3.slots;
let __VLS_6;
/** @ts-ignore @type {typeof __VLS_components.elCol | typeof __VLS_components.ElCol | typeof __VLS_components.elCol | typeof __VLS_components.ElCol} */
elCol;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
    span: (6),
}));
const __VLS_8 = __VLS_7({
    span: (6),
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
const { default: __VLS_11 } = __VLS_9.slots;
let __VLS_12;
/** @ts-ignore @type {typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components.elCard | typeof __VLS_components.ElCard} */
elCard;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
    ...{ class: "stat-card" },
    shadow: "hover",
}));
const __VLS_14 = __VLS_13({
    ...{ class: "stat-card" },
    shadow: "hover",
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
/** @type {__VLS_StyleScopedClasses['stat-card']} */ ;
const { default: __VLS_17 } = __VLS_15.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "stat-icon users" },
});
/** @type {__VLS_StyleScopedClasses['stat-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['users']} */ ;
let __VLS_18;
/** @ts-ignore @type {typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon} */
elIcon;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent1(__VLS_18, new __VLS_18({}));
const __VLS_20 = __VLS_19({}, ...__VLS_functionalComponentArgsRest(__VLS_19));
const { default: __VLS_23 } = __VLS_21.slots;
let __VLS_24;
/** @ts-ignore @type {typeof __VLS_components.User} */
User;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent1(__VLS_24, new __VLS_24({}));
const __VLS_26 = __VLS_25({}, ...__VLS_functionalComponentArgsRest(__VLS_25));
var __VLS_21;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "stat-info" },
});
/** @type {__VLS_StyleScopedClasses['stat-info']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "stat-title" },
});
/** @type {__VLS_StyleScopedClasses['stat-title']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "stat-value" },
});
/** @type {__VLS_StyleScopedClasses['stat-value']} */ ;
(__VLS_ctx.stats.totalUsers);
// @ts-ignore
[stats,];
var __VLS_15;
// @ts-ignore
[];
var __VLS_9;
let __VLS_29;
/** @ts-ignore @type {typeof __VLS_components.elCol | typeof __VLS_components.ElCol | typeof __VLS_components.elCol | typeof __VLS_components.ElCol} */
elCol;
// @ts-ignore
const __VLS_30 = __VLS_asFunctionalComponent1(__VLS_29, new __VLS_29({
    span: (6),
}));
const __VLS_31 = __VLS_30({
    span: (6),
}, ...__VLS_functionalComponentArgsRest(__VLS_30));
const { default: __VLS_34 } = __VLS_32.slots;
let __VLS_35;
/** @ts-ignore @type {typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components.elCard | typeof __VLS_components.ElCard} */
elCard;
// @ts-ignore
const __VLS_36 = __VLS_asFunctionalComponent1(__VLS_35, new __VLS_35({
    ...{ class: "stat-card" },
    shadow: "hover",
}));
const __VLS_37 = __VLS_36({
    ...{ class: "stat-card" },
    shadow: "hover",
}, ...__VLS_functionalComponentArgsRest(__VLS_36));
/** @type {__VLS_StyleScopedClasses['stat-card']} */ ;
const { default: __VLS_40 } = __VLS_38.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "stat-icon rooms" },
});
/** @type {__VLS_StyleScopedClasses['stat-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['rooms']} */ ;
let __VLS_41;
/** @ts-ignore @type {typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon} */
elIcon;
// @ts-ignore
const __VLS_42 = __VLS_asFunctionalComponent1(__VLS_41, new __VLS_41({}));
const __VLS_43 = __VLS_42({}, ...__VLS_functionalComponentArgsRest(__VLS_42));
const { default: __VLS_46 } = __VLS_44.slots;
let __VLS_47;
/** @ts-ignore @type {typeof __VLS_components.House} */
House;
// @ts-ignore
const __VLS_48 = __VLS_asFunctionalComponent1(__VLS_47, new __VLS_47({}));
const __VLS_49 = __VLS_48({}, ...__VLS_functionalComponentArgsRest(__VLS_48));
// @ts-ignore
[];
var __VLS_44;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "stat-info" },
});
/** @type {__VLS_StyleScopedClasses['stat-info']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "stat-title" },
});
/** @type {__VLS_StyleScopedClasses['stat-title']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "stat-value" },
});
/** @type {__VLS_StyleScopedClasses['stat-value']} */ ;
(__VLS_ctx.stats.totalRooms);
// @ts-ignore
[stats,];
var __VLS_38;
// @ts-ignore
[];
var __VLS_32;
let __VLS_52;
/** @ts-ignore @type {typeof __VLS_components.elCol | typeof __VLS_components.ElCol | typeof __VLS_components.elCol | typeof __VLS_components.ElCol} */
elCol;
// @ts-ignore
const __VLS_53 = __VLS_asFunctionalComponent1(__VLS_52, new __VLS_52({
    span: (6),
}));
const __VLS_54 = __VLS_53({
    span: (6),
}, ...__VLS_functionalComponentArgsRest(__VLS_53));
const { default: __VLS_57 } = __VLS_55.slots;
let __VLS_58;
/** @ts-ignore @type {typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components.elCard | typeof __VLS_components.ElCard} */
elCard;
// @ts-ignore
const __VLS_59 = __VLS_asFunctionalComponent1(__VLS_58, new __VLS_58({
    ...{ class: "stat-card" },
    shadow: "hover",
}));
const __VLS_60 = __VLS_59({
    ...{ class: "stat-card" },
    shadow: "hover",
}, ...__VLS_functionalComponentArgsRest(__VLS_59));
/** @type {__VLS_StyleScopedClasses['stat-card']} */ ;
const { default: __VLS_63 } = __VLS_61.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "stat-icon res" },
});
/** @type {__VLS_StyleScopedClasses['stat-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['res']} */ ;
let __VLS_64;
/** @ts-ignore @type {typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon} */
elIcon;
// @ts-ignore
const __VLS_65 = __VLS_asFunctionalComponent1(__VLS_64, new __VLS_64({}));
const __VLS_66 = __VLS_65({}, ...__VLS_functionalComponentArgsRest(__VLS_65));
const { default: __VLS_69 } = __VLS_67.slots;
let __VLS_70;
/** @ts-ignore @type {typeof __VLS_components.Calendar} */
Calendar;
// @ts-ignore
const __VLS_71 = __VLS_asFunctionalComponent1(__VLS_70, new __VLS_70({}));
const __VLS_72 = __VLS_71({}, ...__VLS_functionalComponentArgsRest(__VLS_71));
// @ts-ignore
[];
var __VLS_67;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "stat-info" },
});
/** @type {__VLS_StyleScopedClasses['stat-info']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "stat-title" },
});
/** @type {__VLS_StyleScopedClasses['stat-title']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "stat-value" },
});
/** @type {__VLS_StyleScopedClasses['stat-value']} */ ;
(__VLS_ctx.stats.todayReservations);
// @ts-ignore
[stats,];
var __VLS_61;
// @ts-ignore
[];
var __VLS_55;
let __VLS_75;
/** @ts-ignore @type {typeof __VLS_components.elCol | typeof __VLS_components.ElCol | typeof __VLS_components.elCol | typeof __VLS_components.ElCol} */
elCol;
// @ts-ignore
const __VLS_76 = __VLS_asFunctionalComponent1(__VLS_75, new __VLS_75({
    span: (6),
}));
const __VLS_77 = __VLS_76({
    span: (6),
}, ...__VLS_functionalComponentArgsRest(__VLS_76));
const { default: __VLS_80 } = __VLS_78.slots;
let __VLS_81;
/** @ts-ignore @type {typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components.elCard | typeof __VLS_components.ElCard} */
elCard;
// @ts-ignore
const __VLS_82 = __VLS_asFunctionalComponent1(__VLS_81, new __VLS_81({
    ...{ class: "stat-card" },
    shadow: "hover",
}));
const __VLS_83 = __VLS_82({
    ...{ class: "stat-card" },
    shadow: "hover",
}, ...__VLS_functionalComponentArgsRest(__VLS_82));
/** @type {__VLS_StyleScopedClasses['stat-card']} */ ;
const { default: __VLS_86 } = __VLS_84.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "stat-icon breaches" },
});
/** @type {__VLS_StyleScopedClasses['stat-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['breaches']} */ ;
let __VLS_87;
/** @ts-ignore @type {typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon} */
elIcon;
// @ts-ignore
const __VLS_88 = __VLS_asFunctionalComponent1(__VLS_87, new __VLS_87({}));
const __VLS_89 = __VLS_88({}, ...__VLS_functionalComponentArgsRest(__VLS_88));
const { default: __VLS_92 } = __VLS_90.slots;
let __VLS_93;
/** @ts-ignore @type {typeof __VLS_components.Warning} */
Warning;
// @ts-ignore
const __VLS_94 = __VLS_asFunctionalComponent1(__VLS_93, new __VLS_93({}));
const __VLS_95 = __VLS_94({}, ...__VLS_functionalComponentArgsRest(__VLS_94));
// @ts-ignore
[];
var __VLS_90;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "stat-info" },
});
/** @type {__VLS_StyleScopedClasses['stat-info']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "stat-title" },
});
/** @type {__VLS_StyleScopedClasses['stat-title']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "stat-value" },
    ...{ class: ({ 'text-danger': __VLS_ctx.stats.todayBreaches > 0 }) },
});
/** @type {__VLS_StyleScopedClasses['stat-value']} */ ;
/** @type {__VLS_StyleScopedClasses['text-danger']} */ ;
(__VLS_ctx.stats.todayBreaches);
// @ts-ignore
[stats, stats,];
var __VLS_84;
// @ts-ignore
[];
var __VLS_78;
// @ts-ignore
[];
var __VLS_3;
let __VLS_98;
/** @ts-ignore @type {typeof __VLS_components.elRow | typeof __VLS_components.ElRow | typeof __VLS_components.elRow | typeof __VLS_components.ElRow} */
elRow;
// @ts-ignore
const __VLS_99 = __VLS_asFunctionalComponent1(__VLS_98, new __VLS_98({
    ...{ style: {} },
}));
const __VLS_100 = __VLS_99({
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_99));
const { default: __VLS_103 } = __VLS_101.slots;
let __VLS_104;
/** @ts-ignore @type {typeof __VLS_components.elCol | typeof __VLS_components.ElCol | typeof __VLS_components.elCol | typeof __VLS_components.ElCol} */
elCol;
// @ts-ignore
const __VLS_105 = __VLS_asFunctionalComponent1(__VLS_104, new __VLS_104({
    span: (24),
}));
const __VLS_106 = __VLS_105({
    span: (24),
}, ...__VLS_functionalComponentArgsRest(__VLS_105));
const { default: __VLS_109 } = __VLS_107.slots;
let __VLS_110;
/** @ts-ignore @type {typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components.elCard | typeof __VLS_components.ElCard} */
elCard;
// @ts-ignore
const __VLS_111 = __VLS_asFunctionalComponent1(__VLS_110, new __VLS_110({
    shadow: "never",
}));
const __VLS_112 = __VLS_111({
    shadow: "never",
}, ...__VLS_functionalComponentArgsRest(__VLS_111));
const { default: __VLS_115 } = __VLS_113.slots;
{
    const { header: __VLS_116 } = __VLS_113.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "card-header" },
    });
    /** @type {__VLS_StyleScopedClasses['card-header']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    // @ts-ignore
    [];
}
let __VLS_117;
/** @ts-ignore @type {typeof __VLS_components.elEmpty | typeof __VLS_components.ElEmpty} */
elEmpty;
// @ts-ignore
const __VLS_118 = __VLS_asFunctionalComponent1(__VLS_117, new __VLS_117({
    description: "当前运行正常，各项自动化任务（含防超卖、自动违约轮询）监控中...",
}));
const __VLS_119 = __VLS_118({
    description: "当前运行正常，各项自动化任务（含防超卖、自动违约轮询）监控中...",
}, ...__VLS_functionalComponentArgsRest(__VLS_118));
// @ts-ignore
[];
var __VLS_113;
// @ts-ignore
[];
var __VLS_107;
// @ts-ignore
[];
var __VLS_101;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=Dashboard.vue.js.map