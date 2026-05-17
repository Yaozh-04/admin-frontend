/// <reference types="E:/project/StudyRoom/admin-frontend/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="E:/project/StudyRoom/admin-frontend/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, onMounted } from 'vue';
import request from '@/utils/request';
import { ElMessage } from 'element-plus';
const loading = ref(false);
const tableData = ref([]);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const statusFilter = ref(undefined);
const fetchData = async () => {
    loading.value = true;
    try {
        const res = await request.get('/admin/reservations', {
            params: {
                current: currentPage.value,
                size: pageSize.value,
                status: statusFilter.value
            }
        });
        tableData.value = res.data.records;
        total.value = res.data.total;
    }
    catch (err) {
        ElMessage.error('获取监控流水失败');
    }
    finally {
        loading.value = false;
    }
};
const handleFilter = () => {
    currentPage.value = 1;
    fetchData();
};
const handleSizeChange = (val) => {
    pageSize.value = val;
    fetchData();
};
const handleCurrentChange = (val) => {
    currentPage.value = val;
    fetchData();
};
onMounted(() => {
    fetchData();
});
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "reservation-flow-container" },
});
/** @type {__VLS_StyleScopedClasses['reservation-flow-container']} */ ;
let __VLS_0;
/** @ts-ignore @type {typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components.elCard | typeof __VLS_components.ElCard} */
elCard;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ class: "box-card" },
}));
const __VLS_2 = __VLS_1({
    ...{ class: "box-card" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
/** @type {__VLS_StyleScopedClasses['box-card']} */ ;
const { default: __VLS_5 } = __VLS_3.slots;
{
    const { header: __VLS_6 } = __VLS_3.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "card-header" },
    });
    /** @type {__VLS_StyleScopedClasses['card-header']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    let __VLS_7;
    /** @ts-ignore @type {typeof __VLS_components.elSelect | typeof __VLS_components.ElSelect | typeof __VLS_components.elSelect | typeof __VLS_components.ElSelect} */
    elSelect;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
        ...{ 'onChange': {} },
        modelValue: (__VLS_ctx.statusFilter),
        placeholder: "过滤订单状态",
        clearable: true,
        ...{ style: {} },
    }));
    const __VLS_9 = __VLS_8({
        ...{ 'onChange': {} },
        modelValue: (__VLS_ctx.statusFilter),
        placeholder: "过滤订单状态",
        clearable: true,
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    let __VLS_12;
    const __VLS_13 = ({ change: {} },
        { onChange: (__VLS_ctx.handleFilter) });
    const { default: __VLS_14 } = __VLS_10.slots;
    let __VLS_15;
    /** @ts-ignore @type {typeof __VLS_components.elOption | typeof __VLS_components.ElOption} */
    elOption;
    // @ts-ignore
    const __VLS_16 = __VLS_asFunctionalComponent1(__VLS_15, new __VLS_15({
        label: "待签到 (活跃)",
        value: (0),
    }));
    const __VLS_17 = __VLS_16({
        label: "待签到 (活跃)",
        value: (0),
    }, ...__VLS_functionalComponentArgsRest(__VLS_16));
    let __VLS_20;
    /** @ts-ignore @type {typeof __VLS_components.elOption | typeof __VLS_components.ElOption} */
    elOption;
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent1(__VLS_20, new __VLS_20({
        label: "已正常签到 (活跃)",
        value: (1),
    }));
    const __VLS_22 = __VLS_21({
        label: "已正常签到 (活跃)",
        value: (1),
    }, ...__VLS_functionalComponentArgsRest(__VLS_21));
    let __VLS_25;
    /** @ts-ignore @type {typeof __VLS_components.elOption | typeof __VLS_components.ElOption} */
    elOption;
    // @ts-ignore
    const __VLS_26 = __VLS_asFunctionalComponent1(__VLS_25, new __VLS_25({
        label: "主动取消 (终止)",
        value: (2),
    }));
    const __VLS_27 = __VLS_26({
        label: "主动取消 (终止)",
        value: (2),
    }, ...__VLS_functionalComponentArgsRest(__VLS_26));
    let __VLS_30;
    /** @ts-ignore @type {typeof __VLS_components.elOption | typeof __VLS_components.ElOption} */
    elOption;
    // @ts-ignore
    const __VLS_31 = __VLS_asFunctionalComponent1(__VLS_30, new __VLS_30({
        label: "恶意违约漏签 (终止)",
        value: (3),
    }));
    const __VLS_32 = __VLS_31({
        label: "恶意违约漏签 (终止)",
        value: (3),
    }, ...__VLS_functionalComponentArgsRest(__VLS_31));
    let __VLS_35;
    /** @ts-ignore @type {typeof __VLS_components.elOption | typeof __VLS_components.ElOption} */
    elOption;
    // @ts-ignore
    const __VLS_36 = __VLS_asFunctionalComponent1(__VLS_35, new __VLS_35({
        label: "合规提前离开 (终止)",
        value: (4),
    }));
    const __VLS_37 = __VLS_36({
        label: "合规提前离开 (终止)",
        value: (4),
    }, ...__VLS_functionalComponentArgsRest(__VLS_36));
    // @ts-ignore
    [statusFilter, handleFilter,];
    var __VLS_10;
    var __VLS_11;
    // @ts-ignore
    [];
}
let __VLS_40;
/** @ts-ignore @type {typeof __VLS_components.elTable | typeof __VLS_components.ElTable | typeof __VLS_components.elTable | typeof __VLS_components.ElTable} */
elTable;
// @ts-ignore
const __VLS_41 = __VLS_asFunctionalComponent1(__VLS_40, new __VLS_40({
    data: (__VLS_ctx.tableData),
    ...{ style: {} },
    border: true,
}));
const __VLS_42 = __VLS_41({
    data: (__VLS_ctx.tableData),
    ...{ style: {} },
    border: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_41));
__VLS_asFunctionalDirective(__VLS_directives.vLoading, {})(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.loading) }, null, null);
const { default: __VLS_45 } = __VLS_43.slots;
let __VLS_46;
/** @ts-ignore @type {typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_47 = __VLS_asFunctionalComponent1(__VLS_46, new __VLS_46({
    prop: "id",
    label: "订单哈希码",
    width: "100",
}));
const __VLS_48 = __VLS_47({
    prop: "id",
    label: "订单哈希码",
    width: "100",
}, ...__VLS_functionalComponentArgsRest(__VLS_47));
let __VLS_51;
/** @ts-ignore @type {typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_52 = __VLS_asFunctionalComponent1(__VLS_51, new __VLS_51({
    label: "系统归属",
    width: "180",
}));
const __VLS_53 = __VLS_52({
    label: "系统归属",
    width: "180",
}, ...__VLS_functionalComponentArgsRest(__VLS_52));
const { default: __VLS_56 } = __VLS_54.slots;
{
    const { default: __VLS_57 } = __VLS_54.slots;
    const [scope] = __VLS_vSlot(__VLS_57);
    (scope.row.userId);
    __VLS_asFunctionalElement1(__VLS_intrinsics.br)({});
    // @ts-ignore
    [tableData, vLoading, loading,];
}
// @ts-ignore
[];
var __VLS_54;
let __VLS_58;
/** @ts-ignore @type {typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_59 = __VLS_asFunctionalComponent1(__VLS_58, new __VLS_58({
    label: "资源锚点",
    width: "180",
}));
const __VLS_60 = __VLS_59({
    label: "资源锚点",
    width: "180",
}, ...__VLS_functionalComponentArgsRest(__VLS_59));
const { default: __VLS_63 } = __VLS_61.slots;
{
    const { default: __VLS_64 } = __VLS_61.slots;
    const [scope] = __VLS_vSlot(__VLS_64);
    (scope.row.roomId);
    (scope.row.seatId);
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_61;
let __VLS_65;
/** @ts-ignore @type {typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_66 = __VLS_asFunctionalComponent1(__VLS_65, new __VLS_65({
    prop: "date",
    label: "考勤公历",
    width: "120",
}));
const __VLS_67 = __VLS_66({
    prop: "date",
    label: "考勤公历",
    width: "120",
}, ...__VLS_functionalComponentArgsRest(__VLS_66));
let __VLS_70;
/** @ts-ignore @type {typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_71 = __VLS_asFunctionalComponent1(__VLS_70, new __VLS_70({
    label: "占用时段锁定",
    width: "180",
}));
const __VLS_72 = __VLS_71({
    label: "占用时段锁定",
    width: "180",
}, ...__VLS_functionalComponentArgsRest(__VLS_71));
const { default: __VLS_75 } = __VLS_73.slots;
{
    const { default: __VLS_76 } = __VLS_73.slots;
    const [scope] = __VLS_vSlot(__VLS_76);
    let __VLS_77;
    /** @ts-ignore @type {typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components.elTag | typeof __VLS_components.ElTag} */
    elTag;
    // @ts-ignore
    const __VLS_78 = __VLS_asFunctionalComponent1(__VLS_77, new __VLS_77({
        type: "info",
        size: "small",
    }));
    const __VLS_79 = __VLS_78({
        type: "info",
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_78));
    const { default: __VLS_82 } = __VLS_80.slots;
    (scope.row.startTime);
    (scope.row.endTime);
    // @ts-ignore
    [];
    var __VLS_80;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_73;
