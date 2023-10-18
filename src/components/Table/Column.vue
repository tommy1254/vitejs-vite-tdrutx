<template>
  <RenderTableColumn v-bind="column" />
</template>
<script setup lang="jsx" name="TableColumn">
defineProps({
  column: {
    type: Object,
    default: () => { },
  }
});
const RenderTableColumn = (item) => {
  return (
    <>
      {(
        <el-table-column
          label={item.label}
          prop={item.prop}
          {...item.attrs}
        >
          {{
            default: (scope) => {
              if (item.render) return item.render(scope)
            }
          }}
        </el-table-column>
      )}
    </>
  );
};
</script>