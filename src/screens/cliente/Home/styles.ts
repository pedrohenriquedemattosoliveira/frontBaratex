import { StyleSheet } from 'react-native';
import { theme } from '../../../config/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  headerAddress: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.xs,
  },
  addressLabel: {
    fontSize: 11,
    color: theme.colors.textSecondary,
  },
  addressValue: {
    fontSize: 13,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  searchContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.xs,
  },
  bannerScroll: {
    paddingLeft: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  promoBanner: {
    width: 280,
    height: 100,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    marginRight: theme.spacing.md,
    padding: theme.spacing.md,
    justifyContent: 'center',
  },
  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bannerSubtitle: {
    color: '#E0F2FE',
    fontSize: 12,
    marginTop: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  seeAllText: {
    fontSize: 13,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  categoriesScroll: {
    paddingLeft: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  categoryCircle: {
    alignItems: 'center',
    marginRight: theme.spacing.md,
    width: 70,
  },
  categoryIconBox: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  categoryName: {
    fontSize: 11,
    color: theme.colors.textPrimary,
    textAlign: 'center',
    fontWeight: '500',
  },
  workshopsList: {
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  card: {
    padding: theme.spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  workshopLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.sm,
  },
  workshopLogoText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  workshopInfo: {
    flex: 1,
  },
  workshopName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: theme.colors.warning,
    marginRight: 6,
  },
  distanceText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  badgeVerified: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  badgeVerifiedText: {
    fontSize: 10,
    color: theme.colors.success,
    fontWeight: 'bold',
  },
  servicesSummary: {
    marginTop: theme.spacing.sm,
    paddingTop: theme.spacing.xs,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceStarting: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  priceValue: {
    fontSize: 13,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});