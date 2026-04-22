import React from "react";

const PageHeader = (props) => {
  const { title, breadcrumb, children } = props;

  return (
    <div className="page-header mb-4">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          {/* Cek apakah breadcrumb itu array atau string */}
          {Array.isArray(breadcrumb) ? (
            breadcrumb.map((item, index) => (
              <li key={index} className="breadcrumb-item">{item}</li>
            ))
          ) : (
            <li className="breadcrumb-item">{breadcrumb}</li>
          )}
        </ol>
      </nav>
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="fw-bold">{title}</h2>
        <div className="header-actions">
          {/* Children digunakan untuk menampung tombol "Add Orders" atau "Add Customer" */}
          {children}
        </div>
      </div>
      <hr />
    </div>
  );
};

export default PageHeader;