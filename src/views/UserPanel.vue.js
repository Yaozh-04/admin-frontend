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
const searchQuery = ref('');
const dialogVisible = ref(false);
const submitLoading = ref(false);
const currentUser = ref({});
const newScore = ref(100);
const fetchData = async () => {
    loading.value = true;
    try {
        const res = await request.get('/admin/users', {
            params: {
                current: currentPage.value,
                size: pageSize.value,
                keyword: searchQuery.value
            }
        });
        tableData.value = res.data.records;
        total.value = res.data.total;
    }
    catch (err) {
        ElMessage.error('拉取用户列表失败');
    }
    finally {
        loading.value = false;
    }
};
const handleSearch = () => {
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
const openEditDialog = (row) => {
    currentUser.value = row;
    newScore.value = row.creditScore;
    dialogVisible.value = true;
};
const submitScoreChange = async () => {
    submitLoading.value = true;
    try {
        await request.put(`/admin/users/${currentUser.value.id}/credit`, {
            score: newScore.value
        });
        ElMessage.success('积分行政调控生效');
        dialogVisible.value = false;
        fetchData();
    }
    catch (err) {
        ElMessage.error('调控失败');
    }
    finally {
        submitLoading.value = false;
    }
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
    ...{ class: "user-panel-container" },
});
/** @type {__VLS_StyleScopedClasses['user-panel-container']} */ ;
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
    /** @ts-ignore @type {typeof __VLS_components.elInput | typeof __VLS_components.ElInput | typeof __VLS_components.elInput | typeof __VLS_components.ElInput} */
    elInput;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
        ...{ 'onKeyup': {} },
        ...{ 'onClear': {} },
        modelValue: (__VLS_ctx.searchQuery),
        placeholder: "搜索昵称/学号",
        ...{ class: "search-input" },
        clearable: true,
    }));
    const __VLS_9 = __VLS_8({
        ...{ 'onKeyup': {} },
        ...{ 'onClear': {} },
        modelValue: (__VLS_ctx.searchQuery),
        placeholder: "搜索昵称/学号",
        ...{ class: "search-input" },
        clearable: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    let __VLS_12;
    const __VLS_13 = ({ keyup: {} },
        { onKeyup: (__VLS_ctx.handleSearch) });
    const __VLS_14 = ({ clear: {} },
        { onClear: (__VLS_ctx.handleSearch) });
    /** @type {__VLS_StyleScopedClasses['search-input']} */ ;
    const { default: __VLS_15 } = __VLS_10.slots;
    {
        const { append: __VLS_16 } = __VLS_10.slots;
        let __VLS_17;
        /** @ts-ignore @type {typeof __VLS_components.elButton | typeof __VLS_components.ElButton} */
        elButton;
        // @ts-ignore
        const __VLS_18 = __VLS_asFunctionalComponent1(__VLS_17, new __VLS_17({
            ...{ 'onClick': {} },
            icon: "Search",
        }));
        const __VLS_19 = __VLS_18({
            ...{ 'onClick': {} },
            icon: "Search",
        }, ...__VLS_functionalComponentArgsRest(__VLS_18));
        let __VLS_22;
        const __VLS_23 = ({ click: {} },
            { onClick: (__VLS_ctx.handleSearch) });
        var __VLS_20;
        var __VLS_21;
        // @ts-ignore
        [searchQuery, handleSearch, handleSearch, handleSearch,];
    }
    // @ts-ignore
    [];
    var __VLS_10;
    var __VLS_11;
    // @ts-ignore
    [];
}
let __VLS_24;
/** @ts-ignore @type {typeof __VLS_components.elTable | typeof __VLS_components.ElTable | typeof __VLS_components.elTable | typeof __VLS_components.ElTable} */
elTable;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent1(__VLS_24, new __VLS_24({
    data: (__VLS_ctx.tableData),
    ...{ style: {} },
    border: true,
    stripe: true,
}));
const __VLS_26 = __VLS_25({
    data: (__VLS_ctx.tableData),
    ...{ style: {} },
    border: true,
    stripe: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
__VLS_asFunctionalDirective(__VLS_directives.vLoading, {})(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.loading) }, null, null);
const { default: __VLS_29 } = __VLS_27.slots;
let __VLS_30;
/** @ts-ignore @type {typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent1(__VLS_30, new __VLS_30({
    prop: "id",
    label: "系统内码",
    width: "100",
}));
const __VLS_32 = __VLS_31({
    prop: "id",
    label: "系统内码",
    width: "100",
}, ...__VLS_functionalComponentArgsRest(__VLS_31));
let __VLS_35;
/** @ts-ignore @type {typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_36 = __VLS_asFunctionalComponent1(__VLS_35, new __VLS_35({
    prop: "openid",
    label: "微信 OpenID",
    showOverflowTooltip: true,
}));
const __VLS_37 = __VLS_36({
    prop: "openid",
    label: "微信 OpenID",
    showOverflowTooltip: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_36));
let __VLS_40;
/** @ts-ignore @type {typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_41 = __VLS_asFunctionalComponent1(__VLS_40, new __VLS_40({
    prop: "studentId",
    label: "绑定学号",
    width: "150",
}));
const __VLS_42 = __VLS_41({
    prop: "studentId",
    label: "绑定学号",
    width: "150",
}, ...__VLS_functionalComponentArgsRest(__VLS_41));
const { default: __VLS_45 } = __VLS_43.slots;
{
    const { default: __VLS_46 } = __VLS_43.slots;
    const [scope] = __VLS_vSlot(__VLS_46);
    (scope.row.studentId || '未绑定');
    // @ts-ignore
    [tableData, vLoading, loading,];
}
// @ts-ignore
[];
var __VLS_43;
let __VLS_47;
/** @ts-ignore @type {typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_48 = __VLS_asFunctionalComponent1(__VLS_47, new __VLS_47({
    prop: "nickname",
    label: "学生昵称",
    width: "150",
}));
const __VLS_49 = __VLS_48({
    prop: "nickname",
    label: "学生昵称",
    width: "150",
}, ...__VLS_functionalComponentArgsRest(__VLS_48));
let __VLS_52;
/** @ts-ignore @type {typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_53 = __VLS_asFunctionalComponent1(__VLS_52, new __VLS_52({
    label: "信用积分",
    width: "150",
    align: "center",
}));
const __VLS_54 = __VLS_53({
    label: "信用积分",
    width: "150",
    align: "center",
}, ...__VLS_functionalComponentArgsRest(__VLS_53));
const { default: __VLS_57 } = __VLS_55.slots;
{
    const { default: __VLS_58 } = __VLS_55.slots;
    const [scope] = __VLS_vSlot(__VLS_58);
    let __VLS_59;
    /** @ts-ignore @type {typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components.elTag | typeof __VLS_components.ElTag} */
    elTag;
    // @ts-ignore
    const __VLS_60 = __VLS_asFunctionalComponent1(__VLS_59, new __VLS_59({
        type: (scope.row.creditScore >= 60 ? 'success' : 'danger'),
        effect: "dark",
    }));
    const __VLS_61 = __VLS_60({
        type: (scope.row.creditScore >= 60 ? 'success' : 'danger'),
        effect: "dark",
    }, ...__VLS_functionalComponentArgsRest(__VLS_60));
    const { default: __VLS_64 } = __VLS_62.slots;
    (scope.row.creditScore);
    // @ts-ignore
    [];
    var __VLS_62;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_55;
let __VLS_65;
/** @ts-ignore @type {typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_66 = __VLS_asFunctionalComponent1(__VLS_65, new __VLS_65({
    prop: "createdAt",
    label: "建立时间",
    width: "200",
}));
const __VLS_67 = __VLS_66({
    prop: "createdAt",
    label: "建立时间",
    width: "200",
}, ...__VLS_functionalComponentArgsRest(__VLS_66));
let __VLS_70;
/** @ts-ignore @type {typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_71 = __VLS_asFunctionalComponent1(__VLS_70, new __VLS_70({
    label: "操作",
    width: "150",
    fixed: "right",
    align: "center",
}));
const __VLS_72 = __VLS_71({
    label: "操作",
    width: "150",
    fixed: "right",
    align: "center",
}, ...__VLS_functionalComponentArgsRest(__VLS_71));
const { default: __VLS_75 } = __VLS_73.slots;
{
    const { default: __VLS_76 } = __VLS_73.slots;
    const [scope] = __VLS_vSlot(__VLS_76);
    let __VLS_77;
    /** @ts-ignore @type {typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components.elButton | typeof __VLS_components.ElButton} */
    elButton;
    // @ts-ignore
    const __VLS_78 = __VLS_asFunctionalComponent1(__VLS_77, new __VLS_77({
        ...{ 'onClick': {} },
        type: "primary",
        size: "small",
    }));
    const __VLS_79 = __VLS_78({
        ...{ 'onClick': {} },
        type: "primary",
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_78));
    let __VLS_82;
    const __VLS_83 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.openEditDialog(scope.row);
                // @ts-ignore
                [openEditDialog,];
            } });
    const { default: __VLS_84 } = __VLS_80.slots;
    // @ts-ignore
    [];
    var __VLS_80;
    var __VLS_81;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_73;
