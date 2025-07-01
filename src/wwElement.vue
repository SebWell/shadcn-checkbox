<template>
  <div :class="wrapperClasses">
    <div 
      :class="checkboxClasses"
      :aria-checked="isChecked"
      :tabindex="content.disabled ? -1 : 0"
      role="checkbox"
      @click="handleToggle"
      @keydown.space.prevent="handleToggle"
      @keydown.enter.prevent="handleToggle"
    >
      <svg
        v-if="isChecked"
        class="h-4 w-4 text-current"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <polyline points="20,6 9,17 4,12"/>
      </svg>
      
      <div
        v-else-if="isIndeterminate"
        class="h-1 w-3 bg-current rounded-sm"
      />
    </div>
    
    <label 
      v-if="content.label"
      :for="checkboxId"
      :class="labelClasses"
      @click="handleToggle"
    >
      {{ content.label }}
      <span v-if="content.required" class="text-destructive ml-1">*</span>
    </label>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { cn } from './cn.js'

export default {
  name: 'WewebCheckbox',
  props: {
    content: {
      type: Object,
      required: true,
      default: () => ({
        checked: false,
        indeterminate: false,
        disabled: false,
        required: false,
        label: '',
        value: '',
        name: '',
        customClasses: ''
      })
    },
    modelValue: {
      type: [Boolean, Array],
      default: false
    }
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const checkboxId = `checkbox-${Math.random().toString(36).substr(2, 9)}`

    const isChecked = computed(() => {
      if (Array.isArray(props.modelValue)) {
        return props.modelValue.includes(props.content.value)
      }
      return props.modelValue || props.content.checked
    })

    const isIndeterminate = computed(() => {
      return props.content.indeterminate && !isChecked.value
    })

    const wrapperClasses = computed(() => cn(
      "flex items-center space-x-2",
      props.content.customClasses
    ))

    const checkboxClasses = computed(() => cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer transition-colors",
      {
        "bg-primary text-primary-foreground": isChecked.value,
        "cursor-not-allowed opacity-50": props.content.disabled
      }
    ))

    const labelClasses = computed(() => cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer",
      {
        "cursor-not-allowed opacity-70": props.content.disabled
      }
    ))

    const handleToggle = () => {
      if (props.content.disabled) return

      let newValue
      
      if (Array.isArray(props.modelValue)) {
        // Checkbox group mode
        newValue = [...props.modelValue]
        const index = newValue.indexOf(props.content.value)
        if (index > -1) {
          newValue.splice(index, 1)
        } else {
          newValue.push(props.content.value)
        }
      } else {
        // Single checkbox mode
        newValue = !isChecked.value
      }

      emit('update:modelValue', newValue)
      emit('change', newValue)

      // Update Weweb variable if defined
      if (props.content.wewebVariable && typeof wwLib !== 'undefined') {
        wwLib.wwVariable.updateValue(props.content.wewebVariable, newValue)
      }

      // Execute Weweb workflow if defined
      if (props.content.changeWorkflowId && typeof wwLib !== 'undefined') {
        wwLib.executeWorkflow(props.content.changeWorkflowId)
      }
    }

    return {
      checkboxId,
      isChecked,
      isIndeterminate,
      wrapperClasses,
      checkboxClasses,
      labelClasses,
      handleToggle
    }
  }
}
</script>

<style>
/* Import global shadcn/ui styles */
@import './globals.css';
</style> 