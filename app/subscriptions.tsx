import React from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Alert,
} from 'react-native';
import {useRouter} from 'expo-router';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useBudgetStore} from '@/store/budgetStore';
import {styles} from './subscriptions.styles';
import {Subscription} from '@/domain/entities/Budget';

export default function SubscriptionsScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const budget = useBudgetStore(state => state.getActiveBudget());
    const deleteSubscription = useBudgetStore(state => state.deleteSubscription);
    const toggleSubscription = useBudgetStore(state => state.toggleSubscription);

    const subscriptions = [...(budget?.subscriptions ?? [])].sort((a, b) => a.dayOfMonth - b.dayOfMonth);

    const handleDelete = (subscription: Subscription) => {
        if (!budget) return;

        Alert.alert(
            'Supprimer l’abonnement',
            `Supprimer "${subscription.label}" ?`,
            [
                {text: 'Annuler', style: 'cancel'},
                {
                    text: 'Supprimer',
                    style: 'destructive',
                    onPress: () => deleteSubscription(budget.id, subscription.id),
                },
            ]
        );
    };

    const renderItem = ({item}: { item: Subscription }) => (
        <View style={[styles.row, !item.isActive && styles.rowInactive]}>
            <View style={styles.rowMain}>
                <View style={styles.dayBadge}>
                    <Text style={styles.dayValue}>{item.dayOfMonth}</Text>
                    <Text style={styles.dayLabel}>jour</Text>
                </View>

                <View style={styles.info}>
                    <Text style={styles.label}>{item.label}</Text>
                    <Text style={styles.caption}>
                        Prélèvement prévu le {item.dayOfMonth} de chaque mois
                    </Text>
                </View>

                <View style={styles.amountWrap}>
                    <Text style={styles.amount}>{item.amount.toFixed(2)} €</Text>
                </View>
            </View>

            <View style={styles.actionsRow}>
                <TouchableOpacity
                    style={[styles.actionBtn, styles.editBtn]}
                    onPress={() => router.push({
                        pathname: '/add-subscription' as any,
                        params: {subscriptionId: item.id},
                    })}
                >
                    <Text style={styles.actionText}>Modifier</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.actionBtn, item.isActive ? styles.pauseBtn : styles.activateBtn]}
                    onPress={() => budget && toggleSubscription(budget.id, item.id)}
                >
                    <Text style={styles.actionText}>{item.isActive ? 'Mettre en pause' : 'Réactiver'}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.actionBtn, styles.deleteBtn]}
                    onPress={() => handleDelete(item)}
                >
                    <Text style={styles.deleteText}>Supprimer</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={[styles.root, {paddingTop: insets.top}]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={styles.backBtn}>‹ Retour</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/add-subscription' as any)}>
                    <Text style={styles.addBtn}>＋ Ajouter</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.hero}>
                <Text style={styles.title}>Abonnements mensuels</Text>
                <Text style={styles.subtitle}>
                    Gère tes charges récurrentes pour mieux anticiper ce qui part automatiquement chaque mois.
                </Text>
            </View>

            <FlatList
                data={subscriptions}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                renderItem={renderItem}
                ListEmptyComponent={
                    <View style={styles.emptyWrap}>
                        <Text style={styles.emptyTitle}>Aucun abonnement pour l’instant</Text>
                        <Text style={styles.emptyText}>
                            Ajoute tes prélèvements récurrents pour voir leur impact sur ton budget du mois.
                        </Text>
                        <TouchableOpacity
                            style={styles.emptyCta}
                            onPress={() => router.push('/add-subscription' as any)}
                        >
                            <Text style={styles.emptyCtaText}>Ajouter un abonnement</Text>
                        </TouchableOpacity>
                    </View>
                }
            />
        </View>
    );
}
