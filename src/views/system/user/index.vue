<script setup lang="tsx">
import { NAvatar, NButton, NPopconfirm, NTag, NTime } from 'naive-ui';
import { onMounted, ref } from 'vue';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { fetchDeleteUser, fetchGetAllRole, fetchGetUserList, fetchUpdatedUserStatus } from '@/service/api';
import { enableStatusRecord, userGenderRecord } from '@/constants/business';
import { $t, getLocale } from '@/locales';
import { useAuth } from '@/hooks/business/auth';
import { generatePrefix, getTableScrollX } from '@/utils/common';
import { useSearchForm } from '@/hooks/common/search-form';
import { StatusEnum } from '@/constants/enum';
import { useDetailDescriptions } from '@/hooks/common/detail-descriptions';
import UserOperateDrawer from './modules/user-operate-drawer.vue';
import DeptTree from './modules/dept-tree.vue';
import ResetPassword from './modules/reset-password.vue';

const appStore = useAppStore();
const { hasAuth } = useAuth();

const userSearchForm = useSearchForm<Api.SystemManage.UserSearchParams>(() => [
  {
    key: 'username',
    label: $t('page.manage.user.username'),
    type: 'Input',
    props: {
      placeholder: $t('common.pleaseEnter') + $t('page.manage.user.username')
    }
  },
  {
    key: 'nickName',
    label: $t('page.manage.user.nickName'),
    type: 'Input',
    props: {
      placeholder: $t('common.pleaseEnter') + $t('page.manage.user.nickName')
    }
  },
  {
    key: 'email',
    label: $t('page.manage.user.email'),
    type: 'Input',
    props: {
      placeholder: $t('common.pleaseEnter') + $t('page.manage.user.email')
    }
  },
  {
    key: 'status',
    label: $t('common.status'),
    type: 'Select',
    props: {
      placeholder: $t('common.pleaseSelect') + $t('common.status'),
      options: [
        {
          value: StatusEnum.ENABLE,
          label: $t('common.enable')
        },
        {
          value: StatusEnum.DISABLE,
          label: $t('common.disable')
        }
      ]
    }
  },
  {
    key: 'roleId',
    label: $t('page.manage.user.role'),
    type: 'Select',
    props: {
      placeholder: $t('common.pleaseSelect') + $t('page.manage.user.role'),
      options: [
        {
          value: '43df8dd8-a7ab-4fdc-82bf-c322f206d8e1',
          label: '测试'
        },
        {
          value: 'bf468315-8ceb-4e18-8fc7-bd9743c5a4c7',
          label: '管理员'
        }
      ]
    }
  }
]);

const detailColumns = useDetailDescriptions<Api.SystemManage.User>(() => [
  {
    key: 'avatar',
    label: $t('page.manage.user.avatar'),
    span: 2,
    render: row => {
      if (row.avatar === null) {
        return null;
      }

      return <NAvatar src={row.avatar as string} size={64}></NAvatar>;
    }
  },
  {
    key: 'dept',
    label: $t('page.manage.user.dept'),
    render: row => {
      if (row.dept === null) {
        return null;
      }
      return <NTag>{row.dept.name}</NTag>;
    }
  },
  {
    key: 'roles',
    label: $t('page.manage.user.role'),
    render: row => {
      if (row.roles.length === 0) return null;
      const roleMap: Record<any, NaiveUI.ThemeColor> = {
        superadmin: 'primary',
        admin: 'success'
      };

      return row.roles.map((role: { value: string | number; name: any }) => (
        <NTag class={'mr-8px'} type={roleMap[role.value] || 'info'}>
          {role.name}
        </NTag>
      ));
    }
  },
  {
    key: 'username',
    label: $t('page.manage.user.username')
  },
  {
    key: 'nickName',
    label: $t('page.manage.user.nickName')
  },
  {
    key: 'gender',
    label: $t('page.manage.user.userGender'),
    render: row => {
      if (row.gender === null) {
        return null;
      }

      const tagMap: Record<Api.SystemManage.UserGender, NaiveUI.ThemeColor> = {
        1: 'primary',
        0: 'error'
      };

      const label = $t(userGenderRecord[row.gender]);

      return <NTag type={tagMap[row.gender]}>{label}</NTag>;
    }
  },
  {
    key: 'email',
    label: $t('page.manage.user.email')
  },

  {
    key: 'phone',
    label: $t('page.manage.user.phone')
  },

  {
    key: 'address',
    label: $t('page.manage.user.address')
  },
  {
    key: 'birthDate',
    label: $t('page.manage.user.birthDate'),
    render: row => {
      if (!row.birthDate) {
        return null;
      }
      return <NTime time={new Date(row.birthDate)} format="yyyy-MM-dd" />;
    }
  },
  {
    key: 'status',
    label: $t('common.status'),
    render: row => {
      return (
        <NTag type={row.status === StatusEnum.ENABLE ? 'success' : 'error'}>
          {row.status === StatusEnum.ENABLE ? $t('common.enable') : $t('common.disable')}
        </NTag>
      );
    }
  },
  {
    key: 'signature',
    label: $t('page.manage.user.signature'),
    span: 2
  },
  {
    key: 'introduction',
    label: $t('page.manage.user.introduction'),
    span: 2
  }
]);

