/// <reference types="E:/project/StudyRoom/admin-frontend/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="E:/project/StudyRoom/admin-frontend/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, onMounted } from 'vue';
import request from '@/utils/request';
import { ElMessage, ElMessageBox } from 'element-plus';
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
        ElMessage.success('信用分已更新');
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
const toggleStatus = async (row) => {
    const newStatus = row.status === 0 ? 1 : 0;
    const actionName = newStatus === 0 ? '封禁' : '解封';
    if (newStatus === 0) {
        try {
            await ElMessageBox.confirm(`确定要封禁学生 [${row.nickname || row.id}] 的账号吗？封禁期间该学生将直接失去所有座位预约权限并强制踢下线。`, '高危操作警告', {
                type: 'error',
                confirmButtonText: '确定封禁',
                cancelButtonText: '取消'
            });
        }
        catch {
            return;
        }
    }
    try {
        await request.put(`/admin/users/${row.id}/status`, { status: newStatus });
        ElMessage.success(`${actionName}成功`);
        fetchData();
    }
    catch (err) {
        ElMessage.error(`${actionName}失败，请重试`);
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
/** @type {__VLS_StyleScopedClasses['el-table']} */ ;
/** @type {__VLS_StyleScopedClasses['el-table']} */ ;
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
    label: "用户ID",
    width: "80",
}));
const __VLS_32 = __VLS_31({
    prop: "id",
    label: "用户ID",
    width: "80",
}, ...__VLS_functionalComponentArgsRest(__VLS_31));
let __VLS_35;
/** @ts-ignore @type {typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_36 = __VLS_asFunctionalComponent1(__VLS_35, new __VLS_35({
    prop: "studentId",
    label: "绑定学号",
    width: "150",
}));
const __VLS_37 = __VLS_36({
    prop: "studentId",
    label: "绑定学号",
    width: "150",
}, ...__VLS_functionalComponentArgsRest(__VLS_36));
const { default: __VLS_40 } = __VLS_38.slots;
{
    const { default: __VLS_41 } = __VLS_38.slots;
    const [scope] = __VLS_vSlot(__VLS_41);
    (scope.row.studentId || '未绑定');
    // @ts-ignore
    [tableData, vLoading, loading,];
}
// @ts-ignore
[];
var __VLS_38;
let __VLS_42;
/** @ts-ignore @type {typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_43 = __VLS_asFunctionalComponent1(__VLS_42, new __VLS_42({
    prop: "nickname",
    label: "学生昵称",
    width: "150",
}));
const __VLS_44 = __VLS_43({
    prop: "nickname",
    label: "学生昵称",
    width: "150",
}, ...__VLS_functionalComponentArgsRest(__VLS_43));
let __VLS_47;
/** @ts-ignore @type {typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_48 = __VLS_asFunctionalComponent1(__VLS_47, new __VLS_47({
    prop: "realName",
    label: "姓名",
    width: "100",
}));
const __VLS_49 = __VLS_48({
    prop: "realName",
    label: "姓名",
    width: "100",
}, ...__VLS_functionalComponentArgsRest(__VLS_48));
const { default: __VLS_52 } = __VLS_50.slots;
{
    const { default: __VLS_53 } = __VLS_50.slots;
    const [scope] = __VLS_vSlot(__VLS_53);
    (scope.row.realName || '未填写');
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_50;
let __VLS_54;
/** @ts-ignore @type {typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_55 = __VLS_asFunctionalComponent1(__VLS_54, new __VLS_54({
    prop: "college",
    label: "学院",
    width: "150",
    showOverflowTooltip: true,
}));
const __VLS_56 = __VLS_55({
    prop: "college",
    label: "学院",
    width: "150",
    showOverflowTooltip: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_55));
const { default: __VLS_59 } = __VLS_57.slots;
{
    const { default: __VLS_60 } = __VLS_57.slots;
    const [scope] = __VLS_vSlot(__VLS_60);
    (scope.row.college || '未填写');
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_57;
let __VLS_61;
/** @ts-ignore @type {typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_62 = __VLS_asFunctionalComponent1(__VLS_61, new __VLS_61({
    prop: "className",
    label: "班级",
    width: "120",
}));
const __VLS_63 = __VLS_62({
    prop: "className",
    label: "班级",
    width: "120",
}, ...__VLS_functionalComponentArgsRest(__VLS_62));
const { default: __VLS_66 } = __VLS_64.slots;
{
    const { default: __VLS_67 } = __VLS_64.slots;
    const [scope] = __VLS_vSlot(__VLS_67);
    (scope.row.className || '未填写');
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_64;
let __VLS_68;
/** @ts-ignore @type {typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_69 = __VLS_asFunctionalComponent1(__VLS_68, new __VLS_68({
    label: "信用积分",
    width: "150",
    align: "center",
}));
const __VLS_70 = __VLS_69({
    label: "信用积分",
    width: "150",
    align: "center",
}, ...__VLS_functionalComponentArgsRest(__VLS_69));
const { default: __VLS_73 } = __VLS_71.slots;
{
    const { default: __VLS_74 } = __VLS_71.slots;
    const [scope] = __VLS_vSlot(__VLS_74);
    let __VLS_75;
    /** @ts-ignore @type {typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components.elTag | typeof __VLS_components.ElTag} */
    elTag;
    // @ts-ignore
    const __VLS_76 = __VLS_asFunctionalComponent1(__VLS_75, new __VLS_75({
        type: (scope.row.creditScore >= 60 ? 'success' : 'danger'),
        effect: "dark",
    }));
    const __VLS_77 = __VLS_76({
        type: (scope.row.creditScore >= 60 ? 'success' : 'danger'),
        effect: "dark",
    }, ...__VLS_functionalComponentArgsRest(__VLS_76));
    const { default: __VLS_80 } = __VLS_78.slots;
    (scope.row.creditScore);
    // @ts-ignore
    [];
    var __VLS_78;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_71;
