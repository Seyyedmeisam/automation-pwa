import React from 'react';
import logo from './Instagram-Logo.png';
import moment from 'jalali-moment';
function PrintableView({ 
    created_date,
    mail_id,
    recive_name,
    recive_role,
    mail_title,
    mail_description,
    sender_name,
    sender_role,
 }) {

  return (
    <html>
      <head>
      <style>
          {`
            
  body {
    font-family: 'Tahoma', Arial, sans-serif;
    line-height: 1.6;
    text-align: justify;
    direction: rtl;
    margin: 0;
    padding: 0;
  }
  
  .print-container {
    width: 210mm;
    height: auto;
    margin: auto;
    padding: 20mm;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  .header {
    display: flex;
    
    justify-content: space-between;
    align-items: center;
    text-align: right;
  }
  .logo {
    margin-bottom: 20px;
    display: inline-block;
  }
  
  .logo img {
    max-width: 50mm;
    max-height: 50mm;
  }
  .ITNOG {
    font-size: 12px;
    font-weight: bold;
    margin-bottom: 20px;
    flex-grow: 1; /* Take up available space */
    flex-shrink: 0; /* Don't shrink */
    text-align: center;
  }
  .title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
  }
  
  .page {
    font-size: 16px;
    margin-bottom: 20px;
    padding-bottom: 30mm;
  }
  
  .date {
    text-align: right;
    font-size: 10px;
    margin-bottom: 10px;
  }
  
  .signature-text {
    text-align: center;
    font-size: 5mm;
    margin-top: 20mm;
    margin-left: 35mm;
    padding-right: 120mm;
  }
  .signature-image {
    text-align: left;
    margin-left: 5mm;
  }
  .signature-image img {
    max-width: 70mm;
    max-height: 60mm;
  }
  .repeating-div {
    
    top: 0;
    left: 0;
    width: 100%;
    height: 50px; /* Adjust height as needed */
    background-color: white; /* Match background color */
    
  }
  @media print {
    /* Hide browser-specific elements when printing */
    @page {
      size: A4;
      margin: 0;
    }
    .print-container {
      width: 210mm;
      height: 297mm;
  }
  @page A5{
    size: A5;
    margin: 0;
  }
  .print-container.a5 {
    width: 148mm;
    height: 210mm;
  }
  }
          `}
        </style>
      </head>
      <body>
        <div className="print-container">
          <div className="ITNOG"> بسمه تعالی</div>
          <div className="header">
            <div className="logo">
              <img src={logo} alt="Logo" />
            </div>
            <div className="date">
              تاریخ: {moment(created_date, 'YYYY-MM-DD HH:mm:ss').locale('fa').format('jYYYY/jMM/jDD')}
              <br />
              شماره: {mail_id}
            </div>
          </div>
          <div className="title"> {mail_title}</div>
          <div className="page">
            <p>با سلام و احترام</p>
            <p>جناب آقای {recive_name}</p>
            <p>{recive_role} اداره فلان</p>
            <p>{mail_description}</p>
          </div>
          <div className="signature">
            <div className="signature-text">امضا
            <br/>
            {sender_name}
            <br/>
            {sender_role}</div>
            <div className="signature-image">
              <img src={logo} alt="Signature" />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

export default PrintableView;
