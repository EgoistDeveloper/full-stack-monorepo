import { InjectionKey, Ref, inject, onMounted, provide, ref } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'

// eslint-disable-next-line symbol-description
const dialogRouteSymbol: InjectionKey<() => void> = Symbol()

export function useDialogRoute(): Ref<boolean> {
  const isOpen = ref(false)

  let resolveGuard: () => void
  const leaveGuard: Promise<void> = new Promise((resolve) => {
    resolveGuard = resolve
  })

  onMounted(() => {
    isOpen.value = true
  })

  onBeforeRouteLeave(() => {
    isOpen.value = false

    return leaveGuard
  })

  provide(dialogRouteSymbol, leave)

  return isOpen

  function leave() {
    resolveGuard()
  }
}

export function useDialogRouteLeave(): (() => void) | undefined {
  const leave = inject(dialogRouteSymbol, undefined)

  return leave
}