let __VLS_81;
/** @ts-ignore @type {typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_82 = __VLS_asFunctionalComponent1(__VLS_81, new __VLS_81({
    label: "账号状态",
    width: "100",
    align: "center",
}));
const __VLS_83 = __VLS_82({
    label: "账号状态",
    width: "100",
    align: "center",
}, ...__VLS_functionalComponentArgsRest(__VLS_82));
const { default: __VLS_86 } = __VLS_84.slots;
{
    const { default: __VLS_87 } = __VLS_84.slots;
    const [scope] = __VLS_vSlot(__VLS_87);
    let __VLS_88;
    /** @ts-ignore @type {typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components.elTag | typeof __VLS_components.ElTag} */
    elTag;
    // @ts-ignore
    const __VLS_89 = __VLS_asFunctionalComponent1(__VLS_88, new __VLS_88({
        type: (scope.row.status === 0 ? 'danger' : 'success'),
        effect: "dark",
    }));
    const __VLS_90 = __VLS_89({
        type: (scope.row.status === 0 ? 'danger' : 'success'),
        effect: "dark",
    }, ...__VLS_functionalComponentArgsRest(__VLS_89));
    const { default: __VLS_93 } = __VLS_91.slots;
    (scope.row.status === 0 ? '封禁中' : '正常');
    // @ts-ignore
    [];
    var __VLS_91;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_84;
