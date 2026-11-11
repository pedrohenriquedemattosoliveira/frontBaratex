import { StyleSheet } from 'react-native';
import { theme } from '../../../config/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  headerNav: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginRight: theme.spacing.sm,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  headerSubtitle: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  content: {
    flex: 1,
    padding: theme.spacing.md,
  },
  card: {
    marginBottom: theme.spacing.md,
  },
  statusBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  statusText: {
    color: theme.colors.success,
    fontSize: 12,
    fontWeight: 'bold',
  },
  prestadorTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  cnpj: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  info: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginTop: 4,
  },
  servicoItem: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    marginLeft: 4,
  },
  obs: {
    fontSize: 13,
    fontStyle: 'italic',
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  hashBox: {
    backgroundColor: '#F1F5F9',
    padding: 8,
    borderRadius: 6,
    marginTop: 4,
  },
  hashLabel: {
    fontSize: 10,
    color: theme.colors.textSecondary,
  },
  hashValue: {
    fontSize: 11,
    fontFamily: 'monospace',
    color: theme.colors.textPrimary,
  },
  emptyBox: {
    padding: theme.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
});