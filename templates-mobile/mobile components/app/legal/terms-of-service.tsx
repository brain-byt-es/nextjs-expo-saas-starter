import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, View } from 'react-native';

import { Text } from '@/components/nativewindui/Text';
import { Drawer } from '../../components/nativeui/Drawer';

export default function TermsOfService() {
  const router = useRouter();

  return (
    <Drawer
      open={true}
      onClose={() => router.back()}
      title="Terms of Service"
      size="full"
      initialSnapIndex={1}
    >
      <ScrollView contentContainerClassName="p-5">
        <View className="mb-5">
          <Text variant="title1" className="mb-2.5">
            TERMS OF SERVICE
          </Text>
          <Text variant="body" className="mb-2.5">
            Last updated August 23, 2025
          </Text>
          <Text variant="title2" className="mb-2.5">
            AGREEMENT TO OUR LEGAL TERMS
          </Text>
          <Text variant="body" className="mb-2.5">
            We are **HR Online Consulting LLC**, doing business as **InjexPro** ("Company," "we,"
            "us," or "our"), registered in **Catawba Digital Economic Zone** with a principal office
            at **550 Kings Mountain, Kings Mountain, NC 28086**.
          </Text>
          <Text variant="body" className="mb-2.5">
            We provide the website (the "Site"), the InjexPro mobile application (the "App"), and
            any other related services, products, or features that reference these legal terms
            (collectively, the "Services").
          </Text>
          <Text variant="body" className="mb-2.5">
            You may contact us by email at **legal@injexpro.com** or by mail at **550 Kings
            Mountain, Kings Mountain, NC 28086**.
          </Text>
          <Text variant="body" className="mb-2.5">
            These Terms of Service form a legally binding contract between you, whether personally
            or on behalf of an entity ("you"), and **HR Online Consulting LLC**, concerning your
            access to and use of the Services. By accessing or using the Services, you acknowledge
            that you have read and understood these Terms and agree to be bound by them. **IF YOU DO
            NOT AGREE WITH THESE TERMS, YOU MUST NOT USE THE SERVICES.**
          </Text>
          <Text variant="body" className="mb-2.5">
            We will notify you in advance of any material changes to the Services. Updates to these
            Terms will take effect upon posting to the Site or upon notice to you via email at
            **legal@injexpro.com**. Continued use of the Services after changes become effective
            means you accept the revised Terms.
          </Text>
          <Text variant="body" className="mb-2.5">
            The Services are intended for users at least 18 years of age. Persons under 18 may not
            register for or use the Services.
          </Text>
          <Text variant="body">
            We recommend printing or saving a copy of these Terms for future reference.
          </Text>
        </View>

        <View className="mb-5">
          <Text variant="title2" className="mb-2.5">
            1. OUR SERVICES
          </Text>
          <Text variant="body" className="mb-2.5">
            The Services are not meant for distribution or use in jurisdictions where such access
            would be unlawful or subject us to registration requirements. If you choose to access
            the Services from outside our main operating regions, you do so on your own initiative
            and are solely responsible for compliance with local laws that may apply.
          </Text>
          <Text variant="body" className="mb-2.5">
            Because InjexPro operates in the healthcare technology sector, specific compliance rules
            apply:
          </Text>
          <Text variant="body" className="mb-1.5">
            - **United States:** We comply with the Health Insurance Portability and Accountability
            Act of 1996 (HIPAA) when Protected Health Information (PHI) is processed under an
            executed Business Associate Agreement (BAA).
          </Text>
          <Text variant="body" className="mb-1.5">
            - **European Union, United Kingdom, Switzerland:** We comply with the GDPR, UK GDPR, and
            the Swiss Federal Act on Data Protection (FADP) when handling Special Category Health
            Data under a signed Data Processing Agreement (DPA).
          </Text>
          <Text variant="body" className="mb-1.5">
            - **Standard Tier:** Users are expressly forbidden from uploading or entering
            identifiable patient information.
          </Text>
          <Text variant="body">
            - **Plus Tier:** Users may only process identifiable patient data after executing the
            appropriate BAA or DPA with InjexPro.
          </Text>
        </View>

        <View className="mb-5">
          <Text variant="title2" className="mb-2.5">
            2. INTELLECTUAL PROPERTY RIGHTS
          </Text>
          <Text variant="title3" className="mb-1.5">
            Our Intellectual Property
          </Text>
          <Text variant="body" className="mb-2.5">
            We own, or are the licensee of, all intellectual property rights in the Services,
            including but not limited to: source code, databases, functionality, software, website
            designs, audio, video, text, images, graphics, and other materials (collectively, the
            "Content"), as well as all trademarks, service marks, and logos displayed in the
            Services (the "Marks").
          </Text>
          <Text variant="body" className="mb-2.5">
            The Content and Marks are protected by copyright, trademark, and other intellectual
            property and unfair competition laws in the United States and internationally.
          </Text>
          <Text variant="body" className="mb-2.5">
            The Services, Content, and Marks are provided "AS IS" for your internal business use or
            personal professional reference only.
          </Text>

          <Text variant="title3" className="mb-1.5">
            Your Use of the Services
          </Text>
          <Text variant="body" className="mb-1.5">
            Subject to your compliance with these Terms, we grant you a limited, non-exclusive,
            non-transferable, revocable license to:
          </Text>
          <Text variant="body" className="mb-1.5">
            - access the Services; and
          </Text>
          <Text variant="body" className="mb-1.5">
            - download or print portions of the Content you are permitted to access,
          </Text>
          <Text variant="body" className="mb-2.5">
            strictly for your own internal business use or professional reference.
          </Text>
          <Text variant="body" className="mb-2.5">
            Except as expressly permitted in these Terms, you may not copy, reproduce, republish,
            upload, transmit, publicly display, sell, license, or otherwise exploit any part of the
            Services, Content, or Marks without prior written consent from us.
          </Text>
          <Text variant="body" className="mb-2.5">
            If you seek permission for uses beyond what is explicitly allowed here, please contact:
            **legal@injexpro.com**.
          </Text>
          <Text variant="body" className="mb-2.5">
            We reserve all rights not expressly granted in and to the Services, Content, and Marks.
            Any unauthorized use will be treated as a material breach of these Terms and may result
            in termination of your access rights.
          </Text>

          <Text variant="title3" className="mb-1.5">
            Submissions and Contributions
          </Text>
          <Text variant="body" className="mb-2.5">
            If you send us feedback, questions, ideas, or suggestions ("Submissions"), you agree
            that all intellectual property rights in such Submissions are transferred to us. We may
            use them for any lawful purpose without compensation or acknowledgment.
          </Text>
          <Text variant="body" className="mb-2.5">
            If you provide or post any content via the Services ("Contributions"), you grant us a
            worldwide, perpetual, irrevocable, royalty-free license to use, reproduce, distribute,
            display, and adapt those Contributions in any media or format, for any lawful purpose.
          </Text>
          <Text variant="body" className="mb-2.5">
            We reserve the right to remove or alter any Contributions if we believe they violate
            these Terms or applicable law.
          </Text>

          <Text variant="title3" className="mb-1.5">
            Copyright Infringement
          </Text>
          <Text variant="body">
            We respect the intellectual property rights of others. If you believe any material on or
            through the Services infringes your copyright, please refer to the "COPYRIGHT
            INFRINGEMENTS" section below.
          </Text>
        </View>

        <View className="mb-5">
          <Text variant="title2" className="mb-2.5">
            3. USER REPRESENTATIONS
          </Text>
          <Text variant="body" className="mb-1.5">
            By using the Services, you represent and warrant that:
          </Text>
          <Text variant="body" className="mb-1.5">
            1. All registration details you provide are true, accurate, current, and complete.
          </Text>
          <Text variant="body" className="mb-1.5">
            2. You will maintain the accuracy of this information and update it as necessary.
          </Text>
          <Text variant="body" className="mb-1.5">
            3. You have the legal capacity and agree to abide by these Terms.
          </Text>
          <Text variant="body" className="mb-1.5">
            4. You are not a minor in your place of residence.
          </Text>
          <Text variant="body" className="mb-1.5">
            5. You will not access the Services through automated or non-human means (such as bots
            or scripts).
          </Text>
          <Text variant="body" className="mb-1.5">
            6. You will not use the Services for any unlawful or unauthorized purpose.
          </Text>
          <Text variant="body" className="mb-2.5">
            7. Your use of the Services does not violate any applicable laws or regulations.
          </Text>
          <Text variant="body">
            If any information you provide is untrue, inaccurate, not current, or incomplete, we may
            suspend or terminate your account and refuse any current or future access to the
            Services.
          </Text>
        </View>

        <View className="mb-5">
          <Text variant="title2" className="mb-2.5">
            4. USER REGISTRATION
          </Text>
          <Text variant="body" className="mb-2.5">
            You may need to register for an account to use parts of the Services. You agree to keep
            your login credentials confidential and are responsible for all activities under your
            account.
          </Text>
          <Text variant="body">
            We reserve the right to remove, reclaim, or change any username if we determine, in our
            sole discretion, that it is inappropriate, obscene, or otherwise objectionable.
          </Text>
        </View>

        <View className="mb-5">
          <Text variant="title2" className="mb-2.5">
            5. PURCHASES AND PAYMENT
          </Text>
          <Text variant="body" className="mb-1.5">
            We accept the following forms of payment:
          </Text>
          <Text variant="body" className="mb-1.5">
            - Visa
          </Text>
          <Text variant="body" className="mb-1.5">
            - Mastercard
          </Text>
          <Text variant="body" className="mb-1.5">
            - American Express
          </Text>
          <Text variant="body" className="mb-1.5">
            - Discover
          </Text>
          <Text variant="body" className="mb-2.5">
            - PayPal
          </Text>
          <Text variant="body" className="mb-2.5">
            You agree to provide accurate, current, and complete purchase and account information
            for all transactions. You also agree to promptly update this information, including
            email address, payment method, and card expiration dates, so we can process transactions
            and contact you as necessary.
          </Text>
          <Text variant="body" className="mb-2.5">
            Sales tax will be added to purchases where applicable. Prices may change at any time.
            All payments are in U.S. dollars unless otherwise stated.
          </Text>
          <Text variant="body" className="mb-2.5">
            You authorize us to charge your chosen payment method for all applicable fees. We
            reserve the right to correct errors in pricing, even if payment has already been
            requested or received.
          </Text>
          <Text variant="body">
            We may reject or cancel orders at our discretion. This includes limiting or cancelling
            quantities purchased per account, payment method, or billing/shipping address. Orders
            that appear to be placed by dealers, resellers, or distributors may also be refused.
          </Text>
        </View>

        <View className="mb-5">
          <Text variant="title2" className="mb-2.5">
            6. SUBSCRIPTIONS
          </Text>
          <Text variant="body" className="mb-2.5">
            **Billing and Renewal**
          </Text>
          <Text variant="body" className="mb-2.5">
            Subscriptions automatically renew unless cancelled. You authorize us to charge your
            payment method on a recurring basis until cancellation. The billing cycle depends on
            your chosen subscription plan.
          </Text>
          <Text variant="body" className="mb-2.5">
            **Free Trial**
          </Text>
          <Text variant="body" className="mb-2.5">
            We may offer a 14-day free trial for new users. At the end of the trial, your selected
            plan will begin, and fees will be charged accordingly.
          </Text>
          <Text variant="body" className="mb-2.5">
            **Cancellation**
          </Text>
          <Text variant="body" className="mb-2.5">
            All purchases are non-refundable. You may cancel your subscription at any time in your
            account settings. Cancellation will apply at the end of the current paid term. For
            questions or concerns, contact us at **legal@injexpro.com**.
          </Text>
          <Text variant="body" className="mb-2.5">
            **Fee Changes**
          </Text>
          <Text variant="body">
            We may adjust subscription prices from time to time, with notice provided as required by
            law.
          </Text>
        </View>

        <View className="mb-5">
          <Text variant="title2" className="mb-2.5">
            7. SOFTWARE
          </Text>
          <Text variant="body" className="mb-2.5">
            The Services may include software for use with our platform. If accompanied by an end
            user license agreement (EULA), that document governs use of the software. If not, then
            we grant you a limited, personal, non-exclusive, non-transferable, revocable license to
            use such software solely in connection with the Services and under these Terms.
          </Text>
          <Text variant="body">
            The software and any related documentation are provided "AS IS," without warranties of
            any kind. You assume all risks from its use or performance. You may not reproduce,
            redistribute, reverse engineer, decompile, or disassemble the software except as
            permitted by applicable law.
          </Text>
        </View>

        <View className="mb-5">
          <Text variant="title2" className="mb-2.5">
            8. PROHIBITED ACTIVITIES
          </Text>
          <Text variant="body" className="mb-2.5">
            You may not use the Services for any purpose other than those we make available. The
            Services must not be used for commercial endeavors unless specifically approved by us.
          </Text>
          <Text variant="body" className="mb-1.5">
            By using the Services, you agree not to:
          </Text>
          <Text variant="body" className="mb-1.5">
            - Systematically collect data or other content to build a database without written
            permission.
          </Text>
          <Text variant="body" className="mb-1.5">
            - Mislead, trick, or defraud us or other users, particularly to obtain sensitive account
            details.
          </Text>
          <Text variant="body" className="mb-1.5">
            - Disable, bypass, or interfere with security features of the Services.
          </Text>
          <Text variant="body" className="mb-1.5">
            - Harm or disparage us, in our opinion.
          </Text>
          <Text variant="body" className="mb-1.5">
            - Use data from the Services to harass, abuse, or harm another person.
          </Text>
          <Text variant="body" className="mb-1.5">
            - Misuse our support services or submit false abuse reports.
          </Text>
          <Text variant="body" className="mb-1.5">
            - Use the Services in violation of applicable laws.
          </Text>
          <Text variant="body" className="mb-1.5">
            - Engage in unauthorized framing or linking.
          </Text>
          <Text variant="body" className="mb-1.5">
            - Upload or transmit viruses, malware, spam, or other disruptive content.
          </Text>
          <Text variant="body" className="mb-1.5">
            - Employ automated scripts, bots, or scraping tools to access the Services.
          </Text>
          <Text variant="body" className="mb-1.5">
            - Delete copyright or proprietary notices.
          </Text>
          <Text variant="body" className="mb-1.5">
            - Impersonate another person or use another persons username.
          </Text>
          <Text variant="body" className="mb-1.5">
            - Collect or transmit passive data collection tools (spyware, pixels, cookies, etc.).
          </Text>
          <Text variant="body" className="mb-1.5">
            - Interfere with or burden our infrastructure.
          </Text>
          <Text variant="body" className="mb-1.5">
            - Harass or threaten our staff.
          </Text>
          <Text variant="body" className="mb-1.5">
            - Attempt to bypass access restrictions.
          </Text>
          <Text variant="body" className="mb-1.5">
            - Copy or adapt Service software or code.
          </Text>
          <Text variant="body" className="mb-1.5">
            - Reverse engineer or decompile Service components (except as allowed by law).
          </Text>
          <Text variant="body" className="mb-1.5">
            - Launch or distribute unauthorized automated systems.
          </Text>
          <Text variant="body" className="mb-1.5">
            - Use a purchasing agent or reseller to make orders.
          </Text>
          <Text variant="body" className="mb-1.5">
            - Create accounts by automated means or false pretenses.
          </Text>
          <Text variant="body" className="mb-1.5">
            - Compete with us by using our Services for your own revenue-generating activities.
          </Text>
          <Text variant="body" className="mb-1.5">
            - Sell or transfer your profile.
          </Text>
          <Text variant="body" className="mb-1.5">
            - Advertise or offer goods/services without authorization.
          </Text>
          <Text variant="body">
            - Upload patient-identifiable data in the **Standard Tier**.
          </Text>
        </View>

        <View className="mb-5">
          <Text variant="title2" className="mb-2.5">
            9. USER GENERATED CONTRIBUTIONS
          </Text>
          <Text variant="body" className="mb-2.5">
            The Services may allow you to post or share content, such as text, images, video, audio,
            reviews, or other materials ("Contributions"). Contributions may be visible to other
            users and possibly through third-party sites. Any Contributions you provide may be
            treated as non-confidential and non-proprietary.
          </Text>
          <Text variant="body" className="mb-1.5">
            You represent and warrant that:
          </Text>
          <Text variant="body" className="mb-1.5">
            - You own or have rights to your Contributions.
          </Text>
          <Text variant="body" className="mb-1.5">
            - Contributions do not infringe third-party intellectual property rights.
          </Text>
          <Text variant="body" className="mb-1.5">
            - You have consent from identifiable individuals appearing in your Contributions.
          </Text>
          <Text variant="body" className="mb-1.5">
            - Contributions are not false, misleading, illegal, or abusive.
          </Text>
          <Text variant="body" className="mb-1.5">
            - Contributions are not spam, pyramid schemes, or unauthorized advertising.
          </Text>
          <Text variant="body" className="mb-1.5">
            - Contributions are not obscene, harassing, defamatory, hateful, or otherwise
            objectionable.
          </Text>
          <Text variant="body" className="mb-1.5">
            - Contributions do not ridicule, intimidate, or abuse others.
          </Text>
          <Text variant="body" className="mb-1.5">
            - Contributions comply with applicable law, including child protection laws.
          </Text>
          <Text variant="body" className="mb-1.5">
            - Contributions do not violate privacy or publicity rights of others.
          </Text>
          <Text variant="body" className="mb-2.5">
            - Contributions do not include offensive comments targeting race, gender, religion,
            nationality, disability, or sexual orientation.
          </Text>
          <Text variant="body">
            Violation of the above may result in suspension or termination of your access.
          </Text>
        </View>

        <View className="mb-5">
          <Text variant="title2" className="mb-2.5">
            10. CONTRIBUTION LICENSE
          </Text>
          <Text variant="body" className="mb-2.5">
            By posting Contributions, you grant us a worldwide, perpetual, irrevocable,
            non-exclusive, transferable, royalty-free license to use, reproduce, distribute,
            display, perform, and adapt your Contributions in any media or format, for any lawful
            purpose.
          </Text>
          <Text variant="body" className="mb-2.5">
            This license includes our right to use your name, trademarks, or likeness in connection
            with the Contributions. You waive any moral rights to the extent permitted by law.
          </Text>
          <Text variant="body" className="mb-2.5">
            You retain ownership of your Contributions, but we are not responsible for statements or
            representations contained in them. You are solely liable for your Contributions, and you
            agree not to hold us accountable for them.
          </Text>
          <Text variant="body">
            We reserve the right, at our discretion, to edit, reclassify, or remove Contributions at
            any time without notice. We are not obligated to monitor user Contributions.
          </Text>
        </View>

        <View className="mb-5">
          <Text variant="title2" className="mb-2.5">
            11. GUIDELINES FOR REVIEWS
          </Text>
          <Text variant="body" className="mb-2.5">
            We may provide areas within the Services where users can post reviews or ratings. When
            submitting a review, you agree that:
          </Text>
          <Text variant="body" className="mb-1.5">
            1. You have firsthand experience with the subject of the review.
          </Text>
          <Text variant="body" className="mb-1.5">
            2. Your review does not include offensive language, hate speech, or profanity.
          </Text>
          <Text variant="body" className="mb-1.5">
            3. Your review does not contain discriminatory content related to race, religion, gender,
            age, sexual orientation, disability, or similar categories.
          </Text>
          <Text variant="body" className="mb-1.5">
            4. Your review does not reference illegal activity.
          </Text>
          <Text variant="body" className="mb-1.5">
            5. You are not affiliated with competitors if posting negative reviews.
          </Text>
          <Text variant="body" className="mb-1.5">
            6. You will not make conclusions regarding the legality of conduct.
          </Text>
          <Text variant="body" className="mb-1.5">
            7. You will not post false or misleading statements.
          </Text>
          <Text variant="body" className="mb-2.5">
            8. You will not organize campaigns to encourage others to post positive or negative
            reviews.
          </Text>
          <Text variant="body" className="mb-2.5">
            We reserve the right to accept, reject, or remove reviews at our discretion. We are not
            obligated to screen or delete reviews, even if considered inappropriate. Reviews do not
            represent our opinions and are not endorsed by us. We disclaim responsibility for any
            reviews and resulting claims, damages, or liabilities.
          </Text>
          <Text variant="body">
            By posting a review, you grant us a perpetual, worldwide, royalty-free, sublicensable
            license to use, reproduce, modify, translate, transmit, display, and distribute your
            review content.
          </Text>
        </View>

        <View className="mb-5">
          <Text variant="title2" className="mb-2.5">
            12. MOBILE APPLICATION LICENSE
          </Text>
          <Text variant="title3" className="mb-1.5">
            Use License
          </Text>
          <Text variant="body" className="mb-2.5">
            If you access the Services through our mobile application, we grant you a limited,
            revocable, non-exclusive, non-transferable license to install and use the App on your
            devices, and to access the App strictly in line with these Terms.
          </Text>
          <Text variant="body" className="mb-1.5">
            You may not:
          </Text>
          <Text variant="body" className="mb-1.5">
            - Reverse engineer, decompile, or decrypt the App except as allowed by law.
          </Text>
          <Text variant="body" className="mb-1.5">
            - Modify, translate, or create derivative works based on the App.
          </Text>
          <Text variant="body" className="mb-1.5">
            - Use the App in violation of applicable laws.
          </Text>
          <Text variant="body" className="mb-1.5">
            - Remove or obscure copyright or proprietary notices.
          </Text>
          <Text variant="body" className="mb-1.5">
            - Use the App for unauthorized commercial purposes.
          </Text>
          <Text variant="body" className="mb-1.5">
            - Make the App available over a network for multiple users.
          </Text>
          <Text variant="body" className="mb-1.5">
            - Develop competing products using our App or intellectual property.
          </Text>
          <Text variant="body" className="mb-2.5">
            - Use the App for unsolicited commercial email or spam.
          </Text>

          <Text variant="title3" className="mb-1.5">
            Apple and Android Devices
          </Text>
          <Text variant="body" className="mb-1.5">
            If you obtained the App from Apple App Store or Google Play, the following applies:
          </Text>
          <Text variant="body" className="mb-1.5">
            - The license is limited to use on devices running iOS or Android, subject to the App
            Distributor terms.
          </Text>
          <Text variant="body" className="mb-1.5">
            - We are responsible for maintenance and support of the App; App Distributors are not.
          </Text>
          <Text variant="body" className="mb-1.5">
            - Warranty claims must be addressed to us, not the App Distributor.
          </Text>
          <Text variant="body" className="mb-1.5">
            - You represent that you are not in a U.S. embargoed country and not listed as a
            prohibited party.
          </Text>
          <Text variant="body" className="mb-1.5">
            - You must comply with any applicable third-party agreements.
          </Text>
          <Text variant="body">
            - App Distributors are third-party beneficiaries of these Terms and may enforce them.
          </Text>
        </View>

        <View className="mb-5">
          <Text variant="title2" className="mb-2.5">
            13. SOCIAL MEDIA
          </Text>
          <Text variant="body" className="mb-2.5">
            You may connect your account with third-party services ("Third-Party Accounts"). By
            doing so, you authorize us to access and store content from those accounts in line with
            the settings of the Third-Party provider.
          </Text>
          <Text variant="body" className="mb-1.5">
            You confirm that:
          </Text>
          <Text variant="body" className="mb-1.5">
            - You are entitled to disclose your Third-Party Account information to us.
          </Text>
          <Text variant="body" className="mb-1.5">
            - Sharing this information does not breach any agreements with the third-party provider.
          </Text>
          <Text variant="body" className="mb-2.5">
            - We are not responsible for content accuracy, legality, or non-infringement of Social
            Network Content.
          </Text>
          <Text variant="body" className="mb-2.5">
            Your relationship with any Third-Party provider is governed solely by your agreement
            with them.
          </Text>
          <Text variant="body">
            You may disable connections to Third-Party Accounts at any time. We will attempt to
            delete any associated data stored on our servers, except for basic account identifiers.
          </Text>
        </View>

        <View className="mb-5">
          <Text variant="title2" className="mb-2.5">
            14. THIRD-PARTY WEBSITES AND CONTENT
          </Text>
          <Text variant="body" className="mb-2.5">
            The Services may include links to third-party websites or display third-party content
            ("Third-Party Content"). These are not monitored or verified by us, and we are not
            responsible for their content, accuracy, or practices.
          </Text>
          <Text variant="body" className="mb-2.5">
            Accessing Third-Party Content or websites is at your own risk, and these Terms no longer
            apply once you leave our Services. You should review the terms and policies of any
            third-party sites you use.
          </Text>
          <Text variant="body">
            We disclaim endorsement of third-party products or services, and you agree to hold us
            harmless from any harm or loss related to such third-party interactions.
          </Text>
        </View>

        <View className="mb-5">
          <Text variant="title2" className="mb-2.5">
            15. ADVERTISERS
          </Text>
          <Text variant="body">
            We may allow third-party advertisements within the Services. Advertisers are solely
            responsible for the content of their ads, and our role is limited to providing
            advertising space. We do not have further obligations or endorsements of advertised
            products or services.
          </Text>
        </View>

        <View className="mb-5">
          <Text variant="title2" className="mb-2.5">
            16. SERVICES MANAGEMENT
          </Text>
          <Text variant="body" className="mb-1.5">
            We reserve the right, but not the obligation, to:
          </Text>
          <Text variant="body" className="mb-1.5">
            1. Monitor the Services for violations of these Terms.
          </Text>
          <Text variant="body" className="mb-1.5">
            2. Take legal action against violators, including reporting to authorities.
          </Text>
          <Text variant="body" className="mb-1.5">
            3. Refuse, restrict, or disable access to any Contributions we consider harmful or
            unlawful.
          </Text>
          <Text variant="body" className="mb-1.5">
            4. Remove content that is excessive in size or otherwise burdensome.
          </Text>
          <Text variant="body">
            5. Manage the Services in a way that protects our rights and ensures proper functioning.
          </Text>
        </View>

        <View className="mb-5">
          <Text variant="title2" className="mb-2.5">
            17. PRIVACY POLICY
          </Text>
          <Text variant="body" className="mb-2.5">
            We value your privacy and security. Please review our Privacy Policy:
            **https://injexpro.com/privacy-policy**.
          </Text>
          <Text variant="body" className="mb-2.5">
            By using the Services, you agree to the terms of our Privacy Policy, which is
            incorporated by reference into these Terms.
          </Text>
          <Text variant="body">
            Please note: the Services are hosted in **Germany**. If you access the Services from
            another jurisdiction with different data laws, you consent to transferring your data to
            that hosting location and to its processing in line with our Privacy Policy.
          </Text>
        </View>

        <View className="mb-5">
          <Text variant="title2" className="mb-2.5">
            18. COPYRIGHT INFRINGEMENTS
          </Text>
          <Text variant="body" className="mb-2.5">
            We respect intellectual property rights. If you believe that material on the Services
            infringes your copyright, notify us immediately with details including:
          </Text>
          <Text variant="body" className="mb-1.5">
            - Your signature (physical or electronic).
          </Text>
          <Text variant="body" className="mb-1.5">
            - Identification of the copyrighted work.
          </Text>
          <Text variant="body" className="mb-1.5">
            - Identification of the infringing material and its location.
          </Text>
          <Text variant="body" className="mb-1.5">
            - Your contact information.
          </Text>
          <Text variant="body" className="mb-1.5">
            - A statement of good faith belief that use is unauthorized.
          </Text>
          <Text variant="body" className="mb-2.5">
            - A statement under penalty of perjury that the information provided is accurate and
            that you are authorized to act.
          </Text>
          <Text variant="body">
            A copy of your notification may be sent to the user responsible for the material. Please
            note you may be liable for damages if misrepresenting an infringement.
          </Text>
        </View>

        <View className="mb-5">
          <Text variant="title2" className="mb-2.5">
            19. TERM AND TERMINATION
          </Text>
          <Text variant="body" className="mb-2.5">
            These Terms remain in force while you use the Services.
          </Text>
          <Text variant="body" className="mb-2.5">
            We reserve the right, at our sole discretion and without notice, to:
          </Text>
          <Text variant="body" className="mb-1.5">
            - Deny access to the Services to any person for any reason.
          </Text>
          <Text variant="body" className="mb-1.5">
            - Terminate your account if you breach these Terms or applicable law.
          </Text>
          <Text variant="body" className="mb-2.5">
            - Remove or disable any content you provide.
          </Text>
          <Text variant="body">
            If your account is terminated, you may not create a new account under your own or
            another name. We also reserve the right to take legal action, including civil, criminal,
            and injunctive remedies.
          </Text>
        </View>

        <View className="mb-5">
          <Text variant="title2" className="mb-2.5">
            20. MODIFICATIONS AND INTERRUPTIONS
          </Text>
          <Text variant="body" className="mb-2.5">
            We may modify, suspend, or discontinue the Services at any time, without obligation to
            update or maintain them.
          </Text>
          <Text variant="body" className="mb-2.5">
            We cannot guarantee continuous availability of the Services. Interruptions may occur due
            to maintenance, upgrades, hardware or software issues, or other factors.
          </Text>
          <Text variant="body">
            You agree that we are not liable for any loss, damage, or inconvenience caused by
            interruptions or discontinuance of the Services.
          </Text>
        </View>

        <View className="mb-5">
          <Text variant="title2" className="mb-2.5">
            21. GOVERNING LAW
          </Text>
          <Text variant="body" className="mb-2.5">
            These Terms are governed by and interpreted in accordance with the laws of Switzerland.
            The United Nations Convention on Contracts for the International Sale of Goods does not
            apply.
          </Text>
          <Text variant="body" className="mb-2.5">
            If you reside in the EU as a consumer, you also retain the protections granted by the
            mandatory laws of your home country.
          </Text>
        </View>
      </ScrollView>
    </Drawer>
  );
}
