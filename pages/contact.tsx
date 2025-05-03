import React from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import contactPageData from "@/data/pages/Contact.json";

interface ContactProps {
  contactPageData: any; // Replace 'any' with the actual type of your data
}

const Contact = ({ contactPageData }: ContactProps) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>{contactPageData.pageTitle}</title>
        <meta name="description" content={contactPageData.metaDescription} />
      </Head>
      <h1 className="text-3xl font-bold mb-6">{contactPageData.pageTitle}</h1>
      <div className="text-gray-800 space-y-4 prose max-w-none" dangerouslySetInnerHTML={{ __html: `<h2>${contactPageData.mainHeading}</h2><p>${contactPageData.introParagraph}</p><h3>${contactPageData.contactInfoHeading}</h3><p>Email: ${contactPageData.email}</p><p>Phone: ${contactPageData.phone}</p><p>Address: ${contactPageData.address}</p><h3>${contactPageData.contactFormHeading}</h3><p>${contactPageData.contactFormPlaceholderText}</p><form><label for='name'>${contactPageData.formLabels.name}</label><br><input type='text' id='name' name='name'><br><br><label for='email'>${contactPageData.formLabels.email}</label><br><input type='email' id='email' name='email'><br><br><label for='message'>${contactPageData.formLabels.message}</label><br><textarea id='message' name='message'></textarea><br><br><button type='submit'>${contactPageData.formButtonText}</button></form>` }} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const fs = require('fs');
  const path = require('path');

  const filePath = path.join(process.cwd(), 'src/data/pages/Contact.json');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const contactPageData = JSON.parse(fileContent);

  return {
    props: {
      contactPageData,
    },
  };
};

export default Contact;