// @ts-ignore
[];
var __VLS_27;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "pagination-block" },
});
/** @type {__VLS_StyleScopedClasses['pagination-block']} */ ;
let __VLS_85;
/** @ts-ignore @type {typeof __VLS_components.elPagination | typeof __VLS_components.ElPagination} */
elPagination;
// @ts-ignore
const __VLS_86 = __VLS_asFunctionalComponent1(__VLS_85, new __VLS_85({
    ...{ 'onSizeChange': {} },
    ...{ 'onCurrentChange': {} },
    currentPage: (__VLS_ctx.currentPage),
    pageSize: (__VLS_ctx.pageSize),
    pageSizes: ([10, 20, 50]),
    background: true,
    layout: "total, sizes, prev, pager, next, jumper",
    total: (__VLS_ctx.total),
}));
const __VLS_87 = __VLS_86({
    ...{ 'onSizeChange': {} },
    ...{ 'onCurrentChange': {} },
    currentPage: (__VLS_ctx.currentPage),
    pageSize: (__VLS_ctx.pageSize),
    pageSizes: ([10, 20, 50]),
    background: true,
    layout: "total, sizes, prev, pager, next, jumper",
    total: (__VLS_ctx.total),
}, ...__VLS_functionalComponentArgsRest(__VLS_86));
let __VLS_90;
const __VLS_91 = ({ sizeChange: {} },
    { onSizeChange: (__VLS_ctx.handleSizeChange) });
