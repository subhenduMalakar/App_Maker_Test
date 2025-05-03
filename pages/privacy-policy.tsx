import React from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import privacyPolicyPageData from "@/data/pages/PrivacyPolicy.json";

interface PrivacyPolicyProps {
  privacyPolicyPageData: any; // Replace 'any' with the actual type of your data
}

const PrivacyPolicy = ({ privacyPolicyPageData }: PrivacyPolicyProps) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>{privacyPolicyPageData.pageTitle}</title>
        <meta name="description" content={privacyPolicyPageData.metaDescription} />
      </Head>
      <h1 className="text-3xl font-bold mb-6">{privacyPolicyPageData.mainHeading}</h1>
      <div className="text-gray-800 space-y-4 prose max-w-none" dangerouslySetInnerHTML={{ __html: privacyPolicyPageData.sections.map(section => `<h2>${section.heading}</h2>${section.paragraphs.map(p => `<p>${p}</p>`).join('')}`).join('') + `<h3>Contact Us</h3><p>${privacyPolicyPageData.contactText}</p><p>Email: ${privacyPolicyPageData.contactEmail}</p>` }} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const fs = require('fs');
  const path = require('path');

  const filePath = path.join(process.cwd(), 'src/data/pages/PrivacyPolicy.json');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const privacyPolicyPageData = JSON.parse(fileContent);

  return {
    props: {
      privacyPolicyPageData,
    },
  };
};

export default PrivacyPolicy;