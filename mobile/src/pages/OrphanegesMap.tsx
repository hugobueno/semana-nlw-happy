import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'
import mapMarker from '../images/map-marker.png'
import { Feather } from '@expo/vector-icons'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../services/api';

interface Orphanages {
    _id: string,
    name: string
    latitude: number,
    longitude: number
}

export default function OrphanagesMap() {
    const navigation = useNavigation()
    const [orphanages, setOrphanages] = useState<Orphanages[]>([])
    useFocusEffect(
        useCallback(() => {
            const fingOrphanages = api.get('orphanage')
                .then((response) => {
                    setOrphanages(response.data)
                })
                .catch((error) => {
                    alert('Erro na Requsição tente mais tarde')
                    console.log(error)
                })
        }, [])
    )

    function handleNavigateToOrphanageDetail(id: string) {
        navigation.navigate('OrphanagesDetals', { id })
    }

    function handleNavigateToSelectMapPosition() {
        navigation.navigate('SelectMapPosition')
    }

    const listMarkes = orphanages.map((orphanages) => {
        return (
            <Marker key={orphanages._id}
                calloutAnchor={{
                    x: 2.7,
                    y: 0.8
                }}
                icon={mapMarker}
                coordinate={{
                    latitude: orphanages.latitude,
                    longitude: orphanages.longitude,
                }}>
                {/* tooltip reseta o style do callout */}
                <Callout tooltip={true} onPress={() => handleNavigateToOrphanageDetail(orphanages._id)}  >
                    <View style={styles.calloutContainer}>
                        <Text style={styles.calloutText}>{orphanages.name}</Text>
                    </View>
                </Callout>
            </Marker>
        )
    })

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                    latitude: -20.3853896,
                    longitude: -54.5626761,
                    latitudeDelta: 0.008,
                    longitudeDelta: 0.008
                }}>
                {listMarkes}
            </MapView>
            <View style={styles.footer}>
                <Text style={styles.footerText}>{orphanages.length} orfanatos encontrados</Text>
                <RectButton
                    style={styles.createOrphanagesButton}
                    onPress={handleNavigateToSelectMapPosition}>
                    <Feather name="plus" size={20} color="#fff" />
                </RectButton>
            </View>
        </View>


    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    calloutContainer: {
        height: 46,
        width: 160,
        paddingHorizontal: 16,
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 16,
        justifyContent: "center",
    },
    calloutText: {
        color: '#0089a5',
        fontSize: 14,
        fontFamily: 'Nunito_700Bold',
    },
    footer: {
        position: 'absolute',
        left: 24,
        right: 24,
        bottom: 32,
        backgroundColor: '#fff',
        borderRadius: 20,
        height: 56,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 3,
    },
    footerText: {
        color: '#8fa7b3',
        left: 24,
        fontFamily: 'Nunito_700Bold'
    },
    createOrphanagesButton: {
        width: 56,
        height: 56,
        backgroundColor: '#15c3d6',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }

});