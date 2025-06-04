import React from 'react'

export const metadata = {
  title: 'Privacy Policy | Instaflowy',
  description: 'Privacy policy and data deletion instructions for Instaflowy Instagram automation'
}

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
        <p className="mb-4">When you use Instaflowy, we collect and process the following information:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Instagram Business Account information</li>
          <li>Direct messages content for automation purposes</li>
          <li>Automation settings and preferences</li>
          <li>Usage data and interaction patterns</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>To provide and maintain our DM automation service</li>
          <li>To process and respond to Instagram messages according to your automation rules</li>
          <li>To improve and optimize our services</li>
          <li>To communicate with you about service updates</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Data Storage and Security</h2>
        <p className="mb-4">
          We implement industry-standard security measures to protect your data. 
          Your information is stored securely in databases hosted by trusted providers.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Data Deletion Instructions</h2>
        <div className="p-6 rounded-lg">
          <h3 className="text-xl font-medium mb-4">How to Delete Your Data</h3>
          <p className="mb-4">You have two options to delete your data:</p>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium">Option 1: Through Your Account</h4>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Log in to your Instaflowy dashboard</li>
                <li>Go to Account Settings</li>
                <li>Click on "Delete Account & Data"</li>
                <li>Confirm deletion</li>
              </ol>
            </div>

            <div>
              <h4 className="font-medium">Option 2: Contact Support</h4>
              <p>
                Email us at support@instaflowy.com with subject "Data Deletion Request" 
                including your account email and Instagram handle.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Contact Information</h2>
        <p>
          For any privacy-related questions or concerns, please contact us at:{' '}
          <a href="mailto:privacy@instaflowy.com" className="text-blue-600 hover:underline">
            privacy@instaflowy.com
          </a>
        </p>
      </section>

      <footer className="text-sm text-gray-500 mt-12">
        Last updated: {new Date().toLocaleDateString()}
      </footer>
    </div>
  )
}