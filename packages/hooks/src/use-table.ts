import { computed, reactive, ref } from 'vue';
import type { Ref } from 'vue';
import { jsonClone } from '@sa/utils';
import useBoolean from './use-boolean';
import useLoading from './use-loading';

export type MaybePromise<T> = T | Promise<T>;

export type ApiFn = (args: any) => Promise<unknown>;

export type TableColumnCheck = {
  key: string;
  title: string;
  checked: boolean;
  tree?: boolean;
};

export type TableDataWithIndex<T> = T & { index: number };

export type TransformedData<T> = {
  data: TableDataWithIndex<T>[];
  pageNum: number;
  pageSize: number;
  total: number;
};

export type Transformer<T, Response> = (response: Response) => TransformedData<T>;

export type TableConfig<A extends ApiFn, T, C> = {
  /** api function to get table data */
  apiFn: A;
  /** api params */
  apiParams?: Parameters<A>[0];
  /** transform api response to table data */
  transformer: Transformer<T, Awaited<ReturnType<A>>>;
  /** columns factory */
  columns: () => C[];
  /**
   * get column checks
   *
   * @param columns
   */
  getColumnChecks: (columns: C[]) => TableColumnCheck[];
  /**
   * get columns
   *
   * @param columns
   */
  getColumns: (columns: C[], checks: TableColumnCheck[]) => C[];
  /**
   * callback when response fetched
   *
   * @param transformed transformed data
   */
  onFetched?: (transformed: TransformedData<T>) => MaybePromise<void>;
  /**
   * whether to get data immediately
   *
   * @default true
   */
  immediate?: boolean;

  /**
   * whether to expandTree
   *
   * @default false
   */
  expandAll?: boolean;
};

export default function useHookTable<A extends ApiFn, T, C>(config: TableConfig<A, T, C>) {
  const { loading, startLoading, endLoading } = useLoading();
  const { bool: empty, setBool: setEmpty } = useBoolean();

  const { apiFn, apiParams, transformer, immediate = true, getColumnChecks, getColumns, expandAll } = config;

  const searchParams: NonNullable<Parameters<A>[0]> = reactive(jsonClone({ ...apiParams }));

  const allColumns = ref(config.columns()) as Ref<C[]>;

  const data: Ref<TableDataWithIndex<T>[]> = ref([]);

  const columnChecks: Ref<TableColumnCheck[]> = ref(getColumnChecks(config.columns()));

  const columns = computed(() => getColumns(allColumns.value, columnChecks.value));

  const expandedRowKeys = ref<Array<string | number>>([]);

  function flatTreeData(treeData: any[]) {
    return treeData.reduce((prev, cur) => {
      return prev.concat(cur, cur.children && cur.children.length ? flatTreeData(cur.children) : []);
    }, []);
  }

  function toggleExpand(val?: boolean) {
    if (val) {
      setExpand();
      return;
    }

    if (expandedRowKeys.value.length) {
      setFold();
      return;
    }

    setExpand();
  }

  function setExpand() {
    const treeData = flatTreeData(data.value);
    expandedRowKeys.value = [];
    for (const item of treeData) {
      if (item.children && item.children.length) {
        expandedRowKeys.value.push(item.id);
      }
    }
  }

  function setFold() {
    expandedRowKeys.value = [];
  }

  function reloadColumns() {
    allColumns.value = config.columns();

    const checkMap = new Map(columnChecks.value.map(col => [col.key, col.checked]));

    const defaultChecks = getColumnChecks(allColumns.value);

    columnChecks.value = defaultChecks.map(col => ({
      ...col,
      checked: checkMap.get(col.key) ?? col.checked
    }));
  }

  async function getData() {
    startLoading();

    const formattedParams = formatSearchParams(searchParams);

    const response = await apiFn(formattedParams);

    const transformed = transformer(response as Awaited<ReturnType<A>>);

    data.value = transformed.data;

    setEmpty(transformed.data.length === 0);

    await config.onFetched?.(transformed);

    endLoading();
    if (expandAll) toggleExpand();
  }

  function formatSearchParams(params: Record<string, unknown>) {
    const formattedParams: Record<string, unknown> = {};

    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formattedParams[key] = value;
      }
    });

    return formattedParams;
  }

  /**
   * update search params
   *
   * @param params
   */
  function updateSearchParams(params: Partial<Parameters<A>[0]>) {
    Object.assign(searchParams, params);
  }

  /** reset search params */
  function resetSearchParams() {
    Object.assign(searchParams, jsonClone(apiParams));
  }

  if (immediate) {
    getData();
  }

  return {
    loading,
    empty,
    data,
    columns,
    columnChecks,
    reloadColumns,
    getData,
    searchParams,
    updateSearchParams,
    resetSearchParams,
    toggleExpand,
    expandedRowKeys
  };
}
