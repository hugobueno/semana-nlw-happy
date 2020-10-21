import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
const { Navigator, Screen } = createStackNavigator()

// ROUTES
import OrphanagesMap from './pages/OrphanegesMap'
import OrphanagesDetals from './pages/OrphanagesDetails'
import SelectMapPosition from './pages/CreateOrphanage/SelectMapPosition'
import OrphanageData from './pages/CreateOrphanage/OrphanegesDate'
import Header from './components/Header'


export default function Routes() {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#f2f2f5' } }}>
                <Screen name="OrphanagesMap" component={OrphanagesMap} />
                <Screen
                    name="OrphanagesDetals"
                    component={OrphanagesDetals}
                    options={{ headerShown: true, header: () => <Header title="Orfanato" showCancelBotton={false} /> }}
                />
                <Screen
                    name="SelectMapPosition"
                    component={SelectMapPosition}
                    options={{ headerShown: true, header: () => <Header title="Selecione no Mapa" showCancelBotton={true} /> }}
                />
                <Screen
                    name="OrphanageData"
                    component={OrphanageData}
                    options={{ headerShown: true, header: () => <Header title="Dados do Orfanato" showCancelBotton={true} /> }}
                />
            </Navigator>
        </NavigationContainer>
    )
}

