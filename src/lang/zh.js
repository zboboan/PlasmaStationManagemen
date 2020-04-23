export default {
  route: {
    dashboard: '首页',

    fileOper:'档案管理',
    fileOperWeixi:'档案管理/包括微信绑定',
    releaseOperation:'发布管理',
    licenceOperation:'证照管理',
    recruitmentOperation:'招募人管理',
    
    registration:'登记管理',
    addArrivals:'进站登记',
    chartered:'包车管理',

    indexedRecord:'指标检查',
    health:'健康检查',
    consultation:'健康征询',
    physical:'体格检查',
    Xlight:'X光胸片',
    ecg:'心电图',
    noninvasive:'无创血红蛋白',
    collector:'样本采集',
    sampleHandover:'样本交接',
    handOver:'样本移交',
    receive:'样本接收',
    registrat:'样本登记',
    bloodTests:'血液检查',
    refuseInfo:'拒绝信息发布',
    bloodCheck:'血样检查',
    plasmaCheck:'浆样检查',
    plasmaRefused:'浆站拒绝',
    positiveFeed:'检疫期阳性反馈',

    plasmaManagement:'血浆管理',
    biometric:'生物识别/共性模块',
    plasmaCollect:'血浆采集',
    plasmaStorage:'血浆入库',
    weighing:'称重',
    frozen:'速冻',
    packing:'装箱',
    plasmaOutbound:'血浆出库',

    immuneManagement:'免疫管理',
    rulesSet:'规则设置',
    immuneRegister:'免疫登记',
    immunization:'免疫注射',
    feedback:'反馈/转类',

    adverseReactions:'不良反应',
    plasmaCollection:'血浆采集',
    immunization2:'免疫注射',

    moneyManagement:'费用管理',
    rulesSetMoney:'规则设置',
    feesPaid:'费用发放',
    specialFees:'特殊费用',

    giftManagement:'礼品管理',
    rulesSetGift:'规则设置',
    giftFor:'礼品申请',
    giftIssue:'礼品发放',

    reviewManagement:'回访管理',
    quarantinePeriod:'检疫期回访',
    employeesReview:'浆员回访',
    reviewQuery:'回访查询',

    suppliesManagement:'物资管理',
    warehouse:'入库管理',
    outbound:'出库管理',
    automatedOut:'自动出库',
    change:'调拔管理',
    inventoryQuery:'库存查询',
    points:'盘点管理',
    infrastructure:'基础设置',
    warehouseManag:'仓库管理',
    materialManag:'物料管理',
    bom:'物料清单',
    materialTemplate:'物料模板',
    unit:'单位管理',
    materialClass:'物料分类',
    warning:'预警管理',
    supplier:'供应商管理',
    manufacturer:'生产商管理',
    inventoryInit:'库存初始化',

    qualityManagement:'质控管理',
    sample:'样本',
    plasma:'血浆',
    material:'物料',
    scrap:'报废',

    instrumentTest:'仪器检验',
    enzymeLabeled:'酶标仪管理',
    biochemical:'生化仪管理',

    equipmentManagement:'设备管理',
    registrationEqu:'设备登记',
    queryEqu:'设备查询',
    inspectionReg:'巡检登记',

    integratedQuery:'综合查询',
    reportSet:'报表设置',
    queryInt:'查询',

    permission: '系统管理',
    role: '角色管理',
    user:'用户管理',
    department:'部门管理',
    position:'职务管理',
    permissions:'权限管理',
    parameterSetting:'业务参数设置',
    log:'日志管理',
    dictionary:'数据字典',
    credentials:'凭证管理',
    menu:'菜单管理',
    queued:'排队叫号配置',
    systemSettings:'系统设置',
  },
  navbar: {
    dashboard: '首页',
    github: '项目地址',
    logOut: '退出登录',
    profile: '个人中心',
    screenfull:'全屏',
    theme: '换肤',
    size: '布局大小',
    i18n: '中英文切换',
  },
  login: {
    title: '精英天成单采血浆站标准化业务管理系统',
    logIn: '登录',
    username: '账号',
    password: '密码',
  },
  role:{
    rolename:'角色名称',
    remakr:'描述',
    remakrJane:'描述',
    operations:'操作',
    menus:'菜单树',
    edit:'编辑角色',
    new:'新建角色',
  },
  documentation: {
    documentation: '文档',
    github: 'Github 地址'
  },
  permission: {
    addRole: '新增角色',
    editPermission: '编辑权限',
    roles: '你的权限',
    switchRoles: '切换权限',
    tips: '在某些情况下，不适合使用 v-permission。例如：Element-UI 的 el-tab 或 el-table-column 以及其它动态渲染 dom 的场景。你只能通过手动设置 v-if 来实现。',
    delete: '删除',
    confirm: '确定',
    cancel: '取消'
  },
  guide: {
    description: '引导页对于一些第一次进入项目的人很有用，你可以简单介绍下项目的功能。本 Demo 是基于',
    button: '打开引导'
  },
  components: {
    documentation: '文档',
    tinymceTips: '富文本是管理后台一个核心的功能，但同时又是一个有很多坑的地方。在选择富文本的过程中我也走了不少的弯路，市面上常见的富文本都基本用过了，最终权衡了一下选择了Tinymce。更详细的富文本比较和介绍见',
    dropzoneTips: '由于我司业务有特殊需求，而且要传七牛 所以没用第三方，选择了自己封装。代码非常的简单，具体代码你可以在这里看到 @/components/Dropzone',
    stickyTips: '当页面滚动到预设的位置会吸附在顶部',
    backToTopTips1: '页面滚动到指定位置会在右下角出现返回顶部按钮',
    backToTopTips2: '可自定义按钮的样式、show/hide、出现的高度、返回的位置 如需文字提示，可在外部使用Element的el-tooltip元素',
    imageUploadTips: '由于我在使用时它只有vue@1版本，而且和mockjs不兼容，所以自己改造了一下，如果大家要使用的话，优先还是使用官方版本。'
  },
  table: {
    dynamicTips1: '固定表头, 按照表头顺序排序',
    dynamicTips2: '不固定表头, 按照点击顺序排序',
    dragTips1: '默认顺序',
    dragTips2: '拖拽后顺序',
    title: '标题',
    importance: '重要性',
    type: '类型',
    remark: '点评',
    search: '搜索',
    add: '添加',
    export: '导出',
    reviewer: '审核人',
    id: '序号',
    date: '时间',
    author: '作者',
    readings: '阅读数',
    status: '状态',
    actions: '操作',
    edit: '编辑',
    publish: '发布',
    draft: '草稿',
    delete: '删除',
    cancel: '取 消',
    confirm: '确 定'
  },
  example: {
    warning: '创建和编辑页面是不能被 keep-alive 缓存的，因为keep-alive 的 include 目前不支持根据路由来缓存，所以目前都是基于 component name 来进行缓存的。如果你想类似的实现缓存效果，可以使用 localStorage 等浏览器缓存方案。或者不要使用 keep-alive 的 include，直接缓存所有页面。详情见'
  },
  errorLog: {
    tips: '请点击右上角bug小图标',
    description: '现在的管理后台基本都是spa的形式了，它增强了用户体验，但同时也会增加页面出问题的可能性，可能一个小小的疏忽就导致整个页面的死锁。好在 Vue 官网提供了一个方法来捕获处理异常，你可以在其中进行错误处理或者异常上报。',
    documentation: '文档介绍'
  },
  excel: {
    export: '导出',
    selectedExport: '导出已选择项',
    placeholder: '请输入文件名(默认excel-list)'
  },
  zip: {
    export: '导出',
    placeholder: '请输入文件名(默认file)'
  },
  pdf: {
    tips: '这里使用   window.print() 来实现下载pdf的功能'
  },
  theme: {
    change: '换肤',
    documentation: '换肤文档',
    tips: 'Tips: 它区别于 navbar 上的 theme-pick, 是两种不同的换肤方法，各自有不同的应用场景，具体请参考文档。'
  },
  tagsView: {
    refresh: '刷新',
    close: '关闭',
    closeOthers: '关闭其它',
    closeAll: '关闭所有'
  },
  settings: {
    title: '系统布局配置',
    theme: '主题色',
    tagsView: '开启 Tags-View',
    fixedHeader: '固定 Header',
    sidebarLogo: '侧边栏 Logo'
  },
  message:{
    err1:'请输入正确的用户名',
    err2:'密码不能少于6位',
    err3:'名称不能为空',
    err4:'角色名称只能为英文字符',
    err5:'菜单树必选',
    err6:'不能有特殊符号',
    err7:'部门必选',
    msg1:'您已经登出，您可以取消以停留在此页面，或再次登录',
    msg2:'确认注销',
    msg3:'验证失败，请重新登录',
    msg4:'服务器超时',
    msg5:'语言切换成功',
    msg6:'确认删除?',
    msg7:'删除成功!',
    msg8:'警告',
    msg9:'有子部门会连同子部门一同删除  确认删除?',
    msg10:'修改成功！',
    msg11:'添加成功！',
    
  },
  button:{
    cancel:'取消',
    ReLogin:'重新登录',
    confirm:'确认'
  }
}
