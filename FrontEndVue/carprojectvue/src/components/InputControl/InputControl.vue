<template>
  <div class="container">
    <label v-if="label">{{ label }}</label>
    <input type="text" v-model="props" :placeholder="placeholder" v-bind="$props" />
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    placeholder: String,
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}

input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 8px 0;
}
</style>

