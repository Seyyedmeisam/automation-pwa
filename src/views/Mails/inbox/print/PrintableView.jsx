import React, { useEffect, useState } from 'react';
import logo from './Instagram-Logo.png';
import moment from 'jalali-moment';
function PrintableView({ 
    created_date,
    mail_id,
    page,
    recive_name,
    recive_role,
    mail_title,
    mail_description,
    sender_name,
    sender_role,
    signature,
    pageDetails
 }) {
  return (
    <html>
    <head>
    <style>
          {`
            
  
body {
  font-family: 'B Nazanin', Tahoma, Arial, sans-serif;
  line-height: 1.6;
  text-align: justify;
  direction: rtl;
  margin: 0;
  padding: 0;
}

.print-container {
  display: flex;
  flex-direction: column;
  width: ${pageDetails.width};
  height: ${pageDetails.height};
  margin: auto;
  padding: ${pageDetails.padding};
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
header{
  height: ${pageDetails.headerHeight};
  width: auto;
}
.page {
  font-size: 16px;
  width: auto;
  height: ${pageDetails.pageHeight};
  text-wrap: wrap;
  overflow-wrap: break-word;
}
footer {
  height: ${pageDetails.footerHeight};
  width: auto;
}
.logo {
  margin-bottom: ${pageDetails.logoMarginBottom};
  display: inline-block;
}

.logo img {
  max-width: ${pageDetails.logoImgMaxWidth};
  max-height: ${pageDetails.logoImgMaxHeight};
}
.ITNOG {
  font-size: 16px;
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



.date {
  text-align: right;
  font-size: 12px;
  margin-bottom: 10px;
  width: ${pageDetails.dateWidth};
}

.signature-text {
  text-align: center;
  font-size: 5mm;
  margin-top: 5mm;
  margin-left: ${pageDetails.signatureTextMarginLeft};
  margin-right: ${pageDetails.signatureTextMarginRight};
}
.signature-image {
  text-align: left;
  margin-left: 5mm;
}
.signature-image img {
  max-width: ${pageDetails.signatureImageMaxWidth};
  max-height: ${pageDetails.signatureImageMaxheight};
}

@page {
}

@media print {
  @page {
    size: ${pageDetails.type};
    margin: 0;
  }
  body {
    margin: 0;
    width: ${pageDetails.type};
    height: ${pageDetails.type};
  }
}
          `}
        </style>
    </head>
    <body>
      <div className="print-container">
        <header>
          <div className="ITNOG"> بسمه تعالی</div>
          <div className="header">
            <div className="logo">
              <img src={logo} alt="Logo" />
            </div>
            <div className="date">
              تاریخ: {moment(created_date, 'YYYY-MM-DD HH:mm:ss').locale('fa').format('jYYYY/jMM/jDD')} 
              <br />
              شماره: {mail_id}
              <br />
              صفحه: {page}
            </div>
          </div>
        </header>
        
        <div className="page">
        {page == 1 ?(
          <div>
            <div className="title"> {mail_title}</div>
              <p>با سلام و احترام</p>
              <p>جناب آقای {recive_name}</p>
              <p>{recive_role} اداره فلان</p>
              <div className="description">
                <div dangerouslySetInnerHTML={{ __html: mail_description }}></div>
              </div>
          </div>
        ):(
          <div>
            <br/>
            <br/>
            <br/>
            <br/>
            <div className="description">
              <div dangerouslySetInnerHTML={{ __html: mail_description }}></div>
            </div>
          </div>
          )}
        </div>
        <footer>
          <div className="signature">
            <div className="signature-text">امضا
            <br/>
            {sender_name}
            <br/>
            {sender_role}</div>
            <div className="signature-image">
              {/* {console.log('signature :: ',signature)} */}
              <img src={signature} alt="Signature" />

            </div>
          </div>
        </footer>
      </div>
    </body>
    <div style={{ pageBreakBefore: 'always' }}></div>
  </html>
  
  );
}

export default PrintableView;
