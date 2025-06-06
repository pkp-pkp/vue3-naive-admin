<script setup lang="tsx">
import { NButton, NImage, NPopconfirm, NTag, NTime } from 'naive-ui';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { fetchDeleteStorageLocal, fetchGetStorageLocalList } from '@/service/api';
import { $t } from '@/locales';
import { useAuth } from '@/hooks/business/auth';
import { useSearchForm } from '@/hooks/common/search-form';
import { getTableScrollX } from '@/utils/common';
import { useAppStore } from '@/store/modules/app';

const appStore = useAppStore();
const { hasAuth } = useAuth();

const storageLocalSearchForm = useSearchForm<Api.ToolsManage.StorageLocalSearchParams>(() => [
  {
    key: 'name',
    label: $t('page.tools.storage.fileName'),
    type: 'Input',
    props: {
      placeholder: $t('common.pleaseEnter') + $t('page.tools.storage.fileName')
    }
  },
  {
    key: 'username',
    label: $t('page.tools.storage.uploadBy'),
    type: 'Input',
    props: {
      placeholder: $t('common.pleaseEnter') + $t('page.tools.storage.uploadBy')
    }
  },
  {
    key: 'time',
    label: $t('page.tools.storage.uploadTime'),
    type: 'DatePicker',
    props: {
      type: 'daterange'
    }
  }
]);

const { columns, columnChecks, data, loading, pagination, getDataByPage, getData, searchParams, resetSearchParams } =
  useTable({
    apiFn: fetchGetStorageLocalList,
    showTotal: true,
    apiParams: {
      currentPage: 1,
      pageSize: 10,
      // if you want to use the searchParams in Form, you need to define the following properties, and the value is null
      // the value can not be undefined, otherwise the property in Form will not be reactive
      username: null,
      time: null,
      name: null
    },
    columns: () => [
      {
        fixed: 'left',
        type: 'selection',
        align: 'center',
        width: 48
      },
      {
        key: 'name',
        title: $t('page.tools.storage.fileName'),
        align: 'left',
        width: 200,
        ellipsis: {
          tooltip: true
        }
      },
      {
        key: 'extName',
        title: $t('page.tools.storage.fileExt'),
        align: 'center',
        width: 100
      },
      {
        key: 'type',
        title: $t('page.tools.storage.fileType'),
        align: 'center',
        width: 120,
        render: row => {
          if (row.type === null) return null;
          return <NTag>{row.type}</NTag>;
        }
      },
      {
        key: 'path',
        title: $t('page.tools.storage.preview'),
        align: 'center',
        width: 120,
        render: row => {
          if (row.type === 'image') return <NImage width={60} src={row.path} />;
          return <NTag>{row.name}</NTag>;
        }
      },
      {
        key: 'size',
        title: $t('page.tools.storage.size'),
        align: 'center',
        width: 100
      },
      {
        key: 'createdAt',
        title: $t('page.tools.storage.uploadTime'),
        align: 'center',
        width: 200,
        render: row => {
          if (!row.createdAt) return null;
          return <NTime time={new Date(row.createdAt)} />;
        }
      },
      {
        key: 'username',
        title: $t('page.tools.storage.uploadBy'),
        align: 'center',
        width: 200
      },
      {
        key: 'operate',
        title: $t('common.operate'),
        align: 'center',
        width: 130,
        render: row => (
          <div class="flex-center gap-8px">
            <NPopconfirm onPositiveClick={() => handleDelete(row.id)}>
              {{
                default: () => `${$t('common.delete')} - ${row.name} ？`,
                trigger: () => (
                  <NButton disabled={!hasAuth('tool:storage:delete')} type={'error'} ghost size="small">
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

const { checkedRowKeys, onBatchDeleted, onDeleted } = useTableOperate(data, getData);

async function handleDelete(id: number) {
  const { error } = await fetchDeleteStorageLocal([id]);
  if (!error) {
    onDeleted();
  }
}

async function batchDelete() {
  const { error } = await fetchDeleteStorageLocal(checkedRowKeys.value as number[]);
  if (!error) {
    onBatchDeleted();
  }
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <NCard :bordered="false" size="small" class="sm:flex-1-hidden card-wrapper">
      <template #header>
        <SearchForm
          v-model:model="searchParams"
          :fields="storageLocalSearchForm"
          @search="getDataByPage"
          @reset="resetSearchParams"
        />
        <TableHeaderOperation
          v-model:columns="columnChecks"
          prefix="system:online"
          :hide-add="true"
          :loading="loading"
          :disabled-delete="checkedRowKeys.length === 0"
          @delete="batchDelete"
          @refresh="getData"
        />
      </template>
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
    </NCard>
  </div>
</template>

<style scoped></style>
