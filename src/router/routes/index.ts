import type { CustomRoute, ElegantConstRoute, ElegantRoute } from '@elegant-router/types';
import { generatedRoutes } from '../elegant/routes';
import { layouts, views } from '../elegant/imports';
import { transformElegantRoutesToVueRoutes } from '../elegant/transform';

/**
 * custom routes
 *
 * @link https://github.com/soybeanjs/elegant-router?tab=readme-ov-file#custom-route
 */
const customRoutes: CustomRoute[] = [
  {
    name: 'document',
    path: '/document',
    component: 'layout.base',
    meta: {
      title: 'document',
      i18nKey: 'route.document',
      order: 2,
      icon: 'mdi:file-document-multiple-outline'
    },
    children: [
      {
        name: 'document_nest-admin',
        path: '/document/nest-admin',
        component: 'view.iframe-page',
        props: {
          url: 'https://docs.mrzym.top/'
        },
        meta: {
          title: 'document_nest-admin',
          i18nKey: 'route.document_nest-admin',
          order: 0,
          localIcon: 'logo'
        }
      },
      {
        name: 'document_nest-admin-link',
        path: '/document/nest-admin-link',
        meta: {
          title: 'document_nest-admin-link',
          i18nKey: 'route.document_nest-admin-link',
          order: 1,
          localIcon: 'logo',
          href: 'https://docs.mrzym.top/'
        }
      },
      {
        name: 'document_naive',
        path: '/document/naive',
        component: 'view.iframe-page',
        props: {
          url: 'https://www.naiveui.com/zh-CN/os-theme/docs/introduction'
        },
        meta: {
          title: 'document_naive',
          i18nKey: 'route.document_naive',
          order: 6,
          icon: 'logos:naiveui'
        }
      },
      {
        name: 'document_project-link',
        path: '/document/project-link',
        props: {
          url: 'https://docs.soybeanjs.cn/zh'
        },
        meta: {
          title: 'document_project-link',
          i18nKey: 'route.document_project-link',
          order: 2,
          localIcon: 'old-logo',
          href: 'https://docs.soybeanjs.cn/zh'
        }
      },
      {
        name: 'document_unocss',
        path: '/document/unocss',
        component: 'view.iframe-page',
        props: {
          url: 'https://unocss.dev/'
        },
        meta: {
          title: 'document_unocss',
          i18nKey: 'route.document_unocss',
          order: 5,
          icon: 'logos:unocss'
        }
      },
      {
        name: 'document_vite',
        path: '/document/vite',
        component: 'view.iframe-page',
        props: {
          url: 'https://cn.vitejs.dev/'
        },
        meta: {
          title: 'document_vite',
          i18nKey: 'route.document_vite',
          order: 4,
          icon: 'logos:vitejs'
        }
      },
      {
        name: 'document_vue',
        path: '/document/vue',
        component: 'view.iframe-page',
        props: {
          url: 'https://cn.vuejs.org/'
        },
        meta: {
          title: 'document_vue',
          i18nKey: 'route.document_vue',
          order: 3,
          icon: 'logos:vue'
        }
      }
    ]
  },
  // How to add Custom route https://github.com/soybeanjs/elegant-router?tab=readme-ov-file#custom-route
  // You can search ElegantVueRouter globally
  // 我只是为了练习一下，所以才加的这个路由 其实我只需要添加这个路由的国际化key就好了，目前我是存在了数据库里面的
  // 不需要的话可以删掉
  {
    name: 'blog',
    path: '/blog',
    meta: {
      title: 'blog',
      i18nKey: 'route.blog',
      order: 3,
      icon: 'mdi:book-heart-outline',
      hideInMenu: true
    },
    component: 'layout.base',
    children: [
      {
        name: 'blog_zym',
        path: '/blog/zym',
        component: 'view.iframe-page',
        props: {
          url: 'http://mrzym.top/'
        },
        meta: {
          title: 'blog_zym',
          i18nKey: 'route.blog_zym',
          order: 1,
          icon: 'mdi:book-open-variant-outline'
        }
      },
      {
        name: 'blog_zym-href',
        path: '/blog/zym-href',
        meta: {
          title: 'blog_zym',
          i18nKey: 'route.blog_zym',
          order: 1,
          icon: 'mdi:book-open-page-variant-outline',
          href: 'http://mrzym.top/'
        }
      }
    ]
  }
];

/** create routes when the auth route mode is static */
export function createStaticRoutes() {
  const constantRoutes: ElegantRoute[] = [];

  const authRoutes: ElegantRoute[] = [];

  generatedRoutes.forEach(item => {
    if (item.meta?.constant) {
      constantRoutes.push(item);
    } else {
      authRoutes.push(item);
    }
  });
  constantRoutes.push(...customRoutes);

  return {
    constantRoutes,
    authRoutes
  };
}

/**
 * Get auth vue routes
 *
 * @param routes Elegant routes
 */
export function getAuthVueRoutes(routes: ElegantConstRoute[]) {
  return transformElegantRoutesToVueRoutes(routes, layouts, views);
}
