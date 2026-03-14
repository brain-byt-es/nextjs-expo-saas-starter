import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, View } from 'react-native';

import { Text } from '@/components/nativewindui/Text';
import { Drawer } from '../../components/nativeui/Drawer';

export default function PrivacyPolicy() {
  const router = useRouter();

  return (
    <Drawer
      open={true}
      onClose={() => router.back()}
      title="Privacy Policy"
      size="full"
      initialSnapIndex={1}
    >
      <ScrollView contentContainerClassName="p-5">
        <View className="mb-5">
          <Text variant="title1" className="mb-2.5">
            PRIVACY POLICY
          </Text>
          <Text variant="body" className="mb-2.5">
            Last updated August 23, 2025
          </Text>
          <Text variant="body" className="mb-2.5">
            This Privacy Notice for **HR Online Consulting LLC** (doing business as **InjexPro**)
            ("**we**," "**us**," or "**our**"), describes how and why we might access, collect,
            store, use, and/or share ("process") your personal information when you use our services
            ("Services"), including when you:
          </Text>
          <Text variant="body" className="mb-1.5">
            - Visit our website at https://injexpro.com or any website of ours that links to this
            Privacy Notice
          </Text>
          <Text variant="body" className="mb-1.5">
            - Download and use our mobile application, or any other application of
            ours that links to this Privacy Notice
          </Text>
          <Text variant="body" className="mb-2.5">
            - Engage with us in other related ways, including any sales, marketing, or events
          </Text>
          <Text variant="heading" className="mb-2.5">
            Questions or concerns?
          </Text>
          <Text variant="body">
            Reading this Privacy Notice will help you understand your privacy rights and choices. We
            are responsible for making decisions about how your personal information is processed. If
            you do not agree with our policies and practices, please do not use our Services. If you
            still have any questions or concerns, please contact us at **legal@injexpro.com**.
          </Text>
        </View>

        <View className="mb-5">
          <Text variant="title2" className="mb-2.5">
            SUMMARY OF KEY POINTS
          </Text>
          <Text variant="body" className="mb-2.5">
            This summary provides key points from our Privacy Notice, but you can find out more
            details about any of these topics in the sections below.
          </Text>
          <Text variant="body" className="mb-1.5">
            - **What personal information do we process?** We may process personal information
            depending on how you interact with us and the Services, the choices you make, and the
            features you use.
          </Text>
          <Text variant="body" className="mb-1.5">
            - **Do we process sensitive personal information?** We do not process sensitive personal
            information.
          </Text>
          <Text variant="body" className="mb-1.5">
            - **Do we collect from third parties?** No, we do not collect from third parties.
          </Text>
          <Text variant="body" className="mb-1.5">
            - **How do we process your information?** To provide, improve, and administer our
            Services, communicate with you, for security and fraud prevention, and to comply with
            law.
          </Text>
          <Text variant="body" className="mb-1.5">
            - **Do we share your personal information?** Yes, in specific cases and with categories
            of third parties outlined below.
          </Text>
          <Text variant="body" className="mb-1.5">
            - **How do we keep your data safe?** We have organizational and technical safeguards, but
            no method is 100% secure.
          </Text>
          <Text variant="body" className="mb-1.5">
            - **What are your rights?** Depending on your location, you may have rights to access,
            correct, delete, or restrict how we process your data.
          </Text>
          <Text variant="body">
            - **How do you exercise them?** By contacting us at **legal@injexpro.com**.
          </Text>
        </View>

        <View className="mb-5">
          <Text variant="title2" className="mb-2.5">
            1. WHAT INFORMATION DO WE COLLECT?
          </Text>
          <Text variant="title3" className="mb-1.5">
            Personal information you disclose to us.
          </Text>
          <Text variant="body" className="mb-2.5">
            We collect personal information you provide directly when registering, expressing
            interest, using features, or contacting us.
          </Text>
          <Text variant="body" className="mb-1.5">
            Examples:
          </Text>
          <Text variant="body" className="mb-1.5">
            - Names, emails, phone numbers, usernames, passwords
          </Text>
          <Text variant="body" className="mb-1.5">
            - Billing addresses, debit/credit card numbers
          </Text>
          <Text variant="body" className="mb-2.5">
            - Job titles, authentication data, contact preferences
          </Text>

          <Text variant="title3" className="mb-1.5">
            Sensitive information.
          </Text>
          <Text variant="body" className="mb-2.5">
            We do not process sensitive information.
          </Text>

          <Text variant="title3" className="mb-1.5">
            Payment data.
          </Text>
          <Text variant="body" className="mb-2.5">
            Payments are processed by third-party vendors (e.g., Stripe). We do not store full
            payment card details. See: https://stripe.com/privacy.
          </Text>

          <Text variant="title3" className="mb-1.5">
            Application data.
          </Text>
          <Text variant="body" className="mb-1.5">
            If you use our mobile apps, we may collect:
          </Text>
          <Text variant="body" className="mb-1.5">
            - Device data (model, OS, identifiers, carrier, IP address)
          </Text>
          <Text variant="body" className="mb-1.5">
            - Usage diagnostics, crash reports, performance logs
          </Text>
          <Text variant="body">
            - Push notification preferences
          </Text>
        </View>

        <View className="mb-5">
          <Text variant="title2" className="mb-2.5">
            2. HOW DO WE PROCESS YOUR INFORMATION?
          </Text>
          <Text variant="body" className="mb-1.5">
            We process personal data to:
          </Text>
          <Text variant="body" className="mb-1.5">
            - Facilitate account creation, login, and authentication
          </Text>
          <Text variant="body" className="mb-1.5">
            - Deliver and manage Services
          </Text>
          <Text variant="body" className="mb-1.5">
            - Respond to inquiries and support requests
          </Text>
          <Text variant="body" className="mb-1.5">
            - Send administrative notices
          </Text>
          <Text variant="body" className="mb-1.5">
            - Fulfill and manage orders, billing, and payments
          </Text>
          <Text variant="body" className="mb-1.5">
            - Request feedback and improve Services
          </Text>
          <Text variant="body" className="mb-1.5">
            - Send marketing (if opted-in) and promotional content
          </Text>
          <Text variant="body" className="mb-1.5">
            - Deliver targeted ads (see Cookie Policy)
          </Text>
          <Text variant="body" className="mb-1.5">
            - Monitor fraud and protect security
          </Text>
          <Text variant="body" className="mb-1.5">
            - Analyze usage trends and improve features
          </Text>
          <Text variant="body" className="mb-1.5">
            - Verify professional credentials and eligibility (for medical use)
          </Text>
          <Text variant="body" className="mb-1.5">
            - Ensure compliance with legal and healthcare obligations (e.g., HIPAA, GDPR, FADP, via
            executed agreements)
          </Text>
          <Text variant="body">
            - Improve platform stability and reliability with error/crash diagnostics
          </Text>
        </View>

        <View className="mb-5">
          <Text variant="title2" className="mb-2.5">
            3. WHAT LEGAL BASES DO WE RELY ON?
          </Text>
          <Text variant="body" className="mb-1.5">
            Depending on your jurisdiction:
          </Text>
          <Text variant="body" className="mb-1.5">
            - **Consent** (you may withdraw anytime)
          </Text>
          <Text variant="body" className="mb-1.5">
            - **Performance of a contract** (to provide Services you requested)
          </Text>
          <Text variant="body" className="mb-1.5">
            - **Legitimate interests** (improving services, preventing fraud, analytics, verifying
            eligibility)
          </Text>
          <Text variant="body" className="mb-1.5">
            - **Legal obligations** (complying with laws, regulators, or court orders)
          </Text>
          <Text variant="body">
            - **Vital interests** (to protect safety or prevent harm)
          </Text>
        </View>

        <View className="mb-5">
          <Text variant="title2" className="mb-2.5">
            4. WHEN AND WITH WHOM DO WE SHARE INFORMATION?
          </Text>
          <Text variant="body" className="mb-1.5">
            We may share with:
          </Text>
          <Text variant="body" className="mb-1.5">
            - AI platforms
          </Text>
          <Text variant="body" className="mb-1.5">
            - Cloud hosting providers
          </Text>
          <Text variant="body" className="mb-1.5">
            - Analytics tools
          </Text>
          <Text variant="body" className="mb-1.5">
            - Payment processors
          </Text>
          <Text variant="body" className="mb-1.5">
            - Performance monitoring tools
          </Text>
          <Text variant="body" className="mb-1.5">
            - Authentication providers
          </Text>
          <Text variant="body" className="mb-2.5">
            - Marketing and communication tools
          </Text>
          <Text variant="body">
            **Business transfers:** We may disclose information in case of mergers, acquisitions, or
            financing.
          </Text>
        </View>

        <View className="mb-5">
          <Text variant="title2" className="mb-2.5">
            5. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
          </Text>
          <Text variant="body">
            Yes. We may use cookies, pixels, and beacons to maintain Services, analyze usage, and
            personalize ads. See our Cookie Policy at https://www.injexpro.com/cookie-policy.
          </Text>
        </View>

        <View className="mb-5">
          <Text variant="title2" className="mb-2.5">
            6. DO WE OFFER ARTIFICIAL INTELLIGENCE-BASED PRODUCTS?
          </Text>
          <Text variant="body">
            Yes. We may use third-party AI providers (e.g., OpenAI, Anthropic, Microsoft Azure).
            Functions include: NLP, bots, text analysis, automation, and AI document generation.
          </Text>
        </View>

        <View className="mb-5">
          <Text variant="title2" className="mb-2.5">
            7. HOW DO WE HANDLE YOUR SOCIAL LOGINS?
          </Text>
          <Text variant="body">
            If you sign up via social login (Facebook, Google, X), we may access public profile
            data, including name, email, and photo, depending on your settings.
          </Text>
        </View>

        <View className="mb-5">
          <Text variant="title2" className="mb-2.5">
            8. IS YOUR INFORMATION TRANSFERRED INTERNATIONALLY?
          </Text>
          <Text variant="body" className="mb-2.5">
            Our servers are located in **Germany**. Data may also be processed in the US, UK,
            Switzerland, or other countries by third-party providers.
          </Text>
          <Text variant="body">
            We rely on **Standard Contractual Clauses (SCCs)** to safeguard transfers outside the
            EEA/UK.
          </Text>
        </View>

        <View className="mb-5">
          <Text variant="title2" className="mb-2.5">
            9. HOW LONG DO WE KEEP YOUR INFORMATION?
          </Text>
          <Text variant="body">
            We keep your information **as long as you have an account** or as required for legal,
            tax, or compliance purposes. Once no longer needed, data is securely deleted or
            anonymized.
          </Text>
        </View>

        <View className="mb-5">
          <Text variant="title2" className="mb-2.5">
            10. HOW DO WE KEEP YOUR INFORMATION SAFE?
          </Text>
          <Text variant="body">
            We use technical and organizational measures to protect data (encryption, access
            controls, monitoring). No method is 100% secure.
          </Text>
        </View>

        <View className="mb-5">
          <Text variant="title2" className="mb-2.5">
            11. DO WE COLLECT INFORMATION FROM MINORS?
          </Text>
          <Text variant="body">
            We do not knowingly collect or market to individuals under **18 years old** (or age of
            majority in your region). If such data is found, we will delete it.
          </Text>
        </View>

        <View className="mb-5">
          <Text variant="title2" className="mb-2.5">
            12. WHAT ARE YOUR PRIVACY RIGHTS?
          </Text>
          <Text variant="body" className="mb-1.5">
            Depending on where you live (EEA, UK, Switzerland, US states, Canada, Australia, NZ),
            you may have rights to:
          </Text>
          <Text variant="body" className="mb-1.5">
            - Access or receive a copy of your data
          </Text>
          <Text variant="body" className="mb-1.5">
            - Correct, erase, or restrict processing
          </Text>
          <Text variant="body" className="mb-1.5">
            - Object to marketing
          </Text>
          <Text variant="body" className="mb-1.5">
            - Withdraw consent
          </Text>
          <Text variant="body" className="mb-2.5">
            - Request portability
          </Text>
          <Text variant="body">
            Contact us at **legal@injexpro.com** to exercise your rights.
          </Text>
        </View>

        <View className="mb-5">
          <Text variant="title2" className="mb-2.5">
            13. CONTROLS FOR DO-NOT-TRACK
          </Text>
          <Text variant="body">
            We do not respond to browser DNT signals at this time.
          </Text>
        </View>

        <View className="mb-5">
          <Text variant="title2" className="mb-2.5">
            14. DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
          </Text>
          <Text variant="body" className="mb-1.5">
            Yes. Depending on your state (California, Colorado, Texas, Virginia, etc.), you may have
            rights under state privacy laws (e.g., CCPA).
          </Text>
          <Text variant="body">
            This includes rights to access, delete, correct, and opt-out of data sale/sharing.
          </Text>
        </View>

        <View className="mb-5">
          <Text variant="title2" className="mb-2.5">
            15. DO OTHER REGIONS HAVE SPECIFIC PRIVACY RIGHTS?
          </Text>
          <Text variant="body" className="mb-1.5">
            - **Australia/New Zealand:** Privacy Act compliance
          </Text>
          <Text variant="body" className="mb-1.5">
            - **South Africa:** POPIA compliance
          </Text>
          <Text variant="body">
            - **Canada:** express/implied consent rules under PIPEDA
          </Text>
        </View>

        <View className="mb-5">
          <Text variant="title2" className="mb-2.5">
            16. DO WE MAKE UPDATES TO THIS NOTICE?
          </Text>
          <Text variant="body">
            Yes. Updated versions will have a revised "Last updated" date at the top. Significant
            changes may be notified via email or website notices.
          </Text>
        </View>

        <View className="mb-5">
          <Text variant="title2" className="mb-2.5">
            17. HOW CAN YOU CONTACT US?
          </Text>
          <Text variant="body" className="mb-2.5">
            If you have questions about this notice, you may email us at **legal@mail.com** or write
            to:
          </Text>
          <Text variant="body" className="mb-1.5">
            **HR Online Consulting LCC**
          </Text>
          <Text variant="body" className="mb-1.5">
            **550 Kings Mountain**
          </Text>
          <Text variant="body">
            **Kings Mountain, NC 28086, United States**
          </Text>
        </View>

        <View>
          <Text variant="title2" className="mb-2.5">
            18. HOW CAN YOU REVIEW, UPDATE, OR DELETE DATA?
          </Text>
          <Text variant="body">
            You may request review, update, or deletion of your data by emailing
            **legal@injexpro.com**. Depending on your jurisdiction, you may also file complaints
            with your data protection authority.
          </Text>
        </View>
      </ScrollView>
    </Drawer>
  );
}