let __VLS_94;
/** @ts-ignore @type {typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_95 = __VLS_asFunctionalComponent1(__VLS_94, new __VLS_94({
    prop: "createdAt",
    label: "注册时间",
    width: "175",
}));
const __VLS_96 = __VLS_95({
    prop: "createdAt",
    label: "注册时间",
    width: "175",
}, ...__VLS_functionalComponentArgsRest(__VLS_95));
let __VLS_99;
/** @ts-ignore @type {typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_100 = __VLS_asFunctionalComponent1(__VLS_99, new __VLS_99({
    label: "操作",
    width: "220",
    fixed: "right",
    align: "center",
}));
const __VLS_101 = __VLS_100({
    label: "操作",
    width: "220",
    fixed: "right",
    align: "center",
}, ...__VLS_functionalComponentArgsRest(__VLS_100));
const { default: __VLS_104 } = __VLS_102.slots;
{
    const { default: __VLS_105 } = __VLS_102.slots;
    const [scope] = __VLS_vSlot(__VLS_105);
    let __VLS_106;
    /** @ts-ignore @type {typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components.elButton | typeof __VLS_components.ElButton} */
    elButton;
    // @ts-ignore
    const __VLS_107 = __VLS_asFunctionalComponent1(__VLS_106, new __VLS_106({
        ...{ 'onClick': {} },
        type: "primary",
        size: "small",
    }));
    const __VLS_108 = __VLS_107({
        ...{ 'onClick': {} },
        type: "primary",
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_107));
    let __VLS_111;
    const __VLS_112 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.openEditDialog(scope.row);
                // @ts-ignore
                [openEditDialog,];
            } });
    const { default: __VLS_113 } = __VLS_109.slots;
    // @ts-ignore
    [];
    var __VLS_109;
    var __VLS_110;
    let __VLS_114;
    /** @ts-ignore @type {typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components.elButton | typeof __VLS_components.ElButton} */
    elButton;
    // @ts-ignore
    const __VLS_115 = __VLS_asFunctionalComponent1(__VLS_114, new __VLS_114({
        ...{ 'onClick': {} },
        type: (scope.row.status === 0 ? 'success' : 'danger'),
        size: "small",
    }));
    const __VLS_116 = __VLS_115({
        ...{ 'onClick': {} },
        type: (scope.row.status === 0 ? 'success' : 'danger'),
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_115));
    let __VLS_119;
    const __VLS_120 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.toggleStatus(scope.row);
                // @ts-ignore
                [toggleStatus,];
            } });
    const { default: __VLS_121 } = __VLS_117.slots;
    (scope.row.status === 0 ? '解封' : '封禁');
    // @ts-ignore
    [];
    var __VLS_117;
    var __VLS_118;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_102;
// @ts-ignore
[];
var __VLS_27;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "pagination-block" },
});
/** @type {__VLS_StyleScopedClasses['pagination-block']} */ ;
let __VLS_122;
/** @ts-ignore @type {typeof __VLS_components.elPagination | typeof __VLS_components.ElPagination} */
elPagination;
// @ts-ignore
const __VLS_123 = __VLS_asFunctionalComponent1(__VLS_122, new __VLS_122({
    ...{ 'onSizeChange': {} },
    ...{ 'onCurrentChange': {} },
    currentPage: (__VLS_ctx.currentPage),
    pageSize: (__VLS_ctx.pageSize),
    pageSizes: ([10, 20, 50]),
    background: true,
    layout: "total, sizes, prev, pager, next, jumper",
    total: (__VLS_ctx.total),
}));
const __VLS_124 = __VLS_123({
    ...{ 'onSizeChange': {} },
    ...{ 'onCurrentChange': {} },
    currentPage: (__VLS_ctx.currentPage),
    pageSize: (__VLS_ctx.pageSize),
    pageSizes: ([10, 20, 50]),
    background: true,
    layout: "total, sizes, prev, pager, next, jumper",
    total: (__VLS_ctx.total),
}, ...__VLS_functionalComponentArgsRest(__VLS_123));
let __VLS_127;
const __VLS_128 = ({ sizeChange: {} },
    { onSizeChange: (__VLS_ctx.handleSizeChange) });
const __VLS_129 = ({ currentChange: {} },
    { onCurrentChange: (__VLS_ctx.handleCurrentChange) });
var __VLS_125;
var __VLS_126;
// @ts-ignore
[currentPage, pageSize, total, handleSizeChange, handleCurrentChange,];
var __VLS_3;
let __VLS_130;
/** @ts-ignore @type {typeof __VLS_components.elDialog | typeof __VLS_components.ElDialog | typeof __VLS_components.elDialog | typeof __VLS_components.ElDialog} */
elDialog;
// @ts-ignore
const __VLS_131 = __VLS_asFunctionalComponent1(__VLS_130, new __VLS_130({
    modelValue: (__VLS_ctx.dialogVisible),
    title: "调整信用分",
    width: "30%",
}));
const __VLS_132 = __VLS_131({
    modelValue: (__VLS_ctx.dialogVisible),
    title: "调整信用分",
    width: "30%",
}, ...__VLS_functionalComponentArgsRest(__VLS_131));
const { default: __VLS_135 } = __VLS_133.slots;
let __VLS_136;
/** @ts-ignore @type {typeof __VLS_components.elForm | typeof __VLS_components.ElForm | typeof __VLS_components.elForm | typeof __VLS_components.ElForm} */
elForm;
// @ts-ignore
const __VLS_137 = __VLS_asFunctionalComponent1(__VLS_136, new __VLS_136({
    labelWidth: "120px",
}));
const __VLS_138 = __VLS_137({
    labelWidth: "120px",
}, ...__VLS_functionalComponentArgsRest(__VLS_137));
const { default: __VLS_141 } = __VLS_139.slots;
let __VLS_142;
/** @ts-ignore @type {typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem} */
elFormItem;
// @ts-ignore
const __VLS_143 = __VLS_asFunctionalComponent1(__VLS_142, new __VLS_142({
    label: "学生昵称",
}));
const __VLS_144 = __VLS_143({
    label: "学生昵称",
}, ...__VLS_functionalComponentArgsRest(__VLS_143));
const { default: __VLS_147 } = __VLS_145.slots;
let __VLS_148;
/** @ts-ignore @type {typeof __VLS_components.elInput | typeof __VLS_components.ElInput} */
elInput;
// @ts-ignore
const __VLS_149 = __VLS_asFunctionalComponent1(__VLS_148, new __VLS_148({
    modelValue: (__VLS_ctx.currentUser.nickname),
    disabled: true,
}));
const __VLS_150 = __VLS_149({
    modelValue: (__VLS_ctx.currentUser.nickname),
    disabled: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_149));
