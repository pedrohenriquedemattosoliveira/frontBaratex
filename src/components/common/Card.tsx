import React from 'react';
import { 
  View, 
  TouchableOpacity, 
  StyleSheet, 
  ViewProps, 
  TouchableOpacityProps 
} from 'react-native';
import { theme } from '../../config/theme';

interface CardProps extends ViewProps {
  onPress?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, onPress, style, ...rest }) => {
  if (onPress) {
    return (
      <TouchableOpacity
        style={[styles.card, style]}
        onPress={onPress}
        activeOpacity={0.8}
        {...(rest as TouchableOpacityProps)}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.card, style]} {...rest}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
});