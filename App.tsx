
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider as ReduxProvider } from 'react-redux'
import { navigationRef } from 'src/common/navigation'
import { AppContainer } from 'src/navigation'
import { store } from 'src/store'
import { ThemeContext, Theme } from 'src/styles/Theme'

const App = () => {
  return (
    <SafeAreaProvider>
        <ReduxProvider store={store}>
            <NavigationContainer ref={navigationRef}>
              <ThemeContext.Provider value={{ Theme }}>
                <AppContainer />
              </ThemeContext.Provider>
            </NavigationContainer>
        </ReduxProvider>
    </SafeAreaProvider>
  )
}

export default App
