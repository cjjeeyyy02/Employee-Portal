/**
 * Unified Design System for Manager Function Screens
 * 
 * This file defines all CSS classes and styling constants used across
 * the Manager Function module to ensure consistency and easy maintenance.
 */

// ============================================================================
// LAYOUT & CONTAINER STYLES (ULTRA-COMPACT - MINIMIZED)
// ============================================================================

export const layoutStyles = {
  // Main page container
  pageWrapper: "bg-white min-h-screen",

  // Content container with minimal padding (ULTRA-COMPACT)
  pageContainer: "max-w-7xl mx-auto px-4 py-2",
  contentContainer: "max-w-7xl mx-auto px-4 pb-2",

  // Section containers (ULTRA-COMPACT)
  sectionPadding: "p-2",
  cardPadding: "p-2",
};

// ============================================================================
// TYPOGRAPHY STYLES (ULTRA-COMPACT - MINIMIZED)
// ============================================================================

export const typographyStyles = {
  // Page title - MINIMIZED to 18px
  pageTitle: "text-lg font-semibold text-gray-900 mb-0",
  pageSubtitle: "text-xs text-gray-600 mt-0.5",

  // Section title - MINIMIZED to 14px
  sectionTitle: "text-sm font-medium text-gray-900 mb-1",
  sectionSubtitle: "text-xs text-gray-600",

  // Body text - MINIMIZED
  bodyText: "text-xs text-gray-700",
  bodySmall: "text-xs text-gray-600",
  labelText: "text-xs font-medium text-gray-900",

  // Card titles - MINIMIZED
  cardTitle: "font-semibold text-xs text-gray-900",
  cardText: "text-xs text-gray-600",
};

// ============================================================================
// SPACING CONSTANTS (ULTRA-COMPACT - MINIMIZED)
// ============================================================================

export const spacingStyles = {
  // Page level spacing (ULTRA-COMPACT)
  pageGap: "gap-2",
  pageMB: "mb-2",

  // Section level spacing (ULTRA-COMPACT)
  sectionGap: "gap-2",
  sectionMB: "mb-2",

  // Card/row spacing (ULTRA-COMPACT)
  itemGap: "gap-1.5",
  itemMB: "mb-1.5",

  // Tab spacing (ULTRA-COMPACT)
  tabGap: "gap-3",
  tabPadding: "px-2 py-1.5",
};

// ============================================================================
// COMPONENT STYLES (ULTRA-COMPACT - MINIMIZED)
// ============================================================================

export const componentStyles = {
  // Headers with border (ULTRA-COMPACT padding)
  headerSection: "bg-white border-b border-gray-200",
  headerContainer: "max-w-7xl mx-auto px-4 py-2",

  // Tab styles - clean design with bottom border (MINIMIZED)
  tabContainer: "flex gap-3 mb-2 border-b border-gray-200",
  tabButton: "pb-1.5 text-xs font-medium transition-colors",
  tabActive: "border-b-2 border-blue-600 text-gray-900",
  tabInactive: "border-b-2 border-transparent text-gray-600 hover:text-gray-900",

  // Cards - white background with subtle border, no shadow (MINIMIZED)
  card: "bg-white rounded-md p-2 border border-gray-200",
  cardHover: "hover:border-gray-300 transition-colors",

  // Metric cards (MINIMIZED)
  metricCard: "bg-white rounded-md p-2 border border-gray-200",
  metricLabel: "text-xs font-medium text-gray-700",
  metricValue: "text-lg font-bold text-gray-900 my-1",
  metricSubtext: "text-xs text-gray-600",
  
  // Badge/Status styles
  badge: "inline-block px-3 py-1 rounded-md text-xs font-medium",
  badgeSuccess: "bg-green-100 text-green-800",
  badgeWarning: "bg-yellow-100 text-yellow-800",
  badgeError: "bg-red-100 text-red-800",
  badgeInfo: "bg-blue-100 text-blue-800",
  badgeNeutral: "bg-gray-100 text-gray-800",
  
  // Dividers and separators
  divider: "border-b border-gray-200",
  dividerLight: "border-b border-gray-100",
};

// ============================================================================
// TABLE & LIST STYLES (COMPACT)
// ============================================================================

export const tableStyles = {
  tableWrapper: "bg-white rounded-md border border-gray-200 overflow-hidden",
  tableHeader: "bg-gray-50 border-b border-gray-200",
  tableHeaderCell: "px-3 py-2 text-left text-xs font-semibold text-gray-900",
  tableRow: "border-b border-gray-100 hover:bg-gray-50 transition-colors",
  tableCell: "px-3 py-2 text-xs text-gray-700",
  tableCellSmall: "text-xs text-gray-600",
};

// ============================================================================
// BUTTON STYLES
// ============================================================================

export const buttonStyles = {
  // Primary button
  primary: "bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md",
  primarySmall: "h-8 text-xs px-3",
  primaryMedium: "h-9 text-sm px-4",
  
  // Secondary/outline button
  secondary: "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium rounded-md",
  secondarySmall: "h-8 text-xs px-3",
  secondaryMedium: "h-9 text-sm px-4",
  
  // Ghost button (minimal style)
  ghost: "text-gray-700 hover:bg-gray-100 font-medium rounded-md",
  ghostSmall: "h-8 text-xs px-3",
};

// ============================================================================
// INPUT & FORM STYLES
// ============================================================================

export const formStyles = {
  input: "border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
  inputSmall: "h-8 text-sm",
  inputMedium: "h-10 text-base",
};

// ============================================================================
// ICON STYLES
// ============================================================================

export const iconStyles = {
  small: "w-4 h-4",
  medium: "w-5 h-5",
  large: "w-6 h-6",
  
  colorDefault: "text-gray-400",
  colorActive: "text-blue-600",
  colorMuted: "text-gray-500",
};

// ============================================================================
// GRID & FLEX LAYOUTS (COMPACT)
// ============================================================================

export const gridStyles = {
  // 4-column metric grid (COMPACT gaps)
  metricGrid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-3",

  // 2-column grid (cards, items) (COMPACT gaps)
  twoColGrid: "grid grid-cols-1 md:grid-cols-2 gap-3",

  // 3-column grid (COMPACT gaps)
  threeColGrid: "grid grid-cols-1 md:grid-cols-3 gap-3",

  // Flex row with gap
  flexRow: "flex items-center gap-2",
  flexRowSpaced: "flex items-center justify-between",
};

// ============================================================================
// UTILITY FUNCTIONS FOR COMMON PATTERNS
// ============================================================================

/**
 * Get tab button classes based on active state
 */
export function getTabButtonClasses(isActive: boolean): string {
  const base = componentStyles.tabButton;
  const state = isActive ? componentStyles.tabActive : componentStyles.tabInactive;
  return `${base} ${state}`;
}

/**
 * Get badge classes based on status type
 */
export function getBadgeClasses(status: "success" | "warning" | "error" | "info" | "neutral"): string {
  const base = componentStyles.badge;
  const statusMap = {
    success: componentStyles.badgeSuccess,
    warning: componentStyles.badgeWarning,
    error: componentStyles.badgeError,
    info: componentStyles.badgeInfo,
    neutral: componentStyles.badgeNeutral,
  };
  return `${base} ${statusMap[status]}`;
}

/**
 * Get button classes based on variant
 */
export function getButtonClasses(variant: "primary" | "secondary" | "ghost", size: "small" | "medium" = "small"): string {
  const baseMap = {
    primary: buttonStyles.primary,
    secondary: buttonStyles.secondary,
    ghost: buttonStyles.ghost,
  };
  
  const sizeMap = {
    small: variant === "primary" ? buttonStyles.primarySmall : 
           variant === "secondary" ? buttonStyles.secondarySmall : 
           buttonStyles.ghostSmall,
    medium: variant === "primary" ? buttonStyles.primaryMedium : 
            variant === "secondary" ? buttonStyles.secondaryMedium : 
            "h-10 text-sm px-4",
  };
  
  return `${baseMap[variant]} ${sizeMap[size]}`;
}

// ============================================================================
// REUSABLE LAYOUT PATTERNS
// ============================================================================

export const layoutPatterns = {
  // Header with title and actions
  headerWithActions: "flex items-start justify-between",
  
  // Card with border and padding
  simpleCard: `${componentStyles.card} ${componentStyles.cardHover}`,
  
  // Spacing between sections
  sectionSpacing: `${spacingStyles.sectionMB}`,
  
  // Gap between items
  itemSpacing: `${spacingStyles.itemGap}`,
};
