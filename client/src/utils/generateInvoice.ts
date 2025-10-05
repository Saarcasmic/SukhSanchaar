import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  items: Array<{
    product_id: string;
    product_name: string;
    product_image: string;
    quantity: number;
    unit_price: number;
    total_price: number;
  }>;
  subtotal: number;
  tax_amount: number;
  shipping_amount: number;
  total_amount: number;
  payment_status: "pending" | "paid" | "failed" | "refunded";
  order_status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  payment_method: string;
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  created_at: string;
}

// Convert number to words (Indian system)
const numberToWords = (num: number): string => {
  const ones = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
  ];
  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];
  const teens = [
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];

  if (num === 0) return "Zero";

  const convertLessThanThousand = (n: number): string => {
    if (n === 0) return "";
    if (n < 10) return ones[n];
    if (n < 20) return teens[n - 10];
    if (n < 100)
      return (
        tens[Math.floor(n / 10)] + (n % 10 !== 0 ? " " + ones[n % 10] : "")
      );
    return (
      ones[Math.floor(n / 100)] +
      " Hundred" +
      (n % 100 !== 0 ? " and " + convertLessThanThousand(n % 100) : "")
    );
  };

  if (num < 1000) return convertLessThanThousand(num);
  if (num < 100000) {
    const thousands = Math.floor(num / 1000);
    const remainder = num % 1000;
    return (
      convertLessThanThousand(thousands) +
      " Thousand" +
      (remainder !== 0 ? " " + convertLessThanThousand(remainder) : "")
    );
  }
  if (num < 10000000) {
    const lakhs = Math.floor(num / 100000);
    const remainder = num % 100000;
    return (
      convertLessThanThousand(lakhs) +
      " Lakh" +
      (remainder !== 0 ? " " + numberToWords(remainder) : "")
    );
  }
  const crores = Math.floor(num / 10000000);
  const remainder = num % 10000000;
  return (
    convertLessThanThousand(crores) +
    " Crore" +
    (remainder !== 0 ? " " + numberToWords(remainder) : "")
  );
};

