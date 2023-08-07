<script setup>
//PROPS

const props = defineProps({
  dataTable: Array,
  isClickable: Boolean,
});
const emit = defineEmits(["clicked"]);

async function tableRowClick(deviceId) {
  if (props.isClickable) {
    emit("clicked", deviceId);
  }
}
</script>

<template>
  <div class="p-2">
    <table class="text-center min-w-full">
      <thead class="font-medium border-b border-slate-400">
        <tr>
          <th class="p-2">#</th>
          <th scope="col" class="p-2">Model</th>
          <th scope="col" class="p-2">Type</th>
          <th scope="col" class="p-2">Serial</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in props.dataTable"
          @click="tableRowClick([item.deviceId, index])"
        >
          <td class="p-2 border-b dark:border-neutral-400">
            {{ index + 1 }}
          </td>
          <td class="p-2 border-b dark:border-neutral-400">{{ item.model }}</td>
          <td class="p-2 border-b dark:border-neutral-400">{{ item.type }}</td>
          <td class="p-2 border-b dark:border-neutral-400">
            {{ item.serial }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
