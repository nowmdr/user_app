<template>
  <select
    :class="{
      'main-black': modelValue,
    }"
    class="app-select"
    @change="changeOption"
  >
    <option disabled value="">choose something</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>
<script>
import "../app-select/AppSelect.scss";
export default {
  props: {
    modelValue: {
      type: String,
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    changeOption(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>
