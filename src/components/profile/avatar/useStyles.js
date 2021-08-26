import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    indicatorMin: {
        backgroundColor: 'rgba(93, 243, 144, 1)',
        width: 12,
        height: 12,
        borderRadius: 100,
        zIndex: 3,
        position: 'absolute',
        right: 1,
        bottom: 1,
        justifyContent: 'center',
    },
    indicatorMax: {
        backgroundColor: 'rgba(93, 243, 144, 1)',
        width: 16,
        height: 16,
        borderRadius: 100,
        zIndex: 3,
        position: 'absolute',
        right: 8,
        bottom: 8,
        justifyContent: 'center',
    }
});