const __VLS_92 = ({ currentChange: {} },
    { onCurrentChange: (__VLS_ctx.handleCurrentChange) });
var __VLS_88;
var __VLS_89;
// @ts-ignore
[currentPage, pageSize, total, handleSizeChange, handleCurrentChange,];
var __VLS_3;
let __VLS_93;
/** @ts-ignore @type {typeof __VLS_components.elDialog | typeof __VLS_components.ElDialog | typeof __VLS_components.elDialog | typeof __VLS_components.ElDialog} */
elDialog;
// @ts-ignore
const __VLS_94 = __VLS_asFunctionalComponent1(__VLS_93, new __VLS_93({
    modelValue: (__VLS_ctx.dialogVisible),
    title: "行政调控信誉分 (支持撤销违约扣分等申诉处理)",
    width: "30%",
}));
const __VLS_95 = __VLS_94({
    modelValue: (__VLS_ctx.dialogVisible),
    title: "行政调控信誉分 (支持撤销违约扣分等申诉处理)",
    width: "30%",
}, ...__VLS_functionalComponentArgsRest(__VLS_94));
const { default: __VLS_98 } = __VLS_96.slots;
let __VLS_99;
/** @ts-ignore @type {typeof __VLS_components.elForm | typeof __VLS_components.ElForm | typeof __VLS_components.elForm | typeof __VLS_components.ElForm} */
elForm;
// @ts-ignore
const __VLS_100 = __VLS_asFunctionalComponent1(__VLS_99, new __VLS_99({
    labelWidth: "120px",
}));
const __VLS_101 = __VLS_100({
    labelWidth: "120px",
}, ...__VLS_functionalComponentArgsRest(__VLS_100));
const { default: __VLS_104 } = __VLS_102.slots;
let __VLS_105;
/** @ts-ignore @type {typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem} */
elFormItem;
// @ts-ignore
const __VLS_106 = __VLS_asFunctionalComponent1(__VLS_105, new __VLS_105({
    label: "学生昵称",
}));
const __VLS_107 = __VLS_106({
    label: "学生昵称",
}, ...__VLS_functionalComponentArgsRest(__VLS_106));
const { default: __VLS_110 } = __VLS_108.slots;
let __VLS_111;
/** @ts-ignore @type {typeof __VLS_components.elInput | typeof __VLS_components.ElInput} */
elInput;
// @ts-ignore
const __VLS_112 = __VLS_asFunctionalComponent1(__VLS_111, new __VLS_111({
    modelValue: (__VLS_ctx.currentUser.nickname),
    disabled: true,
}));
const __VLS_113 = __VLS_112({
    modelValue: (__VLS_ctx.currentUser.nickname),
    disabled: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_112));
