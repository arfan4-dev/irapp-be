export const INVOICE_TEMPLATE = (invoiceDetails) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invoice</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #F8F8F8;
      color: #282F5A;
      margin: 0;
      padding: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .invoice-container {
      background-color: #FFFFFF;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      max-width: 800px;
      padding: 20px;
      margin: 0 auto;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 20px;
      border-bottom: 1px solid #E0E0E0;
    }

    .header .logo {
      font-size: 24px;
      font-weight: bold;
      color: #282F5A;
    }

    .header .invoice-details {
      text-align: right;
      color: #555555;
    }

    .header .invoice-details .status {
      background-color: #28a745;
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
    }

    .contact-info {
      display: flex;
      justify-content: space-between;
      padding: 20px 0;
      font-size: 14px;
    }

    .contact-info div {
      width: 48%;
    }

    .contact-info div h4 {
      margin-bottom: 8px;
      font-size: 16px;
      color: #282F5A;
    }

    .product-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }

    .product-table th, .product-table td {
      padding: 12px;
      border-bottom: 1px solid #E0E0E0;
      text-align: center;
      font-size: 14px;
    }

    .product-table th {
      background-color: #282F5A;
      color: white;
      font-weight: bold;
    }

    .totals {
      margin-top: 20px;
      font-size: 14px;
      color: #555555;
      text-align: right;
    }

    .totals div {
      margin-bottom: 4px;
    }

    .totals .grand-total {
      font-weight: bold;
      color: #282F5A;
      font-size: 16px;
    }

    .footer-note {
      background-color: #ffe9e9;
      color: #c0392b;
      border-radius: 4px;
      padding: 10px;
      font-size: 12px;
      text-align: center;
      margin-top: 20px;
    }

    .actions {
      text-align: center;
      margin-top: 20px;
    }

    .actions button {
      background-color: #282F5A;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 4px;
      font-size: 14px;
      cursor: pointer;
      margin: 0 10px;
    }

    .actions button:hover {
      background-color: #1f234a;
    }
  </style>
</head>
<body>

  <div class="invoice-container">
    <div class="header">
      <div class="logo">Your Company</div>
      <div class="invoice-details">
        <div>Invoice #: ${invoiceDetails?.invoiceNumber}</div>
        <div>Date: ${invoiceDetails?.date}</div>
        <div class="status">Status: ${invoiceDetails?.status}</div>
      </div>
    </div>

    <div class="contact-info">
      <div>
        <h4>Bill To:</h4>
        <div>${invoiceDetails?.clientName}</div>
        <div>${invoiceDetails?.clientAddress}</div>
        <div>${invoiceDetails?.clientEmail}</div>
      </div>
      <div>
        <h4>Ship To:</h4>
        <div>${invoiceDetails?.shippingName}</div>
        <div>${invoiceDetails?.shippingAddress}</div>
        <div>${invoiceDetails?.shippingEmail}</div>
      </div>
    </div>

    <table class="product-table">
      <thead>
        <tr>
          <th>Item</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        ${invoiceDetails?.items?.map(item => `
          <tr>
            <td>${item?.name}</td>
            <td>${item?.quantity}</td>
            <td>${item?.price}</td>
            <td>${item?.total}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <div class="totals">
      <div>Subtotal: ${invoiceDetails?.subtotal}</div>
      <div>Tax: ${invoiceDetails?.tax}</div>
      <div class="grand-total">Grand Total: ${invoiceDetails?.grandTotal}</div>
    </div>

    <div class="footer-note">
      Note: This invoice is generated automatically and does not require a signature.
    </div>

    <div class="actions">
      <button onclick="window.print()">Print Invoice</button>
      <button onclick="window.location.href='/payment'">Pay Now</button>
    </div>
  </div>

</body>
</html>
`;
