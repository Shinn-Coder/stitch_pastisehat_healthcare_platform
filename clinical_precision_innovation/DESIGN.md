---
name: Clinical Precision & Innovation
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#434656'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#747688'
  outline-variant: '#c4c5d9'
  surface-tint: '#124af0'
  primary: '#0040e0'
  on-primary: '#ffffff'
  primary-container: '#2e5bff'
  on-primary-container: '#efefff'
  inverse-primary: '#b8c3ff'
  secondary: '#4648d4'
  on-secondary: '#ffffff'
  secondary-container: '#6063ee'
  on-secondary-container: '#fffbff'
  tertiary: '#5d41ab'
  on-tertiary: '#ffffff'
  tertiary-container: '#765ac5'
  on-tertiary-container: '#f5edff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dde1ff'
  primary-fixed-dim: '#b8c3ff'
  on-primary-fixed: '#001356'
  on-primary-fixed-variant: '#0035be'
  secondary-fixed: '#e1e0ff'
  secondary-fixed-dim: '#c0c1ff'
  on-secondary-fixed: '#07006c'
  on-secondary-fixed-variant: '#2f2ebe'
  tertiary-fixed: '#e8ddff'
  tertiary-fixed-dim: '#cebdff'
  on-tertiary-fixed: '#21005e'
  on-tertiary-fixed-variant: '#4f319c'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-bold:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-tablet: 32px
  margin-mobile: 16px
---

## Brand & Style

This design system embodies the intersection of rigorous science and futuristic medical technology. It is designed for high-stakes biotech environments where clarity, speed of data interpretation, and professional trust are paramount. The aesthetic is "Advanced Clinical"—merging the sterile reliability of a laboratory with the cutting-edge interface of genomic sequencing software.

The visual direction utilizes **Glassmorphism** as a functional tool rather than just a decorative one, using translucent layers to maintain context in complex data visualizations. The interface should feel airy, expensive, and hyper-modern, evoking the emotional response of a premium, personalized health concierge. High-contrast white surfaces provide a "sanitary" foundation, while vibrant gradients suggest the energy of biological life and technological progress.

## Colors

The palette is anchored by **Electric Blue** (Primary), symbolizing precision and digital health. **Deep Indigo** is reserved for high-level data hierarchy and text to ensure a grounded, professional feel. **Soft Lavender** serves as a secondary accent to soften the clinical edge, providing a humanistic touch typical of modern DNA services.

*   **Primary Surface:** Pure white (#FFFFFF) is the standard for cards and main containers to ensure a high-contrast, sterile look.
*   **Gradients:** Use subtle, 135-degree linear gradients for primary buttons, active states, and data visualizations.
*   **Backgrounds:** Use ultra-light indigo tints (#F8FAFC) for background sections to distinguish them from the white interactive surfaces.

## Typography

This design system utilizes a dual-font approach to balance technical innovation with readability. 

**Space Grotesk** is used for all headlines and display text. Its geometric, slightly technical personality reinforces the biotech narrative. Headlines should be bold and tightly tracked to create a confident, impactful visual hierarchy.

**Manrope** is the workhorse for body text and labels. Its clean, balanced proportions ensure high legibility for complex medical reports or genetic data. Line heights are generous to prevent visual fatigue during long reading sessions. Use all-caps sparingly for labels (e.g., table headers) to emphasize the systematic nature of the data.

## Layout & Spacing

The layout philosophy follows a **Fixed-Fluid hybrid grid**. Content is contained within a 1280px max-width wrapper on desktop to maintain readability, but utilizes fluid percentages for internal column widths. 

The spacing rhythm is built on an **8px base unit**. Margins are expansive, creating a sense of "premium breathing room" that mimics high-end clinical spaces. 

*   **Desktop (1200px+):** 12 columns, 24px gutters, 64px outer margins.
*   **Tablet (768px - 1199px):** 8 columns, 20px gutters, 32px outer margins.
*   **Mobile (under 768px):** 4 columns, 16px gutters, 16px outer margins.

## Elevation & Depth

Depth is achieved through **multi-layered glassmorphism**. Rather than traditional heavy shadows, the design system uses:

1.  **Backdrop Blurs:** Surfaces use a 12px to 20px blur radius with a semi-transparent white fill (opacity 70–85%).
2.  **Inner Glows:** A 1px white border with 40% opacity on the top and left edges to simulate light hitting glass.
3.  **Ambient Shadows:** Soft, highly diffused shadows using a tint of the Deep Indigo (#1E1B4B) at 4–8% opacity. This creates a "lifted" effect without looking "dirty" or muddy.
4.  **Z-Axis Hierarchy:** Background elements are flat, while interactive cards have a low elevation, and modals/popovers have the highest elevation with a more pronounced blur.

## Shapes

The shape language is defined by large, welcoming radii that offset the potentially cold nature of medical data. 

*   **Standard Components:** Buttons and input fields use a 12px radius.
*   **Main Containers:** Feature cards and dashboard widgets use a 24px radius (rounded-xl) to emphasize the friendly, "human-centric" clinical feel.
*   **Data Indicators:** Progress bars and status chips use a full pill shape (999px) to contrast against the more structured rectangular layout.

## Components

### Buttons
Primary buttons utilize the **Electric-to-Indigo gradient**. On hover, the gradient should slightly shift or brighten. Text is white, semi-bold Manrope. Secondary buttons use a transparent background with a 1px Electric Blue border and the glass blur effect.

### Cards
Cards are the primary structural unit. They must have a white background (80% opacity), a 1px subtle border (#E2E8F0), and a 24px corner radius. Content inside cards should follow the 24px internal padding rule.

### Input Fields
Inputs should be minimalist: a light gray background (#F1F5F9) that turns white on focus with a 2px Electric Blue border. Labels should be "Label-bold" and positioned above the field.

### Status Chips
Use high-saturation background tints with dark text for status indicators (e.g., "Complete," "Processing," "Action Required"). These are always pill-shaped and use the "Label-sm" typography.

### Data Visualizations
Charts should use the primary and secondary colors (Blue and Purple) as the main data lines. Use gradients for area charts to reinforce the depth of the overall system. DNA sequence visualizations should use high-contrast vibrant colors against the clean white surfaces.

### Imagery
Use high-key, bright photography of scientists, labs, and futuristic hardware. Images should have a cool color temperature and, where possible, be integrated into the glassmorphism layout with subtle masking.