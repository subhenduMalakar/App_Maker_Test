import React from 'react';
import { Helmet } from 'react-helmet-async';
import privacyPolicyPageData from "@/data/pages/PrivacyPolicy.json";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>{privacyPolicyPageData.pageTitle}</title>
        <meta name="description" content={privacyPolicyPageData.metaDescription} />
      </Helmet>
      <h1 className="text-3xl font-bold mb-6">{privacyPolicyPageData.mainHeading}</h1>
      <div className="text-gray-800 space-y-4 prose max-w-none" dangerouslySetInnerHTML={{ __html: privacyPolicyPageData.sections.map(section => `<h2>${section.heading}</h2>${section.paragraphs.map(p => `<p>${p}</p>`).join('')}`).join('') + `<h3>Contact Us</h3><p>${privacyPolicyPageData.contactText}</p><p>Email: ${privacyPolicyPageData.contactEmail}</p>` }} />
    </div>
  );
};

export default PrivacyPolicy;