// @ts-ignore
[dialogVisible, currentUser,];
var __VLS_145;
let __VLS_153;
/** @ts-ignore @type {typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem} */
elFormItem;
// @ts-ignore
const __VLS_154 = __VLS_asFunctionalComponent1(__VLS_153, new __VLS_153({
    label: "最新积分",
}));
const __VLS_155 = __VLS_154({
    label: "最新积分",
}, ...__VLS_functionalComponentArgsRest(__VLS_154));
const { default: __VLS_158 } = __VLS_156.slots;
let __VLS_159;
/** @ts-ignore @type {typeof __VLS_components.elInputNumber | typeof __VLS_components.ElInputNumber} */
elInputNumber;
// @ts-ignore
const __VLS_160 = __VLS_asFunctionalComponent1(__VLS_159, new __VLS_159({
    modelValue: (__VLS_ctx.newScore),
    min: (0),
    max: (100),
}));
const __VLS_161 = __VLS_160({
    modelValue: (__VLS_ctx.newScore),
    min: (0),
    max: (100),
}, ...__VLS_functionalComponentArgsRest(__VLS_160));
// @ts-ignore
[newScore,];
var __VLS_156;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "note-text" },
});
/** @type {__VLS_StyleScopedClasses['note-text']} */ ;
// @ts-ignore
[];
var __VLS_139;
{
    const { footer: __VLS_164 } = __VLS_133.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "dialog-footer" },
    });
    /** @type {__VLS_StyleScopedClasses['dialog-footer']} */ ;
    let __VLS_165;
    /** @ts-ignore @type {typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components.elButton | typeof __VLS_components.ElButton} */
    elButton;
    // @ts-ignore
    const __VLS_166 = __VLS_asFunctionalComponent1(__VLS_165, new __VLS_165({
        ...{ 'onClick': {} },
    }));
    const __VLS_167 = __VLS_166({
        ...{ 'onClick': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_166));
    let __VLS_170;
    const __VLS_171 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.dialogVisible = false;
                // @ts-ignore
                [dialogVisible,];
            } });
    const { default: __VLS_172 } = __VLS_168.slots;
    // @ts-ignore
    [];
    var __VLS_168;
    var __VLS_169;
    let __VLS_173;
    /** @ts-ignore @type {typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components.elButton | typeof __VLS_components.ElButton} */
    elButton;
    // @ts-ignore
    const __VLS_174 = __VLS_asFunctionalComponent1(__VLS_173, new __VLS_173({
        ...{ 'onClick': {} },
        type: "primary",
        loading: (__VLS_ctx.submitLoading),
    }));
    const __VLS_175 = __VLS_174({
        ...{ 'onClick': {} },
        type: "primary",
        loading: (__VLS_ctx.submitLoading),
    }, ...__VLS_functionalComponentArgsRest(__VLS_174));
    let __VLS_178;
    const __VLS_179 = ({ click: {} },
        { onClick: (__VLS_ctx.submitScoreChange) });
    const { default: __VLS_180 } = __VLS_176.slots;
    // @ts-ignore
    [submitLoading, submitScoreChange,];
    var __VLS_176;
    var __VLS_177;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_133;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=UserPanel.vue.js.map