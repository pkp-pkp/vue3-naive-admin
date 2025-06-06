/* eslint-disable */
/* prettier-ignore */
// Generated by elegant-router
// Read more: https://github.com/soybeanjs/elegant-router

import type { GeneratedRoute } from '@elegant-router/types';

export const generatedRoutes: GeneratedRoute[] = [
  {
    name: '403',
    path: '/403',
    component: 'layout.blank$view.403',
    meta: {
      title: '403',
      i18nKey: 'route.403',
      constant: true,
      hideInMenu: true
    }
  },
  {
    name: '404',
    path: '/404',
    component: 'layout.blank$view.404',
    meta: {
      title: '404',
      i18nKey: 'route.404',
      constant: true,
      hideInMenu: true
    }
  },
  {
    name: '500',
    path: '/500',
    component: 'layout.blank$view.500',
    meta: {
      title: '500',
      i18nKey: 'route.500',
      constant: true,
      hideInMenu: true
    }
  },
  {
    name: 'about',
    path: '/about',
    component: 'layout.base$view.about',
    meta: {
      title: 'about',
      i18nKey: 'route.about',
      icon: 'fluent:book-information-24-regular',
      order: 10
    }
  },
  {
    name: 'home',
    path: '/home',
    component: 'layout.base$view.home',
    meta: {
      title: 'home',
      i18nKey: 'route.home',
      icon: 'mdi:monitor-dashboard',
      order: 1
    }
  },
  {
    name: 'iframe-page',
    path: '/iframe-page/:url',
    component: 'layout.base$view.iframe-page',
    props: true,
    meta: {
      title: 'iframe-page',
      i18nKey: 'route.iframe-page',
      constant: true,
      hideInMenu: true,
      keepAlive: true
    }
  },
  {
    name: 'login',
    path: '/login/:module(pwd-login|code-login|register|reset-pwd|bind-wechat)?',
    component: 'layout.blank$view.login',
    props: true,
    meta: {
      title: 'login',
      i18nKey: 'route.login',
      constant: true,
      hideInMenu: true
    }
  },
  {
    name: 'plugin',
    path: '/plugin',
    component: 'layout.base',
    meta: {
      title: '插件示例',
      i18nKey: 'route.plugin',
      order: 8,
      icon: 'clarity:plugin-line',
      constant: true
    },
    children: [
      {
        name: 'plugin_barcode',
        path: '/plugin/barcode',
        component: 'view.plugin_barcode',
        meta: {
          title: 'plugin_barcode',
          i18nKey: 'route.plugin_barcode',
          icon: 'ic:round-barcode'
        }
      },
      {
        name: 'plugin_charts',
        path: '/plugin/charts',
        meta: {
          title: 'plugin_charts',
          i18nKey: 'route.plugin_charts',
          icon: 'mdi:chart-areaspline'
        },
        children: [
          {
            name: 'plugin_charts_antv',
            path: '/plugin/charts/antv',
            component: 'view.plugin_charts_antv',
            meta: {
              title: 'plugin_charts_antv',
              i18nKey: 'route.plugin_charts_antv',
              icon: 'hugeicons:flow-square'
            }
          },
          {
            name: 'plugin_charts_echarts',
            path: '/plugin/charts/echarts',
            component: 'view.plugin_charts_echarts',
            meta: {
              title: 'plugin_charts_echarts',
              i18nKey: 'route.plugin_charts_echarts',
              icon: 'simple-icons:apacheecharts'
            }
          },
          {
            name: 'plugin_charts_vchart',
            path: '/plugin/charts/vchart',
            component: 'view.plugin_charts_vchart',
            meta: {
              title: 'plugin_charts_vchart',
              i18nKey: 'route.plugin_charts_vchart',
              localIcon: 'visactor'
            }
          }
        ]
      },
      {
        name: 'plugin_copy',
        path: '/plugin/copy',
        component: 'view.plugin_copy',
        meta: {
          title: 'plugin_copy',
          i18nKey: 'route.plugin_copy',
          icon: 'mdi:clipboard-outline'
        }
      },
      {
        name: 'plugin_editor',
        path: '/plugin/editor',
        meta: {
          title: 'plugin_editor',
          i18nKey: 'route.plugin_editor',
          icon: 'icon-park-outline:editor'
        },
        children: [
          {
            name: 'plugin_editor_markdown',
            path: '/plugin/editor/markdown',
            component: 'view.plugin_editor_markdown',
            meta: {
              title: 'plugin_editor_markdown',
              i18nKey: 'route.plugin_editor_markdown',
              icon: 'ri:markdown-line'
            }
          },
          {
            name: 'plugin_editor_quill',
            path: '/plugin/editor/quill',
            component: 'view.plugin_editor_quill',
            meta: {
              title: 'plugin_editor_quill',
              i18nKey: 'route.plugin_editor_quill',
              icon: 'mdi:file-document-edit-outline'
            }
          }
        ]
      },
      {
        name: 'plugin_excel',
        path: '/plugin/excel',
        component: 'view.plugin_excel',
        meta: {
          title: 'plugin_excel',
          i18nKey: 'route.plugin_excel',
          icon: 'ri:file-excel-2-line',
          keepAlive: true
        }
      },
      {
        name: 'plugin_gantt',
        path: '/plugin/gantt',
        meta: {
          title: 'plugin_gantt',
          i18nKey: 'route.plugin_gantt',
          icon: 'ant-design:bar-chart-outlined'
        },
        children: [
          {
            name: 'plugin_gantt_dhtmlx',
            path: '/plugin/gantt/dhtmlx',
            component: 'view.plugin_gantt_dhtmlx',
            meta: {
              title: 'plugin_gantt_dhtmlx',
              i18nKey: 'route.plugin_gantt_dhtmlx'
            }
          },
          {
            name: 'plugin_gantt_vtable',
            path: '/plugin/gantt/vtable',
            component: 'view.plugin_gantt_vtable',
            meta: {
              title: 'plugin_gantt_vtable',
              i18nKey: 'route.plugin_gantt_vtable',
              localIcon: 'visactor'
            }
          }
        ]
      },
      {
        name: 'plugin_icon',
        path: '/plugin/icon',
        component: 'view.plugin_icon',
        meta: {
          title: 'plugin_icon',
          i18nKey: 'route.plugin_icon',
          localIcon: 'custom-icon'
        }
      },
      {
        name: 'plugin_map',
        path: '/plugin/map',
        component: 'view.plugin_map',
        meta: {
          title: 'plugin_map',
          i18nKey: 'route.plugin_map',
          icon: 'mdi:map'
        }
      },
      {
        name: 'plugin_pdf',
        path: '/plugin/pdf',
        component: 'view.plugin_pdf',
        meta: {
          title: 'plugin_pdf',
          i18nKey: 'route.plugin_pdf',
          icon: 'uiw:file-pdf'
        }
      },
      {
        name: 'plugin_pinyin',
        path: '/plugin/pinyin',
        component: 'view.plugin_pinyin',
        meta: {
          title: 'plugin_pinyin',
          i18nKey: 'route.plugin_pinyin',
          icon: 'entypo-social:google-hangouts'
        }
      },
      {
        name: 'plugin_print',
        path: '/plugin/print',
        component: 'view.plugin_print',
        meta: {
          title: 'plugin_print',
          i18nKey: 'route.plugin_print',
          icon: 'mdi:printer'
        }
      },
      {
        name: 'plugin_swiper',
        path: '/plugin/swiper',
        component: 'view.plugin_swiper',
        meta: {
          title: 'plugin_swiper',
          i18nKey: 'route.plugin_swiper',
          icon: 'simple-icons:swiper'
        }
      },
      {
        name: 'plugin_tables',
        path: '/plugin/tables',
        meta: {
          title: 'plugin_tables',
          i18nKey: 'route.plugin_tables',
          icon: 'icon-park-outline:table'
        },
        children: [
          {
            name: 'plugin_tables_vtable',
            path: '/plugin/tables/vtable',
            component: 'view.plugin_tables_vtable',
            meta: {
              title: 'plugin_tables_vtable',
              i18nKey: 'route.plugin_tables_vtable',
              localIcon: 'visactor'
            }
          }
        ]
      },
      {
        name: 'plugin_typeit',
        path: '/plugin/typeit',
        component: 'view.plugin_typeit',
        meta: {
          title: 'plugin_typeit',
          i18nKey: 'route.plugin_typeit',
          icon: 'mdi:typewriter'
        }
      },
      {
        name: 'plugin_video',
        path: '/plugin/video',
        component: 'view.plugin_video',
        meta: {
          title: 'plugin_video',
          i18nKey: 'route.plugin_video',
          icon: 'mdi:video'
        }
      }
    ]
  },
  {
    name: 'system',
    path: '/system',
    component: 'layout.base',
    meta: {
      title: 'system',
      i18nKey: 'route.system',
      icon: 'ic:baseline-brightness-5'
    },
    children: [
      {
        name: 'system_dept',
        path: '/system/dept',
        component: 'view.system_dept',
        meta: {
          title: 'system_dept',
          i18nKey: 'route.system_dept',
          icon: 'mdi:office-building-cog-outline'
        }
      },
      {
        name: 'system_dict',
        path: '/system/dict',
        component: 'view.system_dict',
        meta: {
          title: 'system_dict',
          i18nKey: 'route.system_dict'
        }
      },
      {
        name: 'system_menu',
        path: '/system/menu',
        component: 'view.system_menu',
        meta: {
          title: 'system_menu',
          i18nKey: 'route.system_menu',
          icon: 'mdi:list-box-outline'
        }
      },
      {
        name: 'system_monitor',
        path: '/system/monitor',
        meta: {
          title: 'system_monitor',
          i18nKey: 'route.system_monitor'
        },
        children: [
          {
            name: 'system_monitor_cache',
            path: '/system/monitor/cache',
            component: 'view.system_monitor_cache',
            meta: {
              title: 'system_monitor_cache',
              i18nKey: 'route.system_monitor_cache'
            }
          },
          {
            name: 'system_monitor_captcha-log',
            path: '/system/monitor/captcha-log',
            component: 'view.system_monitor_captcha-log',
            meta: {
              title: 'system_monitor_captcha-log',
              i18nKey: 'route.system_monitor_captcha-log'
            }
          },
          {
            name: 'system_monitor_login-log',
            path: '/system/monitor/login-log',
            component: 'view.system_monitor_login-log',
            meta: {
              title: 'system_monitor_login-log',
              i18nKey: 'route.system_monitor_login-log'
            }
          },
          {
            name: 'system_monitor_online',
            path: '/system/monitor/online',
            component: 'view.system_monitor_online',
            meta: {
              title: 'system_monitor_online',
              i18nKey: 'route.system_monitor_online'
            }
          },
          {
            name: 'system_monitor_serve',
            path: '/system/monitor/serve',
            component: 'view.system_monitor_serve',
            meta: {
              title: 'system_monitor_serve',
              i18nKey: 'route.system_monitor_serve'
            }
          }
        ]
      },
      {
        name: 'system_notice',
        path: '/system/notice',
        component: 'view.system_notice',
        meta: {
          title: 'system_notice',
          i18nKey: 'route.system_notice'
        },
        children: [
          {
            name: 'system_notice_notice-operate',
            path: '/system/notice/notice-operate',
            component: 'view.system_notice_notice-operate',
            meta: {
              title: 'system_notice_notice-operate',
              i18nKey: 'route.system_notice_notice-operate'
            }
          }
        ]
      },
      {
        name: 'system_parameter',
        path: '/system/parameter',
        component: 'view.system_parameter',
        meta: {
          title: 'system_parameter',
          i18nKey: 'route.system_parameter'
        }
      },
      {
        name: 'system_role',
        path: '/system/role',
        component: 'view.system_role',
        meta: {
          title: 'system_role',
          i18nKey: 'route.system_role',
          icon: 'mdi:account-group-outline'
        }
      },
      {
        name: 'system_schedule',
        path: '/system/schedule',
        meta: {
          title: 'system_schedule',
          i18nKey: 'route.system_schedule'
        },
        children: [
          {
            name: 'system_schedule_task',
            path: '/system/schedule/task',
            component: 'view.system_schedule_task',
            meta: {
              title: 'system_schedule_task',
              i18nKey: 'route.system_schedule_task'
            }
          },
          {
            name: 'system_schedule_task-log',
            path: '/system/schedule/task-log',
            component: 'view.system_schedule_task-log',
            meta: {
              title: 'system_schedule_task-log',
              i18nKey: 'route.system_schedule_task-log'
            }
          }
        ]
      },
      {
        name: 'system_user',
        path: '/system/user',
        component: 'view.system_user',
        meta: {
          title: 'system_user',
          i18nKey: 'route.system_user',
          icon: 'mdi:account-cog-outline'
        }
      }
    ]
  },
  {
    name: 'tools',
    path: '/tools',
    component: 'layout.base',
    meta: {
      title: 'tools',
      i18nKey: 'route.tools'
    },
    children: [
      {
        name: 'tools_mail',
        path: '/tools/mail',
        component: 'view.tools_mail',
        meta: {
          title: 'tools_mail',
          i18nKey: 'route.tools_mail'
        }
      },
      {
        name: 'tools_sql',
        path: '/tools/sql',
        component: 'view.tools_sql',
        meta: {
          title: 'tools_sql',
          i18nKey: 'route.tools_sql'
        }
      },
      {
        name: 'tools_storage',
        path: '/tools/storage',
        meta: {
          title: 'tools_storage',
          i18nKey: 'route.tools_storage'
        },
        children: [
          {
            name: 'tools_storage_local',
            path: '/tools/storage/local',
            component: 'view.tools_storage_local',
            meta: {
              title: 'tools_storage_local',
              i18nKey: 'route.tools_storage_local'
            }
          },
          {
            name: 'tools_storage_oss',
            path: '/tools/storage/oss',
            component: 'view.tools_storage_oss',
            meta: {
              title: 'tools_storage_oss',
              i18nKey: 'route.tools_storage_oss'
            }
          }
        ]
      }
    ]
  },
  {
    name: 'user-center',
    path: '/user-center',
    component: 'layout.base$view.user-center',
    meta: {
      title: 'user-center',
      i18nKey: 'route.user-center'
    }
  }
];
