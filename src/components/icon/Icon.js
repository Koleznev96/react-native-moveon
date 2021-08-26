import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaskedView from '@react-native-community/masked-view';

export const Icon = (props) => (
    <MaskedView maskElement={<MaterialIcons name={props.name} size={props.size || 30} color='#000' />}>
        {!props.color ? (!props.menuU ? (
            <LinearGradient
            locations={[0, 1]}
            colors={['rgba(74, 9, 210, 1)', 'rgba(193, 10, 203, 1)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            >
                <MaterialIcons
                name={props.name}
                size={props.size || 30}
                color='#000'
                style={{ opacity: 0 }}
                />
            </LinearGradient>
        ) : (
            <LinearGradient
            locations={[0, 1]}
            colors={['rgba(74, 9, 210, 0.50)', 'rgba(193, 10, 203, 0.50)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            >
                <MaterialIcons
                name={props.name}
                size={props.size || 30}
                color='#000'
                style={{ opacity: 0 }}
                />
            </LinearGradient>
        )) : (
            <MaterialIcons
            name={props.name}
            size={props.size || 30}
            color={props.color}
            />
        )}
    </MaskedView>
);


