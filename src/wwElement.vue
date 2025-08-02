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
        class="checkbox-check-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <polyline points="20,6 9,17 4,12"/>
      </svg>
      
      <div
        v-else-if="content.indeterminate"
        class="checkbox-indeterminate-icon"
      />
    </div>
    
    <label 
      v-if="content.label"
      :class="labelClasses"
      @click="handleToggle"
    >
      {{ content.label }}
      <span v-if="content.required" class="checkbox-required">*</span>
    </label>
  </div>
</template>

<script>
import { computed, ref } from 'vue'

export default {
  name: 'ShadcnCheckbox',
  props: {
    content: {
      type: Object,
      required: true,
      default: () => ({
        label: "Accept terms and conditions",
        checked: false,
        indeterminate: false,
        disabled: false,
        required: false,
        size: "default"
      })
    },
    wwEditorState: { type: Object, required: true }
  },
  emits: ['trigger-event', 'change'],
  setup(props, { emit }) {
    const isChecked = computed(() => {
      return props.content.indeterminate ? false : props.content.checked
    })

    const wrapperClasses = computed(() => {
      return 'checkbox-wrapper'
    })

    const checkboxClasses = computed(() => {
      const baseClass = 'checkbox-base'
      const sizeClass = `checkbox-size-${props.content.size || 'default'}`
      const stateClass = isChecked.value ? 'checkbox-checked' : 'checkbox-unchecked'
      const disabledClass = props.content.disabled ? 'checkbox-disabled' : ''
      const indeterminateClass = props.content.indeterminate ? 'checkbox-indeterminate' : ''
      
      return `${baseClass} ${sizeClass} ${stateClass} ${disabledClass} ${indeterminateClass}`.trim()
    })

    const labelClasses = computed(() => {
      const baseClass = 'checkbox-label'
      const disabledClass = props.content.disabled ? 'checkbox-label-disabled' : ''
      return `${baseClass} ${disabledClass}`.trim()
    })

    const handleToggle = () => {
      if (props.content.disabled) return

      const newChecked = !props.content.checked
      
      const eventData = {
        checked: newChecked,
        label: props.content.label,
        content: props.content
      }

      emit('change', { domEvent: null, value: eventData })
      emit('trigger-event', { 
        domEvent: null, 
        value: eventData 
      })
    }

    return {
      isChecked,
      wrapperClasses,
      checkboxClasses,
      labelClasses,
      handleToggle
    }
  }
}
</script>

<style scoped>
/* Variables CSS Shadcn/UI */
:root {
  --primary: hsl(222.2, 47.4%, 11.2%);
  --primary-foreground: hsl(210, 40%, 98%);
  --border: hsl(214.3, 31.8%, 91.4%);
  --input: hsl(214.3, 31.8%, 91.4%);
  --ring: hsl(222.2, 84%, 4.9%);
  --foreground: hsl(222.2, 84%, 4.9%);
  --destructive: hsl(0, 84.2%, 60.2%);
  --muted-foreground: hsl(215.4, 16.3%, 46.9%);
}

/* Wrapper */
.checkbox-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Checkbox Base */
.checkbox-base {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--border);
  border-radius: 4px;
  background-color: transparent;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
}

.checkbox-base:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--ring);
}

/* Sizes */
.checkbox-size-sm {
  width: 16px;
  height: 16px;
}

.checkbox-size-default {
  width: 20px;
  height: 20px;
}

.checkbox-size-lg {
  width: 24px;
  height: 24px;
}

/* States */
.checkbox-unchecked {
  border-color: var(--border);
}

.checkbox-unchecked:hover:not(.checkbox-disabled) {
  border-color: var(--primary);
}

.checkbox-checked {
  background-color: var(--primary);
  border-color: var(--primary);
  color: var(--primary-foreground);
}

.checkbox-checked:hover:not(.checkbox-disabled) {
  background-color: hsl(222.2, 47.4%, 10%);
  border-color: hsl(222.2, 47.4%, 10%);
}

.checkbox-indeterminate {
  background-color: var(--primary);
  border-color: var(--primary);
  color: var(--primary-foreground);
}

.checkbox-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* Icons */
.checkbox-check-icon {
  width: 12px;
  height: 12px;
}

.checkbox-size-sm .checkbox-check-icon {
  width: 10px;
  height: 10px;
}

.checkbox-size-lg .checkbox-check-icon {
  width: 14px;
  height: 14px;
}

.checkbox-indeterminate-icon {
  width: 8px;
  height: 2px;
  background-color: currentColor;
  border-radius: 1px;
}

.checkbox-size-sm .checkbox-indeterminate-icon {
  width: 6px;
  height: 2px;
}

.checkbox-size-lg .checkbox-indeterminate-icon {
  width: 10px;
  height: 2px;
}

/* Label */
.checkbox-label {
  font-size: 14px;
  font-weight: 400;
  line-height: 1;
  color: var(--foreground);
  cursor: pointer;
  user-select: none;
}

.checkbox-label-disabled {
  color: var(--muted-foreground);
  cursor: not-allowed;
}

/* Required asterisk */
.checkbox-required {
  color: var(--destructive);
  margin-left: 4px;
  font-weight: 500;
}
</style>