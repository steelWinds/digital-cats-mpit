export const useThemeStore = definePiniaStore('theme-store', () => {
  const isDark = useDark()
  const toggleDark = useToggle(isDark)

  return {
    isDark,
    toggleDark
  }
})
