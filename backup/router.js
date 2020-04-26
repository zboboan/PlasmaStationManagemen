import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

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
    path: '/fileOperation',
    name:'fileOper',
    component: Layout,
    meta: {title: 'fileOper',icon: '&#xe6a4;'},
    children: [
      {
        // 档案管理/包括微信绑定
        path: 'fileOperWeixi',
        name: 'fileOperWeixi',
        component: () => import('@/views/fileOperation/fileOperWeixi'),
        meta: { title: 'fileOperWeixi' }
      },
      {
        // 发布管理
        path: 'releaseOperation',
        name: 'releaseOperation',
        component: () => import('@/views/fileOperation/releaseOperation'),
        meta: { title: 'releaseOperation'}
      },
      {
        //证照管理 
        path: 'licenceOperation',
        name: 'licenceOperation',
        component: () => import('@/views/fileOperation/licenceOperation'),
        meta: { title: 'licenceOperation'}
      },
      {
        // 招募人管理
        path: 'recruitmentOperation',
        name: 'recruitmentOperation',
        component: () => import('@/views/fileOperation/recruitmentOperation'),
        meta: { title: 'recruitmentOperation'}
      },
    ]
  },
  {
    path: '/registration',
    name:'registration',
    component: Layout,
    meta: {title: 'registration',icon: '&#xe6a6;'},
    children: [
      // 进站登记
      {
        path: 'addArrivals',
        name: 'addArrivals',
        component: () => import('@/views/registration/addArrivals'),
        meta: { title: 'addArrivals' }
      },
      {
        // 包车管理
        path: 'chartered',
        name: 'chartered',
        component: () => import('@/views/registration/chartered'),
        meta: { title: 'chartered'}
      }
    ]
  },
  {
    path: '/indexedRecord',
    name:'indexedRecord',
    component: Layout,
    meta: {title: 'indexedRecord',icon: '&#xe6a7;'},
    children: [
      {
        // 健康检查
        path: 'health',
        name: 'health',
        component: () => import('@/views/indexedRecord/health/'),
        meta: { title: 'health' },
        children:[
          {
            // 健康征询
            path: 'consultation',
            name: 'consultation',
            component: () => import('@/views/indexedRecord/health/consultation'),
            meta: { title: 'consultation'}
          },
          {
            // 体格检查
            path: 'physical',
            name: 'physical',
            component: () => import('@/views/indexedRecord/health/physical'),
            meta: { title: 'physical'}
          },
          {
            // X光胸片
            path: 'Xlight',
            name: 'Xlight',
            component: () => import('@/views/indexedRecord/health/Xlight'),
            meta: { title: 'Xlight'}
          },
          {
            // 心电图
            path: 'ecg',
            name: 'ecg',
            component: () => import('@/views/indexedRecord/health/ecg'),
            meta: { title: 'ecg'}
          },
        ]
      },
      {
        // 无创血红蛋白
        path: 'noninvasive',
        name: 'noninvasive',
        component: () => import('@/views/indexedRecord/noninvasive'),
        meta: { title: 'noninvasive'}
      },
      {
        // 样本采集
        path: 'collector',
        name: 'collector',
        component: () => import('@/views/indexedRecord/collector'),
        meta: { title: 'collector'}
      },
      {
        // 样本交接
        path: 'sampleHandover',
        name: 'sampleHandover',
        component: () => import('@/views/indexedRecord/sampleHandover/'),
        meta: { title: 'sampleHandover'},
        children:[
          {
            // 样本移交
            path: 'handOver',
            name: 'handOver',
            component: () => import('@/views/indexedRecord/sampleHandover/handOver'),
            meta: { title: 'handOver'}
          },
          {
            // 样本接收
            path: 'receive',
            name: 'receive',
            component: () => import('@/views/indexedRecord/sampleHandover/receive'),
            meta: { title: 'receive'}
          },
          {
            // 样本登记
            path: 'registrat',
            name: 'registrat',
            component: () => import('@/views/indexedRecord/sampleHandover/registrat'),
            meta: { title: 'registrat'}
          },
        ]
      },
      {
        // 血液检查
        path: 'bloodTests',
        name: 'bloodTests',
        component: () => import('@/views/indexedRecord/bloodTests/'),
        meta: { title: 'bloodTests'},
        children:[
          {
            // 血样检查 
            path: 'bloodCheck',
            name: 'bloodCheck',
            component: () => import('@/views/indexedRecord/bloodTests/bloodCheck'),
            meta: { title: 'bloodCheck'}
          },
          {
            // 浆样检查 
            path: 'plasmaCheck',
            name: 'plasmaCheck',
            component: () => import('@/views/indexedRecord/bloodTests/plasmaCheck'),
            meta: { title: 'plasmaCheck'}
          }
        ]
      },
      {
        // 拒绝信息发布 
        path: 'refuseInfo',
        name: 'refuseInfo',
        component: () => import('@/views/indexedRecord/refuseInfo/'),
        meta: { title: 'refuseInfo'},
        children:[
          {
            // 浆站拒绝 
            path: 'plasmaRefused',
            name: 'plasmaRefused',
            component: () => import('@/views/indexedRecord/refuseInfo/plasmaRefused'),
            meta: { title: 'plasmaRefused'}
          },
          {
            // 检疫期阳性反馈 
            path: 'positiveFeed',
            name: 'positiveFeed',
            component: () => import('@/views/indexedRecord/refuseInfo/positiveFeed'),
            meta: { title: 'positiveFeed'}
          }
        ]
      }
    ]
  },
  {
    // 血浆管理
    path: '/plasmaManagement',
    name:'plasmaManagement',
    component: Layout,
    meta: {title: 'plasmaManagement',icon: '&#xe6a8;'},
    children:[
      {
        // 生物识别/共性模块 
        path: 'biometric',
        name: 'biometric',
        component: () => import('@/views/plasmaManagement/biometric'),
        meta: { title: 'biometric'}
      },
      {
        // 血浆采集 
        path: 'plasmaCollect',
        name: 'plasmaCollect',
        component: () => import('@/views/plasmaManagement/plasmaCollect'),
        meta: { title: 'plasmaCollect'}
      },
      {
        // 血浆入库 
        path: 'plasmaStorage',
        name: 'plasmaStorage',
        component: () => import('@/views/plasmaManagement/plasmaStorage'),
        meta: { title: 'plasmaStorage'},
        children:[
          {
            // 称重 
            path: 'weighing',
            name: 'weighing',
            component: () => import('@/views/plasmaManagement/plasmaStorage/weighing'),
            meta: { title: 'weighing'}
          },
          {
            // 速冻 
            path: 'frozen',
            name: 'frozen',
            component: () => import('@/views/plasmaManagement/plasmaStorage/frozen'),
            meta: { title: 'frozen'}
          },
          {
            // 装箱 
            path: 'packing',
            name: 'packing',
            component: () => import('@/views/plasmaManagement/plasmaStorage/packing'),
            meta: { title: 'packing'}
          }
        ]
      },
      {
        // 血浆出库 
        path: 'plasmaOutbound',
        name: 'plasmaOutbound',
        component: () => import('@/views/plasmaManagement/plasmaOutbound'),
        meta: { title: 'plasmaOutbound'}
      }
    ]
  },
  {
    // 免疫管理
    path: '/immuneManagement',
    name:'immuneManagement',
    component: Layout,
    meta: {title: 'immuneManagement',icon: '&#xe6a9;'},
    children:[
      {
        // 规则设置 
        path: 'rulesSet',
        name: 'rulesSet',
        component: () => import('@/views/immuneManagement/rulesSet'),
        meta: { title: 'rulesSet'}
      },
      {
        // 免疫登记 
        path: 'immuneRegister',
        name: 'immuneRegister',
        component: () => import('@/views/immuneManagement/immuneRegister'),
        meta: { title: 'immuneRegister'}
      },
      {
        // 免疫注射   
        path: 'immunization',
        name: 'immunization',
        component: () => import('@/views/immuneManagement/immunization'),
        meta: { title: 'immunization'}
      },
      {
        // 反馈/转类 
        path: 'feedback',
        name: 'feedback',
        component: () => import('@/views/immuneManagement/feedback'),
        meta: { title: 'feedback'}
      }
    ]
  },
  {
    // 不良反应
    path: '/adverseReactions',
    name:'adverseReactions',
    component: Layout,
    meta: {title: 'adverseReactions',icon: '&#xe6aa;'},
    children:[
      {
        // 血浆采集 
        path: 'plasmaCollection',
        name: 'plasmaCollection',
        component: () => import('@/views/adverseReactions/plasmaCollection'),
        meta: { title: 'plasmaCollection'}
      },
      {
        // 免疫注射 
        path: 'immunization2',
        name: 'immunization2',
        component: () => import('@/views/adverseReactions/immunization2'),
        meta: { title: 'immunization2'}
      },
    ]
  },
  {
    // 费用管理
    path: '/moneyManagement',
    name:'moneyManagement',
    component: Layout,
    meta: {title: 'moneyManagement',icon: '&#xe6ab;'},
    children:[
      {
        // 规则设置 
        path: 'rulesSetMoney',
        name: 'rulesSetMoney',
        component: () => import('@/views/moneyManagement/rulesSetMoney'),
        meta: { title: 'rulesSetMoney'}
      },
      {
        // 费用发放 
        path: 'feesPaid',
        name: 'feesPaid',
        component: () => import('@/views/moneyManagement/feesPaid'),
        meta: { title: 'feesPaid'}
      },
      {
        // 特殊费用 
        path: 'specialFees',
        name: 'specialFees',
        component: () => import('@/views/moneyManagement/specialFees'),
        meta: { title: 'specialFees'}
      },
    ]
  },
  {
    // 礼品管理
    path: '/giftManagement',
    name:'giftManagement',
    component: Layout,
    meta: {title: 'giftManagement',icon: '&#xe6ac;'},
    children:[
      {
        // 规则设置 
        path: 'rulesSetGift',
        name: 'rulesSetGift',
        component: () => import('@/views/giftManagement/rulesSetGift'),
        meta: { title: 'rulesSetGift'}
      },
      {
        // 礼品申请 
        path: 'giftFor',
        name: 'giftFor',
        component: () => import('@/views/giftManagement/giftFor'),
        meta: { title: 'giftFor'}
      },
      {
        // 礼品发放 
        path: 'giftIssue',
        name: 'giftIssue',
        component: () => import('@/views/giftManagement/giftIssue'),
        meta: { title: 'giftIssue'}
      },
    ]
  },
  {
    // 回访管理
    path: '/reviewManagement',
    name:'reviewManagement',
    component: Layout,
    meta: {title: 'reviewManagement',icon: '&#xe6ad;'},
    children:[
      {
        // 检疫期回访 
        path: 'quarantinePeriod',
        name: 'quarantinePeriod',
        component: () => import('@/views/reviewManagement/quarantinePeriod'),
        meta: { title: 'quarantinePeriod'}
      },
      {
        // 浆员回访 
        path: 'employeesReview',
        name: 'employeesReview',
        component: () => import('@/views/reviewManagement/employeesReview'),
        meta: { title: 'employeesReview'}
      },
      {
        // 回访查询 
        path: 'reviewQuery',
        name: 'reviewQuery',
        component: () => import('@/views/reviewManagement/reviewQuery'),
        meta: { title: 'reviewQuery'}
      },
    ]
  },
  {
    // 物资管理
    path: '/suppliesManagement',
    name:'suppliesManagement',
    component: Layout,
    meta: {title: 'suppliesManagement',icon: '&#xe6b3;'},
    children:[
      {
        // 入库管理 
        path: 'warehouse',
        name: 'warehouse',
        component: () => import('@/views/suppliesManagement/warehouse'),
        meta: { title: 'warehouse'}
      },
      {
        // 出库管理 
        path: 'outbound',
        name: 'outbound',
        component: () => import('@/views/suppliesManagement/outbound'),
        meta: { title: 'outbound'}
      },
      {
        // 自动出库 
        path: 'automatedOut',
        name: 'automatedOut',
        component: () => import('@/views/suppliesManagement/automatedOut'),
        meta: { title: 'automatedOut'}
      },
      {
        // 调拔管理 
        path: 'change',
        name: 'change',
        component: () => import('@/views/suppliesManagement/change'),
        meta: { title: 'change'}
      },
      {
        // 库存查询 
        path: 'inventoryQuery',
        name: 'inventoryQuery',
        component: () => import('@/views/suppliesManagement/inventoryQuery'),
        meta: { title: 'inventoryQuery'}
      },
      {
        // 盘点管理 
        path: 'points',
        name: 'points',
        component: () => import('@/views/suppliesManagement/points'),
        meta: { title: 'points'}
      },
      {
        // 基础设置 
        path: 'infrastructure',
        name: 'infrastructure',
        component: () => import('@/views/suppliesManagement/infrastructure'),
        meta: { title: 'infrastructure'},
        children:[
          {
            // 仓库管理 
            path: 'warehouseManag',
            name: 'warehouseManag',
            component: () => import('@/views/suppliesManagement/infrastructure/warehouseManag'),
            meta: { title: 'warehouseManag'}
          },
          {
            // 物料管理 
            path: 'materialManag',
            name: 'materialManag',
            component: () => import('@/views/suppliesManagement/infrastructure/materialManag'),
            meta: { title: 'materialManag'},
            children:[
              {
                // 物料清单 
                path: 'bom',
                name: 'bom',
                component: () => import('@/views/suppliesManagement/infrastructure/materialManag/bom'),
                meta: { title: 'bom'}
              },
              {
                // 物料模板 
                path: 'materialTemplate',
                name: 'materialTemplate',
                component: () => import('@/views/suppliesManagement/infrastructure/materialManag/materialTemplate'),
                meta: { title: 'materialTemplate'}
              },
            ]
          },
          {
            // 单位管理 
            path: 'unit',
            name: 'unit',
            component: () => import('@/views/suppliesManagement/infrastructure/unit'),
            meta: { title: 'unit'}
          },
          {
            // 物料分类 
            path: 'materialClass',
            name: 'materialClass',
            component: () => import('@/views/suppliesManagement/infrastructure/materialClass'),
            meta: { title: 'materialClass'}
          },
          {
            // 预警管理 
            path: 'warning',
            name: 'warning',
            component: () => import('@/views/suppliesManagement/infrastructure/warning'),
            meta: { title: 'warning'}
          },
          {
            // 供应商管理 
            path: 'supplier',
            name: 'supplier',
            component: () => import('@/views/suppliesManagement/infrastructure/supplier'),
            meta: { title: 'supplier'}
          },
          {
            // 生产商管理 
            path: 'manufacturer',
            name: 'manufacturer',
            component: () => import('@/views/suppliesManagement/infrastructure/manufacturer'),
            meta: { title: 'manufacturer'}
          },
          {
            // 库存初始化 
            path: 'inventoryInit',
            name: 'inventoryInit',
            component: () => import('@/views/suppliesManagement/infrastructure/inventoryInit'),
            meta: { title: 'inventoryInit'}
          },
        ]
      }
    ]
  },
  {
    // 质控管理
    path: '/qualityManagement',
    name:'qualityManagement',
    component: Layout,
    meta: {title: 'qualityManagement',icon: '&#xe6ae;'},
    children:[
      {
        // 样本 
        path: 'sample',
        name: 'sample',
        component: () => import('@/views/qualityManagement/sample'),
        meta: { title: 'sample'}
      },
      {
        // 血浆 
        path: 'plasma',
        name: 'plasma',
        component: () => import('@/views/qualityManagement/plasma'),
        meta: { title: 'plasma'}
      },
      {
        // 物料 
        path: 'material',
        name: 'material',
        component: () => import('@/views/qualityManagement/material'),
        meta: { title: 'material'}
      },
      {
        // 报废 
        path: 'scrap',
        name: 'scrap',
        component: () => import('@/views/qualityManagement/scrap'),
        meta: { title: 'scrap'}
      },
    ]
  },
  {
    // 仪器检验
    path: '/instrumentTest',
    name:'instrumentTest',
    component: Layout,
    meta: {title: 'instrumentTest',icon: '&#xe6b0;'},
    children:[
      {
        // 酶标仪管理 
        path: 'enzymeLabeled',
        name: 'enzymeLabeled',
        component: () => import('@/views/instrumentTest/enzymeLabeled'),
        meta: { title: 'enzymeLabeled'}
      },
      {
        // 生化仪管理 
        path: 'biochemical',
        name: 'biochemical',
        component: () => import('@/views/instrumentTest/biochemical'),
        meta: { title: 'biochemical'}
      },

    ]
  },
  {
    // 设备管理
    path: '/equipmentManagement',
    name:'equipmentManagement',
    component: Layout,
    meta: {title: 'equipmentManagement',icon: '&#xe6b1;'},
    children:[
      {
        // 设备登记 
        path: 'registrationEqu',
        name: 'registrationEqu',
        component: () => import('@/views/equipmentManagement/registrationEqu'),
        meta: { title: 'registrationEqu'}
      },
      {
        // 设备查询 
        path: 'queryEqu',
        name: 'queryEqu',
        component: () => import('@/views/equipmentManagement/queryEqu'),
        meta: { title: 'queryEqu'}
      },
      {
        // 巡检登记 
        path: 'inspectionReg',
        name: 'inspectionReg',
        component: () => import('@/views/equipmentManagement/inspectionReg'),
        meta: { title: 'inspectionReg'}
      },
    ]
  },
  {
    // 综合查询
    path: '/integratedQuery',
    name:'integratedQuery',
    component: Layout,
    meta: {title: 'integratedQuery',icon: '&#xe6b2;'},
    children:[
      {
        // 报表设置 
        path: 'reportSet',
        name: 'reportSet',
        component: () => import('@/views/integratedQuery/reportSet'),
        meta: { title: 'reportSet'}
      },
      {
        // 查询 
        path: 'queryInt',
        name: 'queryInt',
        component: () => import('@/views/integratedQuery/queryInt'),
        meta: { title: 'queryInt'}
      },
    ]
  },
  {
    // 系统管理
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'permission',
    meta: {title: 'permission',icon: '&#xe695;'},
    children: [
      {
        // 用户管理
        path: 'user',
        component: () => import('@/views/permission/user'),
        name: 'user',
        meta: {title: 'user'}
      },
      {
        // 部门管理
        path: 'department',
        component: () => import('@/views/permission/department'),
        name: 'department',
        meta: {title: 'department'}
      },
      {
        // 职务管理
        path: 'position',
        component: () => import('@/views/permission/position'),
        name: 'position',
        meta: {title: 'position'}
      },
      {
        // 角色管理
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'role',
        meta: {title: 'role'}
      },
      {
        // 权限管理
        path: 'permissions',
        component: () => import('@/views/permission/permissions'),
        name: 'permissions',
        meta: {title: 'permissions'}
      },
      {
        // 业务参数设置
        path: 'parameterSetting',
        component: () => import('@/views/permission/parameterSetting'),
        name: 'parameterSetting',
        meta: {title: 'parameterSetting'}
      },
      {
        // 日志管理
        path: 'log',
        component: () => import('@/views/permission/log'),
        name: 'log',
        meta: {title: 'log'}
      },
      {
        // 数据字典
        path: 'dictionary',
        component: () => import('@/views/permission/dictionary'),
        name: 'dictionary',
        meta: {title: 'dictionary'}
      },
      {
        // 凭证管理
        path: 'credentials',
        component: () => import('@/views/permission/credentials'),
        name: 'credentials',
        meta: {title: 'credentials'}
      },
      {
        // 菜单管理
        path: 'menu',
        component: () => import('@/views/permission/menu'),
        name: 'menu',
        meta: {title: 'menu'}
      },
      {
        // 排队叫号配置
        path: 'queued',
        component: () => import('@/views/permission/queued'),
        name: 'queued',
        meta: {title: 'queued'}
      },
      {
        // 系统设置
        path: 'systemSettings',
        component: () => import('@/views/permission/systemSettings'),
        name: 'systemSettings',
        meta: {title: 'systemSettings'}
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

export const asyncRoutes = []


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
