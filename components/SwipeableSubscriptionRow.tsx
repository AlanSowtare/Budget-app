import React from 'react';
import {AccessibilityActionEvent, Text, TouchableOpacity, View} from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSequence,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {styles} from '@/app/subscriptions.styles';
import {formatCurrency} from '@/utils/currency';
import {spacing} from '@/constants/theme';

export interface SubscriptionRowItem {
    id: string;
    label: string;
    amount: number;
    dayOfMonth: number;
    effectiveDay: number;
    frequency: 'monthly' | 'quarterly' | 'semiannual' | 'annual';
    status: 'upcoming' | 'debited' | 'paused';
    daysUntil: number | null;
}

interface Props {
    item: SubscriptionRowItem;
    previewSwipe?: boolean;
    onEdit: () => void;
    onToggle: () => void;
    onDelete: () => void;
}

const ACTION_WIDTH = spacing.xl * 5;
const OPEN_THRESHOLD = ACTION_WIDTH / 2;

export function SwipeableSubscriptionRow({
    item,
    previewSwipe = false,
    onEdit,
    onToggle,
    onDelete,
}: Props) {
    const translateX = useSharedValue(
        previewSwipe
            ? withSequence(
                withDelay(250, withTiming(-ACTION_WIDTH * 0.6, {duration: 350})),
                withTiming(0, {duration: 450}),
            )
            : 0,
    );
    const gestureStartX = useSharedValue(0);

    const close = () => {
        translateX.value = withSpring(0);
    };

    const pan = Gesture.Pan()
        .activeOffsetX([-10, 10])
        .onStart(() => {
            gestureStartX.value = translateX.value;
        })
        .onUpdate(event => {
            translateX.value = Math.max(
                -ACTION_WIDTH,
                Math.min(0, gestureStartX.value + event.translationX),
            );
        })
        .onEnd(() => {
            translateX.value = withSpring(translateX.value < -OPEN_THRESHOLD ? -ACTION_WIDTH : 0);
        });

    const foregroundStyle = useAnimatedStyle(() => ({
        transform: [{translateX: translateX.value}],
    }));

    const accessibilityActions = [
        {name: 'edit', label: 'Modifier'},
        {name: item.status === 'paused' ? 'resume' : 'pause', label: item.status === 'paused' ? 'Reprendre' : 'Mettre en pause'},
        {name: 'delete', label: 'Supprimer'},
    ];

    const handleAccessibilityAction = (event: AccessibilityActionEvent) => {
        switch (event.nativeEvent.actionName) {
            case 'edit':
                onEdit();
                break;
            case 'pause':
            case 'resume':
                onToggle();
                break;
            case 'delete':
                onDelete();
                break;
        }
    };

    const frequencyLabel = {
        monthly: '',
        quarterly: 'Trimestriel',
        semiannual: 'Semestriel',
        annual: 'Annuel',
    }[item.frequency];
    const isUpcoming = item.status === 'upcoming';
    const relativeDay = item.daysUntil === null
        ? null
        : item.daysUntil === 0
            ? 'aujourd’hui'
            : item.daysUntil === 1
                ? 'demain'
                : `dans ${item.daysUntil} j`;

    return (
        <View style={styles.swipeContainer}>
            <View style={styles.swipeActions}>
                <TouchableOpacity
                    style={styles.swipePauseAction}
                    onPress={() => {
                        close();
                        onToggle();
                    }}
                    accessibilityRole="button"
                    accessibilityLabel={item.status === 'paused' ? 'Reprendre le prélèvement' : 'Mettre en pause le prélèvement'}
                >
                    <Text style={styles.swipeActionText}>
                        {item.status === 'paused' ? 'Reprendre' : 'Pause'}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.swipeDeleteAction}
                    onPress={() => {
                        close();
                        onDelete();
                    }}
                    accessibilityRole="button"
                    accessibilityLabel="Supprimer le prélèvement"
                >
                    <Text style={styles.swipeActionText}>Supprimer</Text>
                </TouchableOpacity>
            </View>

            <GestureDetector gesture={pan}>
                <Animated.View style={[styles.subscriptionRow, foregroundStyle]}>
                    <TouchableOpacity
                        style={styles.rowPressable}
                        onPress={onEdit}
                        accessibilityRole="button"
                        accessibilityLabel={`${item.label}, ${formatCurrency(item.amount)}, le ${item.effectiveDay}`}
                        accessibilityActions={accessibilityActions}
                        onAccessibilityAction={handleAccessibilityAction}
                    >
                        <View style={[styles.dayBadge, isUpcoming && styles.dayBadgeUpcoming]}>
                            <Text style={[styles.dayValue, isUpcoming && styles.dayValueUpcoming]}>
                                {item.effectiveDay}
                            </Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={[styles.label, !isUpcoming && styles.inactiveText]}>
                                {item.label}
                            </Text>
                            {item.status === 'paused' ? (
                                <Text style={styles.secondaryText}>En pause</Text>
                            ) : isUpcoming && relativeDay ? (
                                <Text style={styles.secondaryText}>{relativeDay}</Text>
                            ) : null}
                            {frequencyLabel !== '' && (
                                <Text style={styles.frequency}>{frequencyLabel}</Text>
                            )}
                        </View>
                        <Text style={[styles.amount, !isUpcoming && styles.inactiveText]}>
                            {formatCurrency(item.amount)}
                        </Text>
                    </TouchableOpacity>
                </Animated.View>
            </GestureDetector>
        </View>
    );
}
