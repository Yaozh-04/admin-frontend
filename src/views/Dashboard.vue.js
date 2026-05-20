/// <reference types="E:/project/StudyRoom/admin-frontend/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="E:/project/StudyRoom/admin-frontend/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, onMounted, computed } from 'vue';
import request from '@/utils/request';
import { ElMessage } from 'element-plus';
const stats = ref({
    totalUsers: 0, totalRooms: 0, todayReservations: 0, todayBreaches: 0,
    statusDistribution: [],
    buildingDistribution: []
});
const statCards = [
    { key: 'users', label: '注册学生', icon: 'User', gradient: 'linear-gradient(135deg,#4080ff,#6eb5ff)' },
    { key: 'rooms', label: '自习室总数', icon: 'House', gradient: 'linear-gradient(135deg,#36b87f,#5de0a5)' },
    { key: 'today', label: '今日预约', icon: 'Calendar', gradient: 'linear-gradient(135deg,#f5a623,#f7c76b)' },
    { key: 'breach', label: '今日违约', icon: 'Warning', gradient: 'linear-gradient(135deg,#f45b5b,#ff8f8f)' },
];
const statValue = (key) => {
    const map = {
        users: stats.value.totalUsers,
        rooms: stats.value.totalRooms,
        today: stats.value.todayReservations,
        breach: stats.value.todayBreaches,
    };
    return map[key] ?? 0;
};
const statusItems = [
    { icon: 'CircleCheck', text: '座位防超卖机制（数据库行级锁）运行正常' },
    { icon: 'CircleCheck', text: '自动违约巡检定时任务（每分钟）运行正常' },
    { icon: 'CircleCheck', text: '信用分惩罚策略自动执行中' },
    { icon: 'CircleCheck', text: '协同过滤推荐算法服务就绪' },
];
const loadStats = async () => {
    try {
        const res = await request.get('/admin/dashboard/stats');
        stats.value = res.data;
    }
    catch {
        ElMessage.error('读取数据失败');
    }
};
// ===== 图表计算逻辑 =====
const pieColors = ['#f5a623', '#36b87f', '#a0aabf', '#f45b5b']; // 待签到黄, 已完成绿, 已取消灰, 已违约红
const hasPieData = computed(() => {
    const dist = stats.value.statusDistribution || [];
    return dist.reduce((sum, item) => sum + item.value, 0) > 0;
});
const pieGradient = computed(() => {
    const dist = stats.value.statusDistribution || [];
    const total = dist.reduce((sum, item) => sum + item.value, 0);
    if (total === 0)
        return 'conic-gradient(#f0f2f5 0% 100%)'; // 无数据显示灰色圆
    let currentAngle = 0;
    let gradientStr = '';
    dist.forEach((item, index) => {
        if (item.value > 0) {
            const percentage = (item.value / total) * 100;
            gradientStr += `${pieColors[index]} ${currentAngle}% ${currentAngle + percentage}%, `;
            currentAngle += percentage;
        }
    });
    return `conic-gradient(${gradientStr.slice(0, -2)})`;
});
const maxBuildingValue = computed(() => {
    const dist = stats.value.buildingDistribution || [];
    if (dist.length === 0)
        return 1;
    return Math.max(...dist.map(i => i.value));
});
onMounted(loadStats);
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['stat-card']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "dashboard" },
});
/** @type {__VLS_StyleScopedClasses['dashboard']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "stat-grid" },
});
/** @type {__VLS_StyleScopedClasses['stat-grid']} */ ;
for (const [card] of __VLS_vFor((__VLS_ctx.statCards))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "stat-card" },
        key: (card.key),
    });
    /** @type {__VLS_StyleScopedClasses['stat-card']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "stat-icon-wrap" },
        ...{ style: ({ background: card.gradient }) },
    });
    /** @type {__VLS_StyleScopedClasses['stat-icon-wrap']} */ ;
    let __VLS_0;
    /** @ts-ignore @type {typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon} */
    elIcon;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        size: (22),
    }));
    const __VLS_2 = __VLS_1({
        size: (22),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    const { default: __VLS_5 } = __VLS_3.slots;
    const __VLS_6 = (card.icon);
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({}));
    const __VLS_8 = __VLS_7({}, ...__VLS_functionalComponentArgsRest(__VLS_7));
    // @ts-ignore
    [statCards,];
    var __VLS_3;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "stat-body" },
    });
    /** @type {__VLS_StyleScopedClasses['stat-body']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "stat-label" },
    });
    /** @type {__VLS_StyleScopedClasses['stat-label']} */ ;
    (card.label);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "stat-value" },
        ...{ class: ({ 'value-danger': card.key === 'breach' && __VLS_ctx.stats.todayBreaches > 0 }) },
    });
    /** @type {__VLS_StyleScopedClasses['stat-value']} */ ;
    /** @type {__VLS_StyleScopedClasses['value-danger']} */ ;
    (__VLS_ctx.statValue(card.key));
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "stat-decor" },
        ...{ style: ({ background: card.gradient }) },
    });
    /** @type {__VLS_StyleScopedClasses['stat-decor']} */ ;
    // @ts-ignore
    [stats, statValue,];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "status-card" },
});
/** @type {__VLS_StyleScopedClasses['status-card']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "status-header" },
});
/** @type {__VLS_StyleScopedClasses['status-header']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "status-dot" },
});
/** @type {__VLS_StyleScopedClasses['status-dot']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "status-title" },
});
/** @type {__VLS_StyleScopedClasses['status-title']} */ ;
let __VLS_11;
/** @ts-ignore @type {typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components.elTag | typeof __VLS_components.ElTag} */
elTag;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent1(__VLS_11, new __VLS_11({
    type: "success",
    size: "small",
    effect: "light",
    ...{ style: {} },
}));
const __VLS_13 = __VLS_12({
    type: "success",
    size: "small",
    effect: "light",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_12));
