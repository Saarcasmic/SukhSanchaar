# Invoice Generation - Amazon India Style

## Overview
This feature generates professional tax invoices in PDF format, styled similar to Amazon India invoices. The invoice includes all order details, customer information, tax breakdown, and payment information.

## Implementation

### Files Added/Modified

1. **`/client/src/utils/generateInvoice.ts`** - Main PDF generation utility
2. **`/client/src/pages/admin/Orders/OrderModal.tsx`** - Updated to include "Generate Bill" button
3. **`/client/src/types/jspdf-autotable.d.ts`** - TypeScript definitions for jsPDF

### Dependencies Installed
- `jspdf` - PDF generation library
- `jspdf-autotable` - Table plugin for jsPDF

## Usage

In the Admin Dashboard:
1. Navigate to the Orders section
2. Click on any order to open the Order Details modal
3. Click the **"Generate Bill"** button in the footer (green button with download icon)
4. The PDF will automatically download with filename format: `Invoice_[ORDER_NUMBER]_[DATE].pdf`

## Customization Guide

### 1. Update Company Information

Edit the `companyDetails` object in `/client/src/utils/generateInvoice.ts` (around line 76):

```typescript
const companyDetails = {
  name: "Your Company Name",
  address: "Your Address Line 1",
  city: "Your City - Pincode, Country",
  gstin: "YOUR_GSTIN_NUMBER",  // Update with actual GSTIN
  pan: "YOUR_PAN_NUMBER",      // Update with actual PAN
  state: "Your State",
  stateCode: "XX",             // State code (e.g., "07" for Delhi)
  email: "your-email@domain.com",
  phone: "+91-XXXXXXXXXX",
};
```

### 2. Modify Company Logo

To add your company logo:

1. Place your logo image in `/client/public/` directory
2. Update the logo section in `generateInvoice.ts` (around line 96):

```typescript
// Option 1: Using text-based logo (current implementation)
doc.setFontSize(20);
doc.text("Your Company Name", 15, currentY);

// Option 2: Using image logo (recommended)
// Uncomment and modify:
// const logoImg = '/your-logo.png';
// doc.addImage(logoImg, 'PNG', 15, currentY, 40, 15);
```

### 3. Customize HSN/SAC Codes

Update HSN codes for your products in the items table generation (around line 142):

```typescript
const tableData = order.items.map((item, index) => {
  return [
    // ...
    "30049099", // <- Change this to your product's HSN code
    // ...
  ];
});
```

### 4. Adjust GST Rates

Current implementation uses 18% GST (9% CGST + 9% SGST). To modify:

In `generateInvoice.ts`, search for `1.18` and update calculations:

```typescript
// Current: 18% GST
const itemTaxableValue = item.total_price / 1.18;

// For 12% GST, change to:
const itemTaxableValue = item.total_price / 1.12;

// Also update the tax display:
`9%\n₹${itemCgst.toFixed(2)}`  // Change "9%" to your rate
```

### 5. Modify Invoice Layout

#### Header Section
Edit the header section (around line 88) to change title or add additional information:

```typescript
doc.text("Tax Invoice/Bill of Supply/Cash Memo", 210 - 15, currentY, { align: "right" });
```

#### Table Columns
Modify the table structure in the `autoTable` configuration (around line 163):

```typescript
head: [[
  'Sl. No',
  'Description',
  'HSN/SAC',
  'Qty',
  'Gross Amount',
  'Taxable Value',
  'CGST',
  'SGST/UTGST',
  'Total Amount'
]],
```

#### Footer Text
Update the footer message (around line 281):

```typescript
doc.text("Thank you for your business!", 105, pageHeight - 20, { align: "center" });
doc.text("Your custom message here", 105, pageHeight - 15, { align: "center" });
```

### 6. Change Colors/Styling

#### Primary Color
Update the company name color (around line 99):

```typescript
doc.setTextColor(214, 58, 44); // RGB values - currently ayur-red
// Change to your brand color:
doc.setTextColor(R, G, B);
```

#### Table Header Background
Modify table header styling (around line 174):

```typescript
headStyles: {
  fillColor: [240, 240, 240],  // RGB for gray background
  textColor: [0, 0, 0],
  fontStyle: 'bold',
}
```

### 7. Add Additional Fields

To add custom fields (e.g., PO Number, Customer GST):

1. Update the Order interface to include new fields
2. Add them in the address section table:

```typescript
body: [
  [
    {
      content: `Sold By:\n...`,
    },
    {
      content: `Billing Address:\n...\n\nCustomer GSTIN: ${order.customer_gstin || 'N/A'}`,
    }
  ]
]
```

### 8. Multi-Currency Support

To support different currencies:

1. Add currency to the Order interface
2. Replace `₹` symbol with dynamic currency:

```typescript
const currencySymbol = order.currency || '₹';
`${currencySymbol}${item.total_price.toFixed(2)}`
```

## Features Included

✅ **Amazon India-style layout**
✅ **Automatic page numbering**
✅ **Tax breakdown (CGST/SGST)**
✅ **Amount in words (Indian number system)**
✅ **Payment information**
✅ **Professional table formatting**
✅ **Responsive column widths**
✅ **Multi-page support**
✅ **Automatic filename with order number and date**
✅ **Loading state during PDF generation**

## Technical Details

### PDF Specifications
- **Format**: A4 (210mm × 297mm)
- **Orientation**: Portrait
- **Margins**: 15mm (left/right), 20mm (top/bottom)
- **Font**: Helvetica (standard PDF font)
- **File Size**: Typically 50-150KB depending on order items

### Browser Compatibility
- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers

### Performance
- Generation time: < 1 second for typical orders
- No server dependency - fully client-side
- No external API calls required

## Troubleshooting

### PDF not downloading
- Check browser's download settings
- Ensure pop-ups are not blocked
- Check console for JavaScript errors

### Logo not showing
- Ensure logo path is correct
- Use absolute path or base64 encoded image
- Verify image format (PNG/JPEG recommended)

### Formatting issues
- Check that all order data is present
- Verify number formats are valid
- Ensure HSN codes are strings, not numbers

### TypeScript errors
- Ensure `jspdf` and `jspdf-autotable` are installed
- Check that type definitions file exists
- Run `npm install @types/jspdf` if needed

## Future Enhancements (Optional)

1. **Email Invoice**: Add email functionality to send invoice directly
2. **Multiple Templates**: Support different invoice templates
3. **Watermark**: Add "PAID" or "CANCELLED" watermarks
4. **QR Code**: Add payment QR code
5. **Digital Signature**: Include digital signature image
6. **Language Support**: Add multi-language invoice generation
7. **Custom Branding**: Allow theme customization per customer

## Support

For any issues or customization requests, refer to:
- jsPDF Documentation: https://github.com/parallax/jsPDF
- jsPDF AutoTable: https://github.com/simonbengtsson/jsPDF-AutoTable

## Version History

- **v1.0.0** (Current) - Initial Amazon India-style invoice implementation
  - Tax invoice format
  - CGST/SGST breakdown
  - Payment information
  - Amount in words
  - Professional table layout