// @ts-ignore
[dialogVisible, currentUser,];
var __VLS_108;
let __VLS_116;
/** @ts-ignore @type {typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem} */
elFormItem;
// @ts-ignore
const __VLS_117 = __VLS_asFunctionalComponent1(__VLS_116, new __VLS_116({
    label: "最新积分",
}));
const __VLS_118 = __VLS_117({
    label: "最新积分",
}, ...__VLS_functionalComponentArgsRest(__VLS_117));
const { default: __VLS_121 } = __VLS_119.slots;
let __VLS_122;
/** @ts-ignore @type {typeof __VLS_components.elInputNumber | typeof __VLS_components.ElInputNumber} */
elInputNumber;
// @ts-ignore
const __VLS_123 = __VLS_asFunctionalComponent1(__VLS_122, new __VLS_122({
    modelValue: (__VLS_ctx.newScore),
    min: (0),
    max: (100),
}));
const __VLS_124 = __VLS_123({
    modelValue: (__VLS_ctx.newScore),
    min: (0),
    max: (100),
}, ...__VLS_functionalComponentArgsRest(__VLS_123));
// @ts-ignore
[newScore,];
var __VLS_119;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "note-text" },
});
/** @type {__VLS_StyleScopedClasses['note-text']} */ ;
// @ts-ignore
[];
var __VLS_102;
{
    const { footer: __VLS_127 } = __VLS_96.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "dialog-footer" },
    });
    /** @type {__VLS_StyleScopedClasses['dialog-footer']} */ ;
    let __VLS_128;
    /** @ts-ignore @type {typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components.elButton | typeof __VLS_components.ElButton} */
    elButton;
    // @ts-ignore
    const __VLS_129 = __VLS_asFunctionalComponent1(__VLS_128, new __VLS_128({
        ...{ 'onClick': {} },
    }));
    const __VLS_130 = __VLS_129({
        ...{ 'onClick': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_129));
    let __VLS_133;
    const __VLS_134 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.dialogVisible = false;
                // @ts-ignore
                [dialogVisible,];
            } });
    const { default: __VLS_135 } = __VLS_131.slots;
    // @ts-ignore
    [];
    var __VLS_131;
    var __VLS_132;
    let __VLS_136;
    /** @ts-ignore @type {typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components.elButton | typeof __VLS_components.ElButton} */
    elButton;
    // @ts-ignore
    const __VLS_137 = __VLS_asFunctionalComponent1(__VLS_136, new __VLS_136({
        ...{ 'onClick': {} },
        type: "primary",
        loading: (__VLS_ctx.submitLoading),
    }));
    const __VLS_138 = __VLS_137({
        ...{ 'onClick': {} },
        type: "primary",
        loading: (__VLS_ctx.submitLoading),
    }, ...__VLS_functionalComponentArgsRest(__VLS_137));
    let __VLS_141;
    const __VLS_142 = ({ click: {} },
        { onClick: (__VLS_ctx.submitScoreChange) });
    const { default: __VLS_143 } = __VLS_139.slots;
    // @ts-ignore
    [submitLoading, submitScoreChange,];
    var __VLS_139;
    var __VLS_140;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_96;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=UserPanel.vue.js.map