const { default: __VLS_16 } = __VLS_14.slots;
// @ts-ignore
[];
var __VLS_14;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "status-items" },
});
/** @type {__VLS_StyleScopedClasses['status-items']} */ ;
for (const [item] of __VLS_vFor((__VLS_ctx.statusItems))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "status-item" },
        key: (item.text),
    });
    /** @type {__VLS_StyleScopedClasses['status-item']} */ ;
    let __VLS_17;
    /** @ts-ignore @type {typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon} */
    elIcon;
    // @ts-ignore
    const __VLS_18 = __VLS_asFunctionalComponent1(__VLS_17, new __VLS_17({
        ...{ class: "status-icon" },
    }));
    const __VLS_19 = __VLS_18({
        ...{ class: "status-icon" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_18));
    /** @type {__VLS_StyleScopedClasses['status-icon']} */ ;
    const { default: __VLS_22 } = __VLS_20.slots;
    const __VLS_23 = (item.icon);
    // @ts-ignore
    const __VLS_24 = __VLS_asFunctionalComponent1(__VLS_23, new __VLS_23({}));
    const __VLS_25 = __VLS_24({}, ...__VLS_functionalComponentArgsRest(__VLS_24));
    // @ts-ignore
    [statusItems,];
    var __VLS_20;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "status-text" },
    });
    /** @type {__VLS_StyleScopedClasses['status-text']} */ ;
    (item.text);
    // @ts-ignore
    [];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "chart-grid" },
});
/** @type {__VLS_StyleScopedClasses['chart-grid']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "chart-card" },
});
/** @type {__VLS_StyleScopedClasses['chart-card']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "chart-title" },
});
/** @type {__VLS_StyleScopedClasses['chart-title']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "chart-body pie-chart-body" },
});
/** @type {__VLS_StyleScopedClasses['chart-body']} */ ;
/** @type {__VLS_StyleScopedClasses['pie-chart-body']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "pie-chart" },
    ...{ style: ({ background: __VLS_ctx.pieGradient }) },
});
/** @type {__VLS_StyleScopedClasses['pie-chart']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "pie-legend" },
});
/** @type {__VLS_StyleScopedClasses['pie-legend']} */ ;
for (const [item, index] of __VLS_vFor((__VLS_ctx.stats.statusDistribution))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "legend-item" },
        key: (item.name),
    });
    /** @type {__VLS_StyleScopedClasses['legend-item']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "legend-dot" },
        ...{ style: ({ background: __VLS_ctx.pieColors[index] }) },
    });
    /** @type {__VLS_StyleScopedClasses['legend-dot']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "legend-name" },
    });
    /** @type {__VLS_StyleScopedClasses['legend-name']} */ ;
    (item.name);
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "legend-val" },
    });
    /** @type {__VLS_StyleScopedClasses['legend-val']} */ ;
    (item.value);
    // @ts-ignore
    [stats, pieGradient, pieColors,];
}
if (!__VLS_ctx.hasPieData) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "empty-hint" },
    });
    /** @type {__VLS_StyleScopedClasses['empty-hint']} */ ;
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "chart-card" },
});
/** @type {__VLS_StyleScopedClasses['chart-card']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "chart-title" },
});
/** @type {__VLS_StyleScopedClasses['chart-title']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "chart-body bar-chart-body" },
});
/** @type {__VLS_StyleScopedClasses['chart-body']} */ ;
/** @type {__VLS_StyleScopedClasses['bar-chart-body']} */ ;
for (const [item] of __VLS_vFor((__VLS_ctx.stats.buildingDistribution))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "bar-item" },
        key: (item.name),
    });
    /** @type {__VLS_StyleScopedClasses['bar-item']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "bar-info" },
    });
    /** @type {__VLS_StyleScopedClasses['bar-info']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "bar-name" },
    });
    /** @type {__VLS_StyleScopedClasses['bar-name']} */ ;
    (item.name);
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "bar-val" },
    });
    /** @type {__VLS_StyleScopedClasses['bar-val']} */ ;
    (item.value);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "bar-track" },
    });
    /** @type {__VLS_StyleScopedClasses['bar-track']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "bar-fill" },
        ...{ style: ({ width: (item.value / __VLS_ctx.maxBuildingValue * 100) + '%' }) },
    });
    /** @type {__VLS_StyleScopedClasses['bar-fill']} */ ;
    // @ts-ignore
    [stats, hasPieData, maxBuildingValue,];
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=Dashboard.vue.js.map