import React from 'react';
import { Helmet } from 'react-helmet-async';
import contactPageData from "@/data/pages/Contact.json";

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>{contactPageData.pageTitle}</title>
        <meta name="description" content={contactPageData.metaDescription} />
      </Helmet>
      <h1 className="text-3xl font-bold mb-6">{contactPageData.pageTitle}</h1>
      <div className="text-gray-800 space-y-4 prose max-w-none" dangerouslySetInnerHTML={{ __html: `<h2>${contactPageData.mainHeading}</h2><p>${contactPageData.introParagraph}</p><h3>${contactPageData.contactInfoHeading}</h3><p>Email: ${contactPageData.email}</p><p>Phone: ${contactPageData.phone}</p><p>Address: ${contactPageData.address}</p><h3>${contactPageData.contactFormHeading}</h3><p>${contactPageData.contactFormPlaceholderText}</p><form><label for='name'>${contactPageData.formLabels.name}</label><br><input type='text' id='name' name='name'><br><br><label for='email'>${contactPageData.formLabels.email}</label><br><input type='email' id='email' name='email'><br><br><label for='message'>${contactPageData.formLabels.message}</label><br><textarea id='message' name='message'></textarea><br><br><button type='submit'>${contactPageData.formButtonText}</button></form>` }} />
    </div>
  );
};

export default Contact;