import {
  NavigationContainerRef,
  ParamListBase,
  StackActions,
} from '@react-navigation/native'
import * as React from 'react'

export const navigationRef: React.RefObject<NavigationContainerRef> = React.createRef()

export function navigate(name: string, params?: ParamListBase[string]) {
  navigationRef.current?.navigate(name, params)
}

export function push(name: string, params?: ParamListBase[string]) {
  navigationRef.current?.dispatch(StackActions.push(name, params))
}

export function popToTop() {
  navigationRef.current?.dispatch(StackActions.popToTop())
}
