import React from "react";

const PageHeader = ({ title, breadcrumb, children }) => {
  return (
    <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 border-b border-gray-100 pb-6">
      <div>
        {/* Breadcrumb Section */}
        <nav className="flex text-sm text-gray-500 mb-1" aria-label="Breadcrumb">
          {Array.isArray(breadcrumb) ? (
            breadcrumb.map((item, index) => (
              <React.Fragment key={index}>
                <span className="hover:text-green-600 cursor-pointer transition-colors">
                  {item}
                </span>
                {index < breadcrumb.length - 1 && (
                  <span className="mx-2 text-gray-300">/</span>
                )}
              </React.Fragment>
            ))
          ) : (
            <span className="text-gray-400">{breadcrumb}</span>
          )}
        </nav>

        {/* Title Section */}
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          {title}
        </h1>
      </div>

      {/* Action Button Section (Children) */}
      <div className="flex items-center">
        {children}
      </div>
    </div>
  );
};

export default PageHeader;