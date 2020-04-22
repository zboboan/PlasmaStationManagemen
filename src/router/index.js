import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import ChildDir from '@/layout/childDirectory.vue'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  { 
    path: '/401',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'dashboard',
        meta: { title: 'dashboard', icon:'&#xe698;' , affix: true }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */

export const asyncRoutes = [
  {
    // 当案管理
    path: '/fileOperation',
    name:'fileOper',
    component: Layout,
    meta: {title: 'fileOper',icon: '&#xe6a4;'},
  },
  {
    // 血液检查
    path: 'bloodTests',
    name: 'bloodTests',
    component: ChildDir,
    meta: { title: 'bloodTests'},
  },
  {
    // 登记管理
    path: '/registration',
    name:'registration',
    component: Layout,
    meta: {title: 'registration',icon: '&#xe6a6;'},
  },
  {
    // 指标检查
    path: '/indexedRecord',
    name:'indexedRecord',
    component: Layout,
    meta: {title: 'indexedRecord',icon: '&#xe6a7;'},
  },
  {
    // 健康检查
    path: 'health',
    name: 'health',
    component: ChildDir,
    meta: { title: 'health' },
  },
  {
    // 拒绝信息发布 
    path: 'refuseInfo',
    name: 'refuseInfo',
    component:ChildDir,
    meta: { title: 'refuseInfo'},
  },
  {
    // 样本交接
    path: 'sampleHandover',
    name: 'sampleHandover',
    component: ChildDir,
    meta: { title: 'sampleHandover'},
  },
  {
    // 血浆管理
    path: '/plasmaManagement',
    name:'plasmaManagement',
    component: Layout,
    meta: {title: 'plasmaManagement',icon: '&#xe6a8;'},
  },
  {
    // 血浆入库 
    path: 'plasmaStorage',
    name: 'plasmaStorage',
    component:ChildDir,
    meta: { title: 'plasmaStorage'},
  },
  {
    // 免疫管理
    path: '/immuneManagement',
    name:'immuneManagement',
    component: Layout,
    meta: {title: 'immuneManagement',icon: '&#xe6a9;'},
  },
  {
    // 不良反应
    path: '/adverseReactions',
    name:'adverseReactions',
    component: Layout,
    meta: {title: 'adverseReactions',icon: '&#xe6aa;'},
  },
  {
    // 费用管理
    path: '/moneyManagement',
    name:'moneyManagement',
    component: Layout,
    meta: {title: 'moneyManagement',icon: '&#xe6ab;'},
  },
  {
    // 礼品管理
    path: '/giftManagement',
    name:'giftManagement',
    component: Layout,
    meta: {title: 'giftManagement',icon: '&#xe6ac;'},
  },
  {
    // 回访管理
    path: '/reviewManagement',
    name:'reviewManagement',
    component: Layout,
    meta: {title: 'reviewManagement',icon: '&#xe6ad;'},
  },
  {
    // 物资管理
    path: '/suppliesManagement',
    name:'suppliesManagement',
    component: Layout,
    meta: {title: 'suppliesManagement',icon: '&#xe6b3;'},
  },
  {
    // 基础设置 
    path: 'infrastructure',
    name: 'infrastructure',
    component:ChildDir,
    meta: { title: 'infrastructure'},
  },
  {
    // 物料管理 
    path: 'materialManag',
    name: 'materialManag',
    component: ChildDir,
    meta: { title: 'materialManag'},
  },
  {
    // 质控管理
    path: '/qualityManagement',
    name:'qualityManagement',
    component: Layout,
    meta: {title: 'qualityManagement',icon: '&#xe6ae;'},
  },
  {
    // 仪器检验
    path: '/instrumentTest',
    name:'instrumentTest',
    component: Layout,
    meta: {title: 'instrumentTest',icon: '&#xe6b0;'},
  },
  {
    // 设备管理
    path: '/equipmentManagement',
    name:'equipmentManagement',
    component: Layout,
    meta: {title: 'equipmentManagement',icon: '&#xe6b1;'},
  },
  {
    // 综合查询
    path: '/integratedQuery',
    name:'integratedQuery',
    component: Layout,
    meta: {title: 'integratedQuery',icon: '&#xe6b2;'},
  },
  {
    // 系统管理
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'permission',
    meta: {title: 'permission',icon: '&#xe695;'},
  },



  {
    // 档案管理/包括微信绑定
    path: 'fileOperWeixi',
    name: 'fileOperWeixi',
    component: () => import('@/views/fileOperWeixi/fileOperWeixi'),
    meta: { title: 'fileOperWeixi' }
  },
  {
    // 发布管理
    path: 'releaseOperation',
    name: 'releaseOperation',
    component: () => import('@/views/releaseOperation/releaseOperation'),
    meta: { title: 'releaseOperation'}
  },
  {
    //证照管理 
    path: 'licenceOperation',
    name: 'licenceOperation',
    component: () => import('@/views/licenceOperation/licenceOperation'),
    meta: { title: 'licenceOperation'}
  },
  {
    // 招募人管理
    path: 'recruitmentOperation',
    name: 'recruitmentOperation',
    component: () => import('@/views/recruitmentOperation/recruitmentOperation'),
    meta: { title: 'recruitmentOperation'}
  },
  {
    // 进站登记
    path: 'addArrivals',
    name: 'addArrivals',
    component: () => import('@/views/addArrivals/addArrivals'),
    meta: { title: 'addArrivals' }
  },
  {
    // 包车管理
    path: 'chartered',
    name: 'chartered',
    component: () => import('@/views/chartered/chartered'),
    meta: { title: 'chartered'}
  },

  {
    // 健康征询
    path: 'consultation',
    name: 'consultation',
    component: () => import('@/views/consultation/consultation'),
    meta: { title: 'consultation'}
  },
  {
    // 体格检查
    path: 'physical',
    name: 'physical',
    component: () => import('@/views/physical/physical'),
    meta: { title: 'physical'}
  },
  {
    // X光胸片
    path: 'Xlight',
    name: 'Xlight',
    component: () => import('@/views/Xlight/Xlight'),
    meta: { title: 'Xlight'}
  },
  {
    // 心电图
    path: 'ecg',
    name: 'ecg',
    component: () => import('@/views/ecg/ecg'),
    meta: { title: 'ecg'}
  },
  {
    // 无创血红蛋白
    path: 'noninvasive',
    name: 'noninvasive',
    component: () => import('@/views/noninvasive/noninvasive'),
    meta: { title: 'noninvasive'}
  },
  {
    // 样本采集
    path: 'collector',
    name: 'collector',
    component: () => import('@/views/collector/collector'),
    meta: { title: 'collector'}
  },
  {
    // 样本移交
    path: 'handOver',
    name: 'handOver',
    component: () => import('@/views/handOver/handOver'),
    meta: { title: 'handOver'}
  },
  {
    // 样本接收
    path: 'receive',
    name: 'receive',
    component: () => import('@/views/receive/receive'),
    meta: { title: 'receive'}
  },
  {
    // 样本登记
    path: 'registrat',
    name: 'registrat',
    component: () => import('@/views/registrat/registrat'),
    meta: { title: 'registrat'}
  },
  {
    // 浆站拒绝 
    path: 'plasmaRefused',
    name: 'plasmaRefused',
    component: () => import('@/views/plasmaRefused/plasmaRefused'),
    meta: { title: 'plasmaRefused'}
  },
  {
    // 检疫期阳性反馈 
    path: 'positiveFeed',
    name: 'positiveFeed',
    component: () => import('@/views/positiveFeed/positiveFeed'),
    meta: { title: 'positiveFeed'}
  },
  
  {
    // 血样检查 
    path: 'bloodCheck',
    name: 'bloodCheck',
    component: () => import('@/views/bloodCheck/bloodCheck'),
    meta: { title: 'bloodCheck'}
  },
  {
    // 浆样检查 
    path: 'plasmaCheck',
    name: 'plasmaCheck',
    component: () => import('@/views/plasmaCheck/plasmaCheck'),
    meta: { title: 'plasmaCheck'}
  },
  {
    // 称重 
    path: 'weighing',
    name: 'weighing',
    component: () => import('@/views/weighing/weighing'),
    meta: { title: 'weighing'}
  },
  {
    // 速冻 
    path: 'frozen',
    name: 'frozen',
    component: () => import('@/views/frozen/frozen'),
    meta: { title: 'frozen'}
  },
  {
    // 装箱 
    path: 'packing',
    name: 'packing',
    component: () => import('@/views/packing/packing'),
    meta: { title: 'packing'}
  },
  {
    // 生物识别/共性模块 
    path: 'biometric',
    name: 'biometric',
    component: () => import('@/views/biometric/biometric'),
    meta: { title: 'biometric'}
  },
  {
    // 血浆采集 
    path: 'plasmaCollect',
    name: 'plasmaCollect',
    component: () => import('@/views/plasmaCollect/plasmaCollect'),
    meta: { title: 'plasmaCollect'}
  },
  {
    // 血浆出库 
    path: 'plasmaOutbound',
    name: 'plasmaOutbound',
    component: () => import('@/views/plasmaOutbound/plasmaOutbound'),
    meta: { title: 'plasmaOutbound'}
  },
  {
    // 规则设置 
    path: 'rulesSet',
    name: 'rulesSet',
    component: () => import('@/views/rulesSet/rulesSet'),
    meta: { title: 'rulesSet'}
  },
  {
    // 免疫登记 
    path: 'immuneRegister',
    name: 'immuneRegister',
    component: () => import('@/views/immuneRegister/immuneRegister'),
    meta: { title: 'immuneRegister'}
  },
  {
    // 免疫注射   
    path: 'immunization',
    name: 'immunization',
    component: () => import('@/views/immunization/immunization'),
    meta: { title: 'immunization'}
  },
  {
    // 反馈/转类 
    path: 'feedback',
    name: 'feedback',
    component: () => import('@/views/feedback/feedback'),
    meta: { title: 'feedback'}
  },
  {
    // 血浆采集 
    path: 'plasmaCollection',
    name: 'plasmaCollection',
    component: () => import('@/views/plasmaCollection/plasmaCollection'),
    meta: { title: 'plasmaCollection'}
  },
  {
    // 免疫注射 
    path: 'immunization2',
    name: 'immunization2',
    component: () => import('@/views/immunization2/immunization2'),
    meta: { title: 'immunization2'}
  },
  {
    // 规则设置 
    path: 'rulesSetMoney',
    name: 'rulesSetMoney',
    component: () => import('@/views/rulesSetMoney/rulesSetMoney'),
    meta: { title: 'rulesSetMoney'}
  },
  {
    // 费用发放 
    path: 'feesPaid',
    name: 'feesPaid',
    component: () => import('@/views/feesPaid/feesPaid'),
    meta: { title: 'feesPaid'}
  },
  {
    // 特殊费用 
    path: 'specialFees',
    name: 'specialFees',
    component: () => import('@/views/specialFees/specialFees'),
    meta: { title: 'specialFees'}
  },
  {
    // 规则设置 
    path: 'rulesSetGift',
    name: 'rulesSetGift',
    component: () => import('@/views/rulesSetGift/rulesSetGift'),
    meta: { title: 'rulesSetGift'}
  },
  {
    // 礼品申请 
    path: 'giftFor',
    name: 'giftFor',
    component: () => import('@/views/giftFor/giftFor'),
    meta: { title: 'giftFor'}
  },
  {
    // 礼品发放 
    path: 'giftIssue',
    name: 'giftIssue',
    component: () => import('@/views/giftIssue/giftIssue'),
    meta: { title: 'giftIssue'}
  },
  {
    // 检疫期回访 
    path: 'quarantinePeriod',
    name: 'quarantinePeriod',
    component: () => import('@/views/quarantinePeriod/quarantinePeriod'),
    meta: { title: 'quarantinePeriod'}
  },
  {
    // 浆员回访 
    path: 'employeesReview',
    name: 'employeesReview',
    component: () => import('@/views/employeesReview/employeesReview'),
    meta: { title: 'employeesReview'}
  },
  {
    // 回访查询 
    path: 'reviewQuery',
    name: 'reviewQuery',
    component: () => import('@/views/reviewQuery/reviewQuery'),
    meta: { title: 'reviewQuery'}
  },
  {
    // 物料清单 
    path: 'bom',
    name: 'bom',
    component: () => import('@/views/bom/bom'),
    meta: { title: 'bom'}
  },

  {
    // 物料模板 
    path: 'materialTemplate',
    name: 'materialTemplate',
    component: () => import('@/views/materialTemplate/materialTemplate'),
    meta: { title: 'materialTemplate'}
  },
  {
    // 仓库管理 
    path: 'warehouseManag',
    name: 'warehouseManag',
    component: () => import('@/views/warehouseManag/warehouseManag'),
    meta: { title: 'warehouseManag'}
  },
  
  {
    // 单位管理 
    path: 'unit',
    name: 'unit',
    component: () => import('@/views/unit/unit'),
    meta: { title: 'unit'}
  },

  {
    // 物料分类 
    path: 'materialClass',
    name: 'materialClass',
    component: () => import('@/views/materialClass/materialClass'),
    meta: { title: 'materialClass'}
  },
  {
    // 预警管理 
    path: 'warning',
    name: 'warning',
    component: () => import('@/views/warning/warning'),
    meta: { title: 'warning'}
  },

  {
    // 供应商管理 
    path: 'supplier',
    name: 'supplier',
    component: () => import('@/views/supplier/supplier'),
    meta: { title: 'supplier'}
  },
  {
    // 生产商管理 
    path: 'manufacturer',
    name: 'manufacturer',
    component: () => import('@/views/manufacturer/manufacturer'),
    meta: { title: 'manufacturer'}
  },
  {
    // 库存初始化 
    path: 'inventoryInit',
    name: 'inventoryInit',
    component: () => import('@/views/inventoryInit/inventoryInit'),
    meta: { title: 'inventoryInit'}
  },
  {
    // 入库管理 
    path: 'warehouse',
    name: 'warehouse',
    component: () => import('@/views/warehouse/warehouse'),
    meta: { title: 'warehouse'}
  },
  {
    // 出库管理 
    path: 'outbound',
    name: 'outbound',
    component: () => import('@/views/outbound/outbound'),
    meta: { title: 'outbound'}
  },
  {
    // 自动出库 
    path: 'automatedOut',
    name: 'automatedOut',
    component: () => import('@/views/automatedOut/automatedOut'),
    meta: { title: 'automatedOut'}
  },
  {
    // 调拔管理 
    path: 'change',
    name: 'change',
    component: () => import('@/views/change/change'),
    meta: { title: 'change'}
  },
  {
    // 库存查询 
    path: 'inventoryQuery',
    name: 'inventoryQuery',
    component: () => import('@/views/inventoryQuery/inventoryQuery'),
    meta: { title: 'inventoryQuery'}
  },
  {
    // 盘点管理 
    path: 'points',
    name: 'points',
    component: () => import('@/views/points/points'),
    meta: { title: 'points'}
  },
  {
    // 样本 
    path: 'sample',
    name: 'sample',
    component: () => import('@/views/sample/sample'),
    meta: { title: 'sample'}
  },
  {
    // 血浆 
    path: 'plasma',
    name: 'plasma',
    component: () => import('@/views/plasma/plasma'),
    meta: { title: 'plasma'}
  },
  {
    // 物料 
    path: 'material',
    name: 'material',
    component: () => import('@/views/material/material'),
    meta: { title: 'material'}
  },
  {
    // 报废 
    path: 'scrap',
    name: 'scrap',
    component: () => import('@/views/scrap/scrap'),
    meta: { title: 'scrap'}
  },
  {
    // 酶标仪管理 
    path: 'enzymeLabeled',
    name: 'enzymeLabeled',
    component: () => import('@/views/enzymeLabeled/enzymeLabeled'),
    meta: { title: 'enzymeLabeled'}
  },
  {
    // 生化仪管理 
    path: 'biochemical',
    name: 'biochemical',
    component: () => import('@/views/biochemical/biochemical'),
    meta: { title: 'biochemical'}
  },
  {
    // 设备登记 
    path: 'registrationEqu',
    name: 'registrationEqu',
    component: () => import('@/views/registrationEqu/registrationEqu'),
    meta: { title: 'registrationEqu'}
  },
  {
    // 设备查询 
    path: 'queryEqu',
    name: 'queryEqu',
    component: () => import('@/views/queryEqu/queryEqu'),
    meta: { title: 'queryEqu'}
  },
  {
    // 巡检登记 
    path: 'inspectionReg',
    name: 'inspectionReg',
    component: () => import('@/views/inspectionReg/inspectionReg'),
    meta: { title: 'inspectionReg'}
  },
  {
    // 报表设置 
    path: 'reportSet',
    name: 'reportSet',
    component: () => import('@/views/reportSet/reportSet'),
    meta: { title: 'reportSet'}
  },
  {
    // 查询 
    path: 'queryInt',
    name: 'queryInt',
    component: () => import('@/views/queryInt/queryInt'),
    meta: { title: 'queryInt'}
  },
  {
    // 用户管理
    path: 'user',
    component: () => import('@/views/user/user'),
    name: 'user',
    meta: {title: 'user'}
  },
  {
    // 部门管理
    path: 'department',
    component: () => import('@/views/department/department'),
    name: 'department',
    meta: {title: 'department'}
  },
  {
    // 职务管理
    path: 'position',
    component: () => import('@/views/position/'),
    name: 'position',
    meta: {title: 'position'}
  },
  {
    // 角色管理
    path: 'role',
    component: () => import('@/views/role/role'),
    name: 'role',
    meta: {title: 'role'}
  },
  {
    // 权限管理
    path: 'permissions',
    component: () => import('@/views/permissions/permissions'),
    name: 'permissions',
    meta: {title: 'permissions'}
  },
  {
    // 业务参数设置
    path: 'parameterSetting',
    component: () => import('@/views/parameterSetting/parameterSetting'),
    name: 'parameterSetting',
    meta: {title: 'parameterSetting'}
  },
  {
    // 日志管理
    path: 'log',
    component: () => import('@/views/log/log'),
    name: 'log',
    meta: {title: 'log'}
  },
  {
    // 数据字典
    path: 'dictionary',
    component: () => import('@/views/dictionary/dictionary'),
    name: 'dictionary',
    meta: {title: 'dictionary'}
  },
  {
    // 凭证管理
    path: 'credentials',
    component: () => import('@/views/credentials/credentials'),
    name: 'credentials',
    meta: {title: 'credentials'}
  },
  {
    // 菜单管理
    path: 'menu',
    component: () => import('@/views/menu/menu'),
    name: 'menu',
    meta: {title: 'menu'}
  },
  {
    // 排队叫号配置
    path: 'queued',
    component: () => import('@/views/queued/queued'),
    name: 'queued',
    meta: {title: 'queued'}
  },
  {
    // 系统设置
    path: 'systemSettings',
    component: () => import('@/views/systemSettings/systemSettings'),
    name: 'systemSettings',
    meta: {title: 'systemSettings'}
  },
]



const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
