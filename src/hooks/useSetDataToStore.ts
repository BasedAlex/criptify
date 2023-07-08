import {
  AnyAction,
  Dispatch,
  ActionCreatorWithoutPayload,
} from '@reduxjs/toolkit'

export default function useSetDataToStore<T>({
  data,
  dispatch,
  actionToRemove,
  actionToAdd,
}: {
  data: { id: number | string }[]
  dispatch: Dispatch<AnyAction>
  actionToRemove: (val: T) => any
  actionToAdd: (val: T) => any
}) {
  return (item: T & { id: number | string }) => {
    data.find(({ id }) => id === item.id)
      ? dispatch(actionToRemove(item))
      : dispatch(actionToAdd(item))
  }
}
