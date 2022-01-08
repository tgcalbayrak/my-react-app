import { useSelector } from 'react-redux'

export function useUserState() {
  return useSelector(state => {
    return state.user
  })
}
