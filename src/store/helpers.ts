import { AnyAction, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit'

const hasPrefix = (action: AnyAction, prefix: string) =>
  action.type.startsWith(prefix)

export const isPendingAction =
  (prefix: string) =>
  (action: AnyAction): action is AnyAction => {
    return hasPrefix(action, prefix) && isPending(action)
  }

export const isRejectedAction =
  (prefix: string) =>
  (action: AnyAction): action is AnyAction => {
    return hasPrefix(action, prefix) && isRejected(action)
  }

export const isFulfilledAction =
  (prefix: string) =>
  (action: AnyAction): action is AnyAction => {
    return hasPrefix(action, prefix) && isFulfilled(action)
  }
