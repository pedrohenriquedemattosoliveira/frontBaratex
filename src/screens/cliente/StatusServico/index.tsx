import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Card } from '../../../components/common/Card';
import { Button } from '../../../components/common/Button';
import { theme } from '../../../config/theme';
import { styles } from './styles';

const ETAPAS = [
    { id: 1, titulo: 'Aguardando Chegada', detalhe: 'Agendado para hoje às 14:00', concluido: true },
    { id: 2, titulo: 'Serviço em Execução', detalhe: 'Troca de pastilhas em andamento', concluido: true },
    { id: 3, titulo: 'Pronto para Retirada', detalhe: 'Aguardando você na loja', concluido: false },
];

export const StatusServicoScreen = () => {
    const navigation = useNavigation<any>();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerNav}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} activeOpacity={0.7}>
                    <Ionicons name="arrow-back" size={20} color={theme.colors.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Acompanhamento</Text>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <Card style={styles.card}>
                    <Text style={styles.prestadorName}>Auto Center Silva</Text>
                    <Text style={styles.carInfo}>Chevrolet Onix • Placa ABC1D23</Text>
                </Card>

                <Card style={styles.card}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 12 }}>Progresso do Serviço</Text>

                    <View style={styles.timelineContainer}>
                        {ETAPAS.map((e) => (
                            <View key={e.id} style={styles.stepRow}>
                                <View style={[styles.stepDot, e.concluido && styles.stepDotActive]}>
                                    {e.concluido ? (
                                        <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                                    ) : (
                                        <Ionicons name="ellipse" size={8} color={theme.colors.textSecondary} />
                                    )}
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={e.concluido ? styles.stepTextActive : styles.stepTextInactive}>{e.titulo}</Text>
                                    <Text style={styles.stepSubtext}>{e.detalhe}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </Card>

                <View style={styles.actionsRow}>
                    <Button
                        title="Chat com Prestador"
                        variant="outline"
                        style={styles.actionButton}
                        onPress={() => navigation.navigate('ChatPrestador', { prestadorId: 1, prestadorNome: 'Auto Center Silva' })}
                    />
                    <Button
                        title="Avaliar Serviço"
                        variant="primary"
                        style={styles.actionButton}
                        onPress={() => navigation.navigate('AvaliacaoPrestador', { prestadorId: 1, prestadorNome: 'Auto Center Silva' })}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};