let __VLS_83;
/** @ts-ignore @type {typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_84 = __VLS_asFunctionalComponent1(__VLS_83, new __VLS_83({
    label: "最终裁定状态",
    align: "center",
}));
const __VLS_85 = __VLS_84({
    label: "最终裁定状态",
    align: "center",
}, ...__VLS_functionalComponentArgsRest(__VLS_84));
const { default: __VLS_88 } = __VLS_86.slots;
{
    const { default: __VLS_89 } = __VLS_86.slots;
    const [scope] = __VLS_vSlot(__VLS_89);
    if (scope.row.status === 0) {
        let __VLS_90;
        /** @ts-ignore @type {typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components.elTag | typeof __VLS_components.ElTag} */
        elTag;
        // @ts-ignore
        const __VLS_91 = __VLS_asFunctionalComponent1(__VLS_90, new __VLS_90({
            type: "primary",
        }));
        const __VLS_92 = __VLS_91({
            type: "primary",
        }, ...__VLS_functionalComponentArgsRest(__VLS_91));
        const { default: __VLS_95 } = __VLS_93.slots;
        // @ts-ignore
        [];
        var __VLS_93;
    }
    else if (scope.row.status === 1) {
        let __VLS_96;
        /** @ts-ignore @type {typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components.elTag | typeof __VLS_components.ElTag} */
        elTag;
        // @ts-ignore
        const __VLS_97 = __VLS_asFunctionalComponent1(__VLS_96, new __VLS_96({
            type: "success",
        }));
        const __VLS_98 = __VLS_97({
            type: "success",
        }, ...__VLS_functionalComponentArgsRest(__VLS_97));
        const { default: __VLS_101 } = __VLS_99.slots;
        // @ts-ignore
        [];
        var __VLS_99;
    }
    else if (scope.row.status === 2) {
        let __VLS_102;
        /** @ts-ignore @type {typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components.elTag | typeof __VLS_components.ElTag} */
        elTag;
        // @ts-ignore
        const __VLS_103 = __VLS_asFunctionalComponent1(__VLS_102, new __VLS_102({
            type: "info",
        }));
        const __VLS_104 = __VLS_103({
            type: "info",
        }, ...__VLS_functionalComponentArgsRest(__VLS_103));
        const { default: __VLS_107 } = __VLS_105.slots;
        // @ts-ignore
        [];
        var __VLS_105;
    }
    else if (scope.row.status === 3) {
        let __VLS_108;
        /** @ts-ignore @type {typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components.elTag | typeof __VLS_components.ElTag} */
        elTag;
        // @ts-ignore
        const __VLS_109 = __VLS_asFunctionalComponent1(__VLS_108, new __VLS_108({
            type: "danger",
            effect: "dark",
        }));
        const __VLS_110 = __VLS_109({
            type: "danger",
            effect: "dark",
        }, ...__VLS_functionalComponentArgsRest(__VLS_109));
        const { default: __VLS_113 } = __VLS_111.slots;
        // @ts-ignore
        [];
        var __VLS_111;
    }
    else if (scope.row.status === 4) {
        let __VLS_114;
        /** @ts-ignore @type {typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components.elTag | typeof __VLS_components.ElTag} */
        elTag;
        // @ts-ignore
        const __VLS_115 = __VLS_asFunctionalComponent1(__VLS_114, new __VLS_114({
            type: "warning",
        }));
        const __VLS_116 = __VLS_115({
            type: "warning",
        }, ...__VLS_functionalComponentArgsRest(__VLS_115));
        const { default: __VLS_119 } = __VLS_117.slots;
        // @ts-ignore
        [];
        var __VLS_117;
    }
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_86;
let __VLS_120;
/** @ts-ignore @type {typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_121 = __VLS_asFunctionalComponent1(__VLS_120, new __VLS_120({
    label: "物理签到快照",
    width: "180",
}));
const __VLS_122 = __VLS_121({
    label: "物理签到快照",
    width: "180",
}, ...__VLS_functionalComponentArgsRest(__VLS_121));
const { default: __VLS_125 } = __VLS_123.slots;
{
    const { default: __VLS_126 } = __VLS_123.slots;
    const [scope] = __VLS_vSlot(__VLS_126);
    (scope.row.checkinAt ? scope.row.checkinAt.replace('T', ' ') : '-- 未触发 --');
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_123;
// @ts-ignore
[];
var __VLS_43;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "pagination-block" },
});
/** @type {__VLS_StyleScopedClasses['pagination-block']} */ ;
let __VLS_127;
/** @ts-ignore @type {typeof __VLS_components.elPagination | typeof __VLS_components.ElPagination} */
elPagination;
// @ts-ignore
const __VLS_128 = __VLS_asFunctionalComponent1(__VLS_127, new __VLS_127({
    ...{ 'onSizeChange': {} },
    ...{ 'onCurrentChange': {} },
    currentPage: (__VLS_ctx.currentPage),
    pageSize: (__VLS_ctx.pageSize),
    pageSizes: ([10, 20, 50]),
    background: true,
    layout: "total, sizes, prev, pager, next, jumper",
    total: (__VLS_ctx.total),
}));
const __VLS_129 = __VLS_128({
    ...{ 'onSizeChange': {} },
    ...{ 'onCurrentChange': {} },
    currentPage: (__VLS_ctx.currentPage),
    pageSize: (__VLS_ctx.pageSize),
    pageSizes: ([10, 20, 50]),
    background: true,
    layout: "total, sizes, prev, pager, next, jumper",
    total: (__VLS_ctx.total),
}, ...__VLS_functionalComponentArgsRest(__VLS_128));
let __VLS_132;
const __VLS_133 = ({ sizeChange: {} },
    { onSizeChange: (__VLS_ctx.handleSizeChange) });
const __VLS_134 = ({ currentChange: {} },
    { onCurrentChange: (__VLS_ctx.handleCurrentChange) });
var __VLS_130;
var __VLS_131;
// @ts-ignore
[currentPage, pageSize, total, handleSizeChange, handleCurrentChange,];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=ReservationFlow.vue.js.map