const showModal = ref<boolean>(false);
const resetId = ref<number | null>(null);

const { columns, columnChecks, data, loading, pagination, getDataByPage, getData, searchParams, resetSearchParams } =
  useTable({
    apiFn: fetchGetUserList,
    showTotal: true,
    apiParams: {
      currentPage: 1,
      pageSize: 10,
      // if you want to use the searchParams in Form, you need to define the following properties, and the value is null
      // the value can not be undefined, otherwise the property in Form will not be reactive
      status: null,
      username: null,
      gender: null,
      nickName: null,
      phone: null,
      email: null,
      deptIds: null,
      roleId: null
    },
    columns: () => [
      {
        fixed: 'left',
        type: 'selection',
        align: 'center',
        width: 48
      },
      {
        fixed: 'left',
        key: 'username',
        title: $t('page.manage.user.username'),
        align: 'center',
        width: 100,
        ellipsis: {
          tooltip: true
        },
        render: row => {
          return (
            <span class={'detail-link'} onClick={() => detail(row.id)}>
              {row.username}
            </span>
          );
        }
      },
      {
        key: 'avatar',
        title: $t('page.manage.user.avatar'), // $t('page.manage.user.userGender'),
        align: 'center',
        width: 60,
        render: row => {
          if (row.avatar === null) {
            return null;
          }

          return <NAvatar src={row.avatar as string} round size="medium"></NAvatar>;
        }
      },
      {
        key: 'nickName',
        title: $t('page.manage.user.nickName'),
        align: 'center',
        width: 100,
        ellipsis: {
          tooltip: true
        }
      },
      {
        key: 'dept',
        title: $t('page.manage.user.dept'),
        align: 'center',
        width: 120,
        render: row => {
          if (row.dept === null) return null;
          return <NTag>{row.dept.name}</NTag>;
        }
      },
      {
        key: 'roles',
        title: $t('page.manage.user.role'),
        align: 'left',
        width: 160,
        render: row => {
          if (row.roles.length === 0) return null;
          const roleMap: Record<any, NaiveUI.ThemeColor> = {
            superadmin: 'primary',
            admin: 'success'
          };
          return row.roles.map(role => (
            <NTag class={'mr-8px'} type={roleMap[role.value] || ''}>
              {role.name}
            </NTag>
          ));
        }
      },
      {
        key: 'gender',
        title: $t('page.manage.user.userGender'),
        align: 'center',
        width: 80,
        render: row => {
          if (row.gender === null || !row.gender) {
            return null;
          }

          const tagMap: Record<Api.SystemManage.UserGender, NaiveUI.ThemeColor> = {
            1: 'primary',
            0: 'error'
          };

          const label = $t(userGenderRecord[row.gender]);

          return <NTag type={tagMap[row.gender]}>{label}</NTag>;
        }
      },
      {
        key: 'status',
        title: $t('common.status'),
        align: 'center',
        width: 100,
        render: row => {
          if (row.status === null) {
            return null;
          }

          const tagMap: Record<Api.Common.EnableStatus, NaiveUI.ThemeColor> = {
            1: 'success',
            0: 'error'
          };
          const label = $t(enableStatusRecord[row.status]);
          return <NTag type={tagMap[row.status]}>{label}</NTag>;
        }
      },
      {
        key: 'operate',
        title: $t('common.operate'),
        align: 'center',
        width: getLocale.value === 'zh-CN' ? 240 : 300,
        render: row => (
          <div class="flex-center gap-8px">
            <NButton
              disabled={!hasAuth('system:user:update')}
              type="primary"
              ghost
              size="small"
              onClick={() => edit(row.id)}
            >
              {$t('common.edit')}
            </NButton>
            <NPopconfirm onPositiveClick={() => handleChangeStatus(row.id, row.status)}>
              {{
                default: () =>
                  $t(row.status ? 'page.manage.common.status.disable' : 'page.manage.common.status.enable'),
                trigger: () => (
                  <NButton
                    disabled={!hasAuth('system:user:update')}
                    type={row.status ? 'error' : 'success'}
                    ghost
                    size="small"
                  >
                    {$t(row.status ? 'page.manage.common.status.disable' : 'page.manage.common.status.enable')}
                  </NButton>
                )
              }}
            </NPopconfirm>
            <NButton
              onClick={() => resetPasswordEvent(row.id)}
              disabled={!hasAuth('system:user:pass:reset')}
              type={'error'}
              ghost
              size="small"
            >
              {$t('page.manage.user.resetPassword')}
            </NButton>
            <NPopconfirm onPositiveClick={() => deleteUser(row.id)}>
              {{
                default: () => $t('common.confirmDelete'),
                trigger: () => (
                  <NButton disabled={!hasAuth('system:user:delete')} type={'error'} ghost size="small">
                    {$t('common.delete')}
                  </NButton>
                )
              }}
            </NPopconfirm>
          </div>
        )
      }
    ]
  });

const {
  drawerVisible,
  checkedRowKeys,
  operateType,
  editingData,
  handleAdd,
  handleEdit,
  modelVisible,
  detailData,
  handleDetail
} = useTableOperate(data, getData);

async function detail(id: number) {
  if (hasAuth('system:user:read')) {
    handleDetail(id);
  } else {
    window.$message?.error($t('common.noPermission'));
  }
}
function edit(id: number) {
  handleEdit(id);
}

async function deleteUser(id: number) {
  const { error } = await fetchDeleteUser(id);
  if (!error) {
    getDataByPage();
    window.$message?.success($t('common.deleteSuccess'));
  }
}

async function handleChangeStatus(id: number, status: number | null) {
  const { error } = await fetchUpdatedUserStatus({
    ids: [id],
    status: status ? 0 : 1
  });
  if (!error) {
    window.$message?.success($t('common.operateSuccess'));
  }
  // request
  getDataByPage();
}

async function resetPasswordEvent(id: number) {
  showModal.value = true;
  resetId.value = id;
}

async function handleBatchDChangeStatus() {
  const { error } = await fetchUpdatedUserStatus({
    ids: checkedRowKeys.value as number[],
    status: 0
  });
  if (!error) {
    window.$message?.success($t('common.operateSuccess'));
  }
  // request
  getDataByPage();
}

function change() {
  getDataByPage();
}

async function getAllRoles() {
  const { data: roleList, error } = await fetchGetAllRole();
  if (!error) {
    userSearchForm.value[4]!.props!.options = roleList.map(item => ({
      label: item.name,
      value: item.id
    }));
  }
}

function resetChange() {
  resetId.value = null;
}

onMounted(async () => {
  getAllRoles();
});
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <NCard :bordered="false" size="small" class="sm:flex-1-hidden card-wrapper">
      <NSplit v-if="!appStore.isMobile" class="h-full" direction="horizontal" :default-size="0.2" :max="0.9" :min="0.1">
        <template #1>
          <DeptTree v-model:value="searchParams.deptIds" @change="change" />
        </template>
        <template #2>
          <div class="h-full flex-col-stretch">
            <SearchForm
              v-model:model="searchParams"
              :fields="userSearchForm"
              @search="getDataByPage"
              @reset="resetSearchParams"
            />
            <TableHeaderOperation
              v-model:columns="columnChecks"
              prefix="system:user"
              :hide-delete="true"
              :disabled-delete="checkedRowKeys.length === 0"
              :loading="loading"
              @add="handleAdd"
              @refresh="getData"
            >
              <NPopconfirm
                v-if="hasAuth(generatePrefix('system:user', 'update'))"
                @positive-click="handleBatchDChangeStatus"
              >
                <template #trigger>
                  <NButton type="error" ghost size="small" :disabled="checkedRowKeys.length === 0">
                    {{ $t('common.batchDisable') }}
                  </NButton>
                </template>
                {{ `${$t('common.batchDisable')}?` }}
              </NPopconfirm>
            </TableHeaderOperation>
            <NDataTable
              v-model:checked-row-keys="checkedRowKeys"
              :columns="columns"
              :data="data"
              size="small"
              :flex-height="!appStore.isMobile"
              :loading="loading"
              :pagination="pagination"
              :scroll-x="getTableScrollX(columns)"
              remote
              :row-key="row => row.id"
              class="sm:h-full"
            />
          </div>
        </template>
      </NSplit>
      <div v-else class="h-full flex-col-stretch">
        <SearchForm
          v-model:model="searchParams"
          :fields="userSearchForm"
          @search="getDataByPage"
          @reset="resetSearchParams"
        />
        <TableHeaderOperation
          v-model:columns="columnChecks"
          prefix="system:user"
          :hide-delete="true"
          :disabled-delete="checkedRowKeys.length === 0"
          :loading="loading"
          @add="handleAdd"
          @refresh="getData"
        >
          <NPopconfirm
            v-if="hasAuth(generatePrefix('system:user', 'update'))"
            @positive-click="handleBatchDChangeStatus"
          >
            <template #trigger>
              <NButton type="error" ghost size="small" :disabled="checkedRowKeys.length === 0">
                {{ $t('common.batchDisable') }}
              </NButton>
            </template>
            {{ `${$t('common.batchDisable')}?` }}
          </NPopconfirm>
        </TableHeaderOperation>
        <NDataTable
          v-model:checked-row-keys="checkedRowKeys"
          :columns="columns"
          :data="data"
          size="small"
          :flex-height="!appStore.isMobile"
          :loading="loading"
          :pagination="pagination"
          :scroll-x="getTableScrollX(columns)"
          remote
          :row-key="row => row.id"
          class="sm:h-full"
        />
      </div>
      <UserOperateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getDataByPage"
      />
      <DetailsDescriptions
        v-model:visible="modelVisible"
        :title="$t('page.manage.user.detail')"
        width="60%"
        :fields="detailColumns"
        :label-style="{ width: '120px' }"
        :data="detailData"
      />

      <ResetPassword
        v-model:show="showModal"
        :reset-id="resetId"
        :title="$t('page.manage.user.resetPassword')"
        @change="resetChange"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
