# Manager Function Module - Design System Guide

This guide provides all the exact CSS/Tailwind utilities needed to maintain consistent styling across all Manager Function screens.

## Quick Reference: Tailwind Classes to Use

### 1. BACKGROUND & COLOR
```
Background:     bg-white (primary), bg-gray-50 (secondary)
Borders:        border border-gray-200 (dark), border-gray-100 (light)
Text Colors:    text-gray-900 (dark), text-gray-700 (body), text-gray-600 (muted)
```

### 2. TYPOGRAPHY SIZES & WEIGHTS
```
Page Title:     text-2xl font-semibold (20-22px)
Section Title:  text-lg font-medium (16-18px)
Body Text:      text-sm (14px)
Small Text:     text-xs (12px)
Labels:         text-sm font-medium
```

### 3. SPACING & PADDING
```
Page Container:    px-6 py-6
Section Padding:   p-4 md:p-5
Card Padding:      p-4 md:p-5
Table Row Padding: px-4 py-3
Gap Between Items: gap-4 md:gap-5
Margins:           mb-6 (large), mb-4 (medium), mb-2 (small)
```

### 4. CARDS & CONTAINERS
```
// Card with border
<div className="bg-white rounded-md p-4 border border-gray-200">

// Card with hover effect
<div className="bg-white rounded-md p-4 border border-gray-200 hover:border-gray-300 transition-colors">

// Header section
<div className="bg-white border-b border-gray-200">

// Content wrapper
<div className="max-w-7xl mx-auto px-6 py-6">
```

### 5. TABS STYLING
```
// Tab container
<div className="flex gap-6 mb-6 border-b border-gray-200">

// Active tab button
<button className="pb-4 text-sm font-medium border-b-2 border-blue-600 text-gray-900">

// Inactive tab button
<button className="pb-4 text-sm font-medium border-b-2 border-transparent text-gray-600 hover:text-gray-900">
```

### 6. BUTTONS
```
// Primary button (blue)
<button className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md h-8 text-xs px-3">

// Secondary button (outline)
<button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium rounded-md h-8 text-xs px-3">

// Ghost button (minimal)
<button className="text-gray-700 hover:bg-gray-100 font-medium rounded-md h-8 text-xs px-3">
```

### 7. BADGES & STATUS INDICATORS
```
// Success badge
<span className="inline-block px-3 py-1 rounded-md text-xs font-medium bg-green-100 text-green-800">

// Warning badge
<span className="inline-block px-3 py-1 rounded-md text-xs font-medium bg-yellow-100 text-yellow-800">

// Error badge
<span className="inline-block px-3 py-1 rounded-md text-xs font-medium bg-red-100 text-red-800">

// Info badge
<span className="inline-block px-3 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800">
```

### 8. TABLES
```
// Table wrapper
<div className="bg-white rounded-md border border-gray-200 overflow-hidden">
  <table className="w-full">
    {/* Header */}
    <thead className="bg-gray-50 border-b border-gray-200">
      <tr>
        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900">
    </thead>
    {/* Body */}
    <tbody className="divide-y divide-gray-100">
      <tr className="hover:bg-gray-50 transition-colors">
        <td className="px-4 py-3 text-sm text-gray-700">
```

### 9. METRIC CARDS
```
// Metric card container
<div className="bg-white rounded-md p-4 border border-gray-200">
  {/* Label */}
  <h3 className="text-sm font-medium text-gray-700 mb-2">
  {/* Value */}
  <p className="text-3xl font-bold text-gray-900 mb-3">
  {/* Subtitle */}
  <p className="text-sm text-gray-600">
```

### 10. ICONS
```
Small icon:     w-4 h-4 (16px)
Medium icon:    w-5 h-5 (20px)
Large icon:     w-6 h-6 (24px)

Colors:
Default:        text-gray-400
Active:         text-blue-600
Muted:          text-gray-500
```

### 11. FORM INPUTS
```
// Input field
<input className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-8">

// Select/dropdown button
<button className="flex items-center gap-2 px-2 py-1 border border-gray-300 rounded-md bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 h-8">
```

---

## Complete Page Template

Use this as a template for all Manager Function pages:

```tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { 
  layoutStyles, 
  typographyStyles, 
  componentStyles,
  gridStyles,
  getTabButtonClasses 
} from "@/lib/styles";

export default function YourPage() {
  const [activeTab, setActiveTab] = useState("tab-1");

  return (
    <Layout>
      <div className={layoutStyles.pageWrapper}>
        {/* Header Section */}
        <div className={componentStyles.headerSection}>
          <div className={componentStyles.headerContainer}>
            <div className={`flex items-start justify-between mb-6`}>
              <div>
                <h1 className={typographyStyles.pageTitle}>
                  Page Title
                </h1>
                <p className={typographyStyles.pageSubtitle}>
                  Page description
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" className="gap-2 h-8 text-sm px-3">
                  Action 1
                </Button>
                <Button className="gap-2 bg-blue-600 hover:bg-blue-700 h-8 text-sm px-3">
                  Action 2
                </Button>
              </div>
            </div>

            {/* Filters if needed */}
            <div className="flex items-center gap-2">
              {/* Search, filters, etc. */}
            </div>
          </div>
        </div>

        {/* Metric Cards Section */}
        <div className={layoutStyles.contentContainer}>
          <div className={gridStyles.metricGrid + " mb-6"}>
            {/* MetricCard components */}
          </div>

          {/* Tabs */}
          <div className={componentStyles.tabContainer}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={getTabButtonClasses(activeTab === tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="space-y-4">
            {activeTab === "tab-1" && (
              <div className={componentStyles.card}>
                <h2 className={typographyStyles.sectionTitle}>
                  Section Title
                </h2>
                <p className={typographyStyles.sectionSubtitle}>
                  Description
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
```

---

## Spacing Guide

**Vertical Spacing:**
- Between page sections: `mb-6`
- Between cards/items: `mb-4`
- Between elements within card: `mb-2`
- Between text lines: Natural line-height

**Horizontal Spacing:**
- Page padding: `px-6`
- Card padding: `p-4`
- Gap between items: `gap-4`
- Icon to text: `gap-2`

**Border Radius:**
- Cards: `rounded-md` (6px)
- Buttons: `rounded-md` (6px)
- Inputs: `rounded-md` (6px)
- Badges: `rounded-md` (6px)

---

## Color Palette

```
Primary:        blue-600 (#2563eb) - Use for active elements, buttons
Gray Scale:
  Dark:         gray-900 (#111827) - Headings, strong text
  Body:         gray-700 (#374151) - Body text
  Muted:        gray-600 (#4b5563) - Secondary text
  Light:        gray-400 (#9ca3af) - Icons, placeholders
  Lightest:     gray-200 (#e5e7eb) - Borders

Status Colors:
  Success:      green-100/800 - Positive actions
  Warning:      yellow-100/800 - Caution items
  Error:        red-100/800 - Errors, deletions
  Info:         blue-100/800 - Information
```

---

## How to Import Styles in Your Component

```tsx
import { 
  layoutStyles, 
  typographyStyles, 
  componentStyles,
  gridStyles,
  getTabButtonClasses,
  getBadgeClasses
} from "@/lib/styles";

// Usage:
<div className={layoutStyles.pageWrapper}>
<h1 className={typographyStyles.pageTitle}>
<button className={getTabButtonClasses(isActive)}>
<span className={getBadgeClasses("success")}>
```

---

## Common Class Combinations

```
// Page container
"max-w-7xl mx-auto px-6 py-6"

// Section header with border
"bg-white border-b border-gray-200 px-6 py-6"

// Tab area
"flex gap-6 mb-6 border-b border-gray-200"

// Card/panel
"bg-white rounded-md p-4 border border-gray-200"

// Grid of 4 cards
"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"

// Spacing between elements
"space-y-4" or "space-y-3"
```

---

## Responsive Design Notes

- Use `md:` prefix for tablet and above
- Use `lg:` prefix for desktop and above
- Mobile-first approach: Start with mobile styles, add responsive overrides

Examples:
```
text-lg md:text-xl          // smaller on mobile, larger on tablet+
grid-cols-1 md:grid-cols-2  // 1 column mobile, 2 columns tablet+
px-4 md:px-6                // less padding mobile, more on tablet+
```

---

## Quick Wins for Updating Pages

1. **Replace page backgrounds:** Change all `bg-gray-50` to `bg-white`
2. **Update card styling:** Use `bg-white rounded-md p-4 border border-gray-200`
3. **Fix typography:** Use the provided page title, section title, and body text classes
4. **Standardize spacing:** Use `mb-6`, `mb-4`, `gap-4` consistently
5. **Tab styling:** Use `flex gap-6 mb-6 border-b border-gray-200` for container
6. **Remove shadows:** Delete all `shadow-sm`, `shadow-md` classes
7. **Clean borders:** Use `border-gray-200` for dark, `border-gray-100` for light

