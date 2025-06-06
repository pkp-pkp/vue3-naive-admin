<script setup lang="ts">
import { computed } from 'vue';
import type { ComponentType } from './component-map';
import { componentMap, optionsComponentMap } from './component-map';
import ConfigFormItemOptions from './config-form-item-options.vue';
import type { ConfigFormItem } from './config-form-type';

defineOptions({ name: 'ConfigFormItem' });

type ComponentProps = Record<string, any> | undefined;

const props = defineProps<{
  field: ConfigFormItem<any>;
  model: Record<string, any>;
}>();

const value = defineModel<Array<any> | number | string | boolean>('value');

const getComponent = (type: ComponentType) => {
  if (!componentMap[type]) {
    throw new Error(`Component ${type} is not found`);
  }
  return componentMap[type];
};

const getOptionsComponent = (type: ComponentType) => {
  const comp = optionsComponentMap[type as keyof typeof optionsComponentMap];
  return comp;
};

const getComponentProps = (componentProps: ComponentProps) => {
  if (!componentProps) return {};
  return Object.keys(componentProps).reduce((prev: any, key) => {
    if (!/^on([A-Z])/.test(key)) {
      const eventKey = key.replace(/^on([A-Z])/, '$1').toLocaleLowerCase();
      prev[eventKey] = componentProps[key];
    }
    return prev;
  }, {});
};

const getDisabled = (field: ConfigFormItem<any>) => {
  const { disabled } = field;
  if (typeof disabled === 'function') {
    return disabled(props.model);
  }

  return disabled;
};

/** 表单组件事件 */
const componentEvents = (componentProps: ComponentProps) => {
  if (!componentProps) return {};
  return Object.keys(componentProps).reduce((prev: any, key) => {
    if (/^on([A-Z])/.test(key)) {
      // e.g: onChange => change
      const eventKey = key.replace(/^on([A-Z])/, '$1').toLocaleLowerCase();
      prev[eventKey] = componentProps[key];
    }
    return prev;
  }, {});
};

const getValue = computed<Record<string, any>>(() => {
  const { model, field } = props;
  return {
    formModel: model,
    key: field.key,
    field
  };
});
</script>

<template>
  <slot v-if="field.slot" :name="field.slot" v-bind="getValue" />
  <component
    :is="getComponent(field.type)"
    v-else
    v-bind="getComponentProps(field.props)"
    v-model:value="value"
    clearable
    :disabled="getDisabled(field)"
    v-on="componentEvents(field.props)"
  >
    <!-- 部分组件 如 RadioGroup 不能通过传入 Options 来渲染这里特殊处理 -->
    <ConfigFormItemOptions
      v-if="getOptionsComponent(field.type) && field.options"
      :options="field.options"
      :component-id="getOptionsComponent(field.type)"
    />
  </component>
</template>
