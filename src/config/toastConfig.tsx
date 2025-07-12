import { BaseToast, ErrorToast } from 'react-native-toast-message';

export const toastConfig = {
    // @ts-ignore
    success: (props) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: '#4CAF50', backgroundColor: '#E8F5E9' }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontSize: 13,
                fontWeight: 'bold',
                color: '#2E7D32',
            }}
            text2Style={{
                fontSize: 11,
                color: '#2E7D32',
            }}
        />
    ),

    // @ts-ignore
    error: (props) => (
        <ErrorToast
            {...props}
            style={{ borderLeftColor: '#F44336', backgroundColor: '#FFEBEE' }}
            text1Style={{
                fontSize: 13,
                fontWeight: 'bold',
                color: '#C62828',
            }}
            text2Style={{
                fontSize: 11,
                color: '#C62828',
            }}
        />
    ),

    // @ts-ignore
    info: (props) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: '#2196F3', backgroundColor: '#E3F2FD' }}
            text1Style={{
                fontSize: 13,
                fontWeight: 'bold',
                color: '#1565C0',
            }}
            text2Style={{
                fontSize: 11,
                color: '#1565C0',
            }}
        />
    ),
};
