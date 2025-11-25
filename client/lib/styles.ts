/**
 * Unified Design System for Manager Function Screens
 * 
 * This file defines all CSS classes and styling constants used across
 * the Manager Function module to ensure consistency and easy maintenance.
 */

// ============================================================================
// LAYOUT & CONTAINER STYLES
// ============================================================================

export const layoutStyles = {
  // Main page container
  pageWrapper: "bg-white min-h-screen",

  // Content container with minimal padding (COMPACT)
  pageContainer: "max-w-7xl mx-auto px-5 py-3",
  contentContainer: "max-w-7xl mx-auto px-5 pb-4",

  // Section containers (COMPACT)
  sectionPadding: "p-3",
  cardPadding: "p-3",
};

// ============================================================================
// TYPOGRAPHY STYLES
// ============================================================================

export const typographyStyles = {
  // Page title - 20-22px, semibold
  pageTitle: "text-xl md:text-2xl font-semibold text-gray-900",
  pageSubtitle: "text-sm text-gray-600 mt-2",
  
  // Section title - 16-18px, medium
  sectionTitle: "text-lg md:text-xl font-medium text-gray-900 mb-2",
  sectionSubtitle: "text-xs md:text-sm text-gray-600",
  
  // Body text - 14-15px, regular
  bodyText: "text-sm text-gray-700",
  bodySmall: "text-xs md:text-sm text-gray-600",
  labelText: "text-xs md:text-sm font-medium text-gray-900",
  
  // Card titles
  cardTitle: "font-semibold text-sm text-gray-900",
  cardText: "text-xs md:text-sm text-gray-600",
};

// ============================================================================
// SPACING CONSTANTS (COMPACT)
// ============================================================================

export const spacingStyles = {
  // Page level spacing (COMPACT)
  pageGap: "gap-3",
  pageMB: "mb-3",

  // Section level spacing (COMPACT)
  sectionGap: "gap-3",
  sectionMB: "mb-3",

  // Card/row spacing (COMPACT)
  itemGap: "gap-2",
  itemMB: "mb-2",

  // Tab spacing (COMPACT)
  tabGap: "gap-4",
  tabPadding: "px-3 py-2",
};

// ============================================================================
// COMPONENT STYLES
// ============================================================================

export const componentStyles = {
  // Headers with border
  headerSection: "bg-white border-b border-gray-200",
  headerContainer: "max-w-7xl mx-auto px-6 py-6",
  
  // Tab styles - clean design with bottom border
  tabContainer: "flex gap-6 mb-6 border-b border-gray-200",
  tabButton: "pb-4 text-sm font-medium transition-colors",
  tabActive: "border-b-2 border-blue-600 text-gray-900",
  tabInactive: "border-b-2 border-transparent text-gray-600 hover:text-gray-900",
  
  // Cards - white background with subtle border, no shadow
  card: "bg-white rounded-md p-4 md:p-5 border border-gray-200",
  cardHover: "hover:border-gray-300 transition-colors",
  
  // Metric cards
  metricCard: "bg-white rounded-md p-4 border border-gray-200",
  metricLabel: "text-sm font-medium text-gray-700",
  metricValue: "text-3xl font-bold text-gray-900 my-3",
  metricSubtext: "text-sm text-gray-600",
  
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
// TABLE & LIST STYLES
// ============================================================================

export const tableStyles = {
  tableWrapper: "bg-white rounded-md border border-gray-200 overflow-hidden",
  tableHeader: "bg-gray-50 border-b border-gray-200",
  tableHeaderCell: "px-4 py-3 text-left text-xs font-semibold text-gray-900",
  tableRow: "border-b border-gray-100 hover:bg-gray-50 transition-colors",
  tableCell: "px-4 py-3 text-sm text-gray-700",
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
// GRID & FLEX LAYOUTS
// ============================================================================

export const gridStyles = {
  // 4-column metric grid
  metricGrid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
  
  // 2-column grid (cards, items)
  twoColGrid: "grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5",
  
  // 3-column grid
  threeColGrid: "grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5",
  
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