export const generateInvoicePDF = async (order: Order) => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // Company Details (You can update these with actual company info)
  const companyDetails = {
    name: "SukhSanchaar Ayurvedic Products",
    address: "Plot No. 123, Industrial Area",
    city: "New Delhi - 110001, India",
    gstin: "07XXXXX1234X1ZX",
    pan: "XXXXX1234X",
    state: "Delhi",
    stateCode: "07",
    email: "info@sukhsanchaar.com",
    phone: "+91-XXXXXXXXXX",
  };

  // Date formatting
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  let currentY = 15;

  // === HEADER SECTION ===
  // Company Logo/Name (Left side)
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(214, 58, 44); // Ayur-red color
  doc.text("SukhSanchaar", 15, currentY);

  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(0, 0, 0);
  doc.text("Ayurvedic Products", 15, currentY + 5);

  // Title (Right side)
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Tax Invoice/Bill of Supply/Cash Memo", 210 - 15, currentY, {
    align: "right",
  });

  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  doc.text("(Original for Recipient)", 210 - 15, currentY + 5, {
    align: "right",
  });

  currentY += 15;

  // Horizontal line
  doc.setLineWidth(0.5);
  doc.line(15, currentY, 195, currentY);
  currentY += 5;

  // === SELLER AND BILLING ADDRESS SECTION ===
  // Create a table for Seller and Billing/Shipping info
  autoTable(doc, {
    startY: currentY,
    head: [],
    body: [
      [
        {
          content: `Sold By:\n${companyDetails.name}\n${companyDetails.address}\n${companyDetails.city}\n\nGSTIN: ${companyDetails.gstin}\nPAN No: ${companyDetails.pan}\nState: ${companyDetails.state}, Code: ${companyDetails.stateCode}`,
          styles: {
            fontSize: 8,
            cellPadding: 3,
            overflow: "linebreak",
            valign: "top",
          },
        },
        {
          content: `Billing Address:\n${order.customer_name}\n${order.shipping_address.street}\n${order.shipping_address.city}, ${order.shipping_address.state}\n${order.shipping_address.pincode}, ${order.shipping_address.country}\n\nState: ${order.shipping_address.state}`,
          styles: {
            fontSize: 8,
            cellPadding: 3,
            overflow: "linebreak",
            valign: "top",
          },
        },
      ],
      [
        {
          content: `Shipping Address:\n${order.customer_name}\n${order.shipping_address.street}\n${order.shipping_address.city}, ${order.shipping_address.state}\n${order.shipping_address.pincode}, ${order.shipping_address.country}\n\nPlace of Supply: ${order.shipping_address.state}\nPlace of Delivery: ${order.shipping_address.state}`,
          styles: {
            fontSize: 8,
            cellPadding: 3,
            overflow: "linebreak",
            valign: "top",
          },
        },
        {
          content: `Order Number: ${order.order_number || order.id}\nOrder Date: ${formatDate(order.created_at)}\n\nInvoice Number: INV-${order.order_number || order.id}\nInvoice Details: DL1-${order.id.substring(0, 8)}\nInvoice Date: ${formatDate(order.created_at)}`,
          styles: {
            fontSize: 8,
            cellPadding: 3,
            overflow: "linebreak",
            valign: "top",
          },
        },
      ],
    ],
    theme: "grid",
    styles: {
      lineColor: [0, 0, 0],
      lineWidth: 0.1,
      overflow: "linebreak",
      valign: "top",
    },
    columnStyles: {
      0: { cellWidth: 90 },
      1: { cellWidth: 90 },
    },
  });

  // @ts-ignore
  currentY = doc.lastAutoTable.finalY + 5;

  // === ITEMS TABLE ===
  const tableData = order.items.map((item, index) => {
    const itemTaxableValue = item.total_price / 1.18; // Assuming 18% GST
    const itemTax = item.total_price - itemTaxableValue;
    const itemCgst = itemTax / 2;
    const itemSgst = itemTax / 2;

    return [
      (index + 1).toString(),
      `${item.product_name}\nProduct ID: ${item.product_id}`,
      "30049099", // HSN code for Ayurvedic products
      item.quantity.toString(),
      `₹${item.total_price.toFixed(2)}`,
      `₹${itemTaxableValue.toFixed(2)}`,
      `9%\n₹${itemCgst.toFixed(2)}`,
      `9%\n₹${itemSgst.toFixed(2)}`,
      `₹${item.total_price.toFixed(2)}`,
    ];
  });

  // Add shipping as a line item if > 0
  if (order.shipping_amount > 0) {
    const shippingTaxable = order.shipping_amount / 1.18;
    const shippingTax = order.shipping_amount - shippingTaxable;
    const shippingCgst = shippingTax / 2;
    const shippingSgst = shippingTax / 2;

    tableData.push([
      (order.items.length + 1).toString(),
      "Shipping Charges",
      "996819", // HSN for shipping
      "1",
      `₹${order.shipping_amount.toFixed(2)}`,
      `₹${shippingTaxable.toFixed(2)}`,
      `9%\n₹${shippingCgst.toFixed(2)}`,
      `9%\n₹${shippingSgst.toFixed(2)}`,
      `₹${order.shipping_amount.toFixed(2)}`,
    ]);
  }

  autoTable(doc, {
    startY: currentY,
    head: [
      [
        "Sl. No",
        "Description",
        "HSN/SAC",
        "Qty",
        "Gross Amount",
        "Taxable Value",
        "CGST",
        "SGST/UTGST",
        "Total Amount",
      ],
    ],
    body: tableData,
    theme: "grid",
    styles: {
      fontSize: 7,
      cellPadding: 2,
      lineColor: [0, 0, 0],
      lineWidth: 0.1,
      overflow: "linebreak",
      valign: "middle",
      minCellHeight: 8,
    },
    headStyles: {
      fillColor: [240, 240, 240],
      textColor: [0, 0, 0],
      fontStyle: "bold",
      halign: "center",
      valign: "middle",
    },
    columnStyles: {
      0: { cellWidth: 12, halign: "center", valign: "middle" },
      1: {
        cellWidth: 50,
        halign: "left",
        valign: "middle",
        overflow: "linebreak",
      },
      2: { cellWidth: 18, halign: "center", valign: "middle" },
      3: { cellWidth: 12, halign: "center", valign: "middle" },
      4: {
        cellWidth: 20,
        halign: "left",
        valign: "middle",
        overflow: "linebreak",
      },
      5: {
        cellWidth: 22,
        halign: "left",
        valign: "middle",
        overflow: "linebreak",
      },
      6: { cellWidth: 18, halign: "center", valign: "middle" },
      7: { cellWidth: 18, halign: "center", valign: "middle" },
      8: {
        cellWidth: 25,
        halign: "left",
        fontStyle: "bold",
        valign: "middle",
        overflow: "linebreak",
      },
    },
  });

  // @ts-ignore
  currentY = doc.lastAutoTable.finalY + 2;

  // === TOTAL SECTION ===
  autoTable(doc, {
    startY: currentY,
    body: [
      [
        "TOTAL:",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        `₹${order.total_amount.toFixed(2)}`,
      ],
    ],
    theme: "grid",
    styles: {
      fontSize: 8,
      fontStyle: "bold",
      cellPadding: 2,
      lineColor: [0, 0, 0],
      lineWidth: 0.1,
      overflow: "linebreak",
      valign: "middle",
    },
    columnStyles: {
      0: { cellWidth: 12, halign: "right", valign: "middle" },
      1: { cellWidth: 50, valign: "middle" },
      2: { cellWidth: 18, valign: "middle" },
      3: { cellWidth: 12, valign: "middle" },
      4: { cellWidth: 20, valign: "middle" },
      5: { cellWidth: 22, valign: "middle" },
      6: { cellWidth: 18, valign: "middle" },
      7: { cellWidth: 18, valign: "middle" },
      8: {
        cellWidth: 25,
        halign: "left",
        fillColor: [240, 240, 240],
        valign: "middle",
        overflow: "linebreak",
      },
    },
  });

  // @ts-ignore
  currentY = doc.lastAutoTable.finalY + 3;

  // === AMOUNT IN WORDS ===
  const amountInWords = numberToWords(Math.floor(order.total_amount));
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text(`Amount in Words:`, 15, currentY);
  doc.setFont("helvetica", "normal");
  doc.text(`${amountInWords} Rupees Only`, 15, currentY + 4);

  currentY += 10;

  // === PAYMENT INFORMATION ===
  if (currentY > 240) {
    doc.addPage();
    currentY = 20;
  }

  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("Payment Information:", 15, currentY);
  currentY += 5;

  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text(`Payment Method: ${order.payment_method}`, 15, currentY);
  currentY += 4;
  doc.text(
    `Payment Status: ${order.payment_status.toUpperCase()}`,
    15,
    currentY,
  );
  currentY += 4;

  if (order.razorpay_payment_id) {
    doc.text(`Transaction ID: ${order.razorpay_payment_id}`, 15, currentY);
    currentY += 4;
  }

  if (order.razorpay_order_id) {
    doc.text(`Razorpay Order ID: ${order.razorpay_order_id}`, 15, currentY);
    currentY += 4;
  }

  currentY += 5;

  // === FOOTER ===
  // Company signature
  if (currentY > 250) {
    doc.addPage();
    currentY = 20;
  }

  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text("For " + companyDetails.name + ":", 15, currentY);
  currentY += 15;
  doc.setFont("helvetica", "normal");
  doc.text("Authorized Signatory", 15, currentY);

  // === FOOTER TEXT ===
  const pageHeight = doc.internal.pageSize.height;
  doc.setFontSize(7);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(100, 100, 100);
  doc.text("Thank you for your business!", 105, pageHeight - 20, {
    align: "center",
  });
  doc.text(
    "This is a computer-generated invoice and does not require a physical signature.",
    105,
    pageHeight - 15,
    { align: "center" },
  );
  doc.text(
    `For queries, contact: ${companyDetails.email} | ${companyDetails.phone}`,
    105,
    pageHeight - 10,
    { align: "center" },
  );

  // Add page numbers
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(`Page ${i} of ${pageCount}`, 210 - 15, pageHeight - 5, {
      align: "right",
    });
  }

  // === SAVE THE PDF ===
  const fileName = `Invoice_${order.order_number || order.id}_${formatDate(order.created_at).replace(/\s/g, "_")}.pdf`;
  doc.save(fileName);
};
