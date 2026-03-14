import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, View } from 'react-native';

import { Text } from '@/components/nativewindui/Text';
import { Drawer } from '../../components/nativeui/Drawer';

export default function Eula() {
  const router = useRouter();

  return (
    <Drawer
      open={true}
      onClose={() => router.back()}
      title="End User License Agreement"
      size="full"
      initialSnapIndex={1}
    >
      <ScrollView contentContainerClassName="p-5">
        <View className="mb-5">
          <Text variant="title1" className="mb-2.5">
            END USER LICENSE AGREEMENT
          </Text>
          <Text variant="body" className="mb-2.5">
            Last updated August 23, 2025
          </Text>
          <Text variant="body" className="mb-2.5">
            InjexPro is licensed to You (the "End-User") by **HR Online Consulting LLC**, located at
            **550 Kings Mountain, Kings Mountain, NC 28086**, **United States** ("Licensor"), for
            use only in accordance with the terms of this License Agreement.
          </Text>
          <Text variant="body" className="mb-2.5">
            By downloading the Licensed Application from Apple App Store or Google Play Store
            (together, the "Services") and installing any updates made available, You confirm that
            You accept this License Agreement and agree to be legally bound by it.
          </Text>
          <Text variant="body" className="mb-2.5">
            The Services are not a party to this Agreement and bear no responsibility for the
            Licensed Application or its content, including but not limited to warranty, liability,
            maintenance, or support. Those responsibilities rest solely with **HR Online Consulting
            LLC**.
          </Text>
          <Text variant="body" className="mb-2.5">
            This License Agreement will not impose usage rules that conflict with the Apple Media
            Services Terms and Conditions or Google Play Terms of Service ("Usage Rules"). **HR
            Online Consulting LLC** confirms this License is consistent with those Usage Rules.
          </Text>
          <Text variant="body">
            InjexPro is provided under license, not sold. All rights not expressly granted remain
            reserved. The Licensed Application may only be used on devices running Apples operating
            systems ("iOS", "Mac OS") or Googles operating system ("Android").
          </Text>
        </View>

        <View className="mb-5">
          <Text variant="title2" className="mb-2.5">
            1. THE APPLICATION
          </Text>
          <Text variant="body" className="mb-2.5">
            InjexPro ("Licensed Application") is software created to provide clinical decision
            support, educational content, and workflow tools for licensed medical professionals
            performing botulinum toxin injections. It is customized for use on iOS and Android
            devices.
          </Text>
          <Text variant="body" className="mb-1.5">
            Main uses include:
          </Text>
          <Text variant="body" className="mb-1.5">
            - Delivering an interactive atlas with AI-powered injection guidance.
          </Text>
          <Text variant="body" className="mb-1.5">
            - Providing access to detailed medical illustrations and anatomical references.
          </Text>
          <Text variant="body" className="mb-1.5">
            - Enabling secure storage of clinical notes and photos (Plus Tier only).
          </Text>
          <Text variant="body" className="mb-1.5">
            - Supporting compliance with healthcare regulations (HIPAA, GDPR, FADP) where required
            agreements are in place.
          </Text>
          <Text variant="body" className="mb-2.5">
            - Offering training and educational modules for professional development.
          </Text>
          <Text variant="body" className="mb-2.5">
            This Licensed Application is designed exclusively for healthcare professionals. It is
            **not a substitute for clinical judgment or professional advice**.
          </Text>
          <Text variant="body" className="mb-1.5">
            - In the U.S., InjexPro may support HIPAA compliance where patient data is processed
            under a valid Business Associate Agreement (BAA).
          </Text>
          <Text variant="body" className="mb-1.5">
            - In the EU, UK, and Switzerland, it may support compliance with GDPR, UK GDPR, and FADP
            if a valid Data Processing Agreement (DPA) is in place.
          </Text>
          <Text variant="body">
            - Standard Tier users are prohibited from uploading patient-identifiable data. Plus Tier
            users must ensure the appropriate BAA or DPA is executed before storing such
            information.
          </Text>
        </View>

        <View className="mb-5">
          <Text variant="title2" className="mb-2.5">
            2. SCOPE OF LICENSE
          </Text>
          <Text variant="body" className="mb-1.5">
            2.1 You are granted a limited, non-transferable, non-exclusive, non-sublicensable
            license to install and use the Licensed Application on devices You own or control,
            subject to Usage Rules. Family Sharing or volume purchase programs may also apply.
          </Text>
          <Text variant="body" className="mb-1.5">
            2.2 This license applies to any updates or upgrades provided by Licensor unless a new
            license accompanies the update.
          </Text>
          <Text variant="body" className="mb-1.5">
            2.3 You may not provide the Licensed Application to third parties, sell, rent, lease, or
            redistribute it without prior written approval from the Licensor (unless expressly
            allowed by Usage Rules).
          </Text>
          <Text variant="body" className="mb-1.5">
            2.4 You may not reverse engineer, decompile, disassemble, adapt, or attempt to derive
            the source code without express written permission.
          </Text>
          <Text variant="body" className="mb-1.5">
            2.5 Copies may only be created for backup purposes on devices You own or control.
            Intellectual property notices must remain intact. If You sell or transfer a device, You
            must remove the Licensed Application beforehand.
          </Text>
          <Text variant="body" className="mb-1.5">
            2.6 Any breach or attempted breach of these obligations may result in termination,
            damages, or prosecution.
          </Text>
          <Text variant="body" className="mb-1.5">
            2.7 Licensor may amend license conditions at any time.
          </Text>
          <Text variant="body">
            2.8 Third-party terms continue to apply and must be respected when using the
            Application.
          </Text>
        </View>

        <View className="mb-5">
          <Text variant="title2" className="mb-2.5">
            3. TECHNICAL REQUIREMENTS
          </Text>
          <Text variant="body" className="mb-1.5">
            3.1 The Licensed Application requires firmware version 1.0.0 or higher. Licensor
            recommends installing the latest version.
          </Text>
          <Text variant="body" className="mb-1.5">
            3.2 Licensor will attempt to maintain compatibility with updated firmware and hardware,
            but is not obligated to provide ongoing updates.
          </Text>
          <Text variant="body" className="mb-1.5">
            3.3 It is Your responsibility to verify that Your device meets the technical
            requirements.
          </Text>
          <Text variant="body">
            3.4 Licensor may adjust technical specifications at any time.
          </Text>
        </View>

        <View className="mb-5">
          <Text variant="title2" className="mb-2.5">
            4. MAINTENANCE AND SUPPORT
          </Text>
          <Text variant="body" className="mb-1.5">
            4.1 Licensor is responsible for providing maintenance and support for the Licensed
            Application. Contact information is available in the App Store or Play Store listing.
          </Text>
          <Text variant="body">
            4.2 Apple and Google are not obligated to provide any maintenance or support.
          </Text>
        </View>

        <View className="mb-5">
          <Text variant="title2" className="mb-2.5">
            5. USE OF DATA
          </Text>
          <Text variant="body" className="mb-2.5">
            Licensor may access and adjust Application content and collect information in accordance
            with the Privacy Policy: **https://injexpro.com/privacy-policy**.
          </Text>
          <Text variant="body">
            Technical data (device type, operating system, performance metrics, peripherals) may
            also be collected to deliver support, improve functionality, and optimize updates. Such
            data will be processed in a form that does not personally identify You, unless otherwise
            stated.
          </Text>
        </View>

        <View className="mb-5">
          <Text variant="title2" className="mb-2.5">
            6. USER-GENERATED CONTRIBUTIONS
          </Text>
          <Text variant="body" className="mb-2.5">
            The Licensed Application may allow You to participate in forums, chats, or similar
            features where You can create or share content ("Contributions"). Contributions may be
            visible to other users and/or third-party platforms.
          </Text>
          <Text variant="body" className="mb-1.5">
            By submitting Contributions, You confirm that:
          </Text>
          <Text variant="body" className="mb-1.5">
            - You have the rights and permissions to share the material.
          </Text>
          <Text variant="body" className="mb-1.5">
            - Contributions do not infringe intellectual property or privacy rights.
          </Text>
          <Text variant="body" className="mb-1.5">
            - Contributions are not false, misleading, defamatory, obscene, or otherwise unlawful.
          </Text>
          <Text variant="body" className="mb-1.5">
            - Contributions do not promote harassment, hate, or violence.
          </Text>
          <Text variant="body" className="mb-2.5">
            - Contributions comply with applicable laws, including child protection and
            anti-discrimination rules.
          </Text>
          <Text variant="body">
            Violations may result in suspension or termination of Your rights to use the
            Application.
          </Text>
        </View>

        <View className="mb-5">
          <Text variant="title2" className="mb-2.5">
            7. CONTRIBUTION LICENSE
          </Text>
          <Text variant="body" className="mb-2.5">
            By posting Contributions, You grant Licensor an irrevocable, perpetual, worldwide,
            royalty-free, transferable, and sublicensable license to use, reproduce, distribute,
            publish, display, modify, translate, and create derivative works based on Your
            Contributions in any media.
          </Text>
          <Text variant="body" className="mb-2.5">
            You waive any moral rights in Your Contributions. You retain ownership of Your
            intellectual property but agree Licensor may use Contributions for commercial or
            non-commercial purposes without compensation.
          </Text>
          <Text variant="body">
            Licensor may edit, categorize, or remove Contributions at its discretion. Licensor is
            not obligated to monitor Contributions.
          </Text>
        </View>

        <View className="mb-5">
          <Text variant="title2" className="mb-2.5">
            8. LIABILITY
          </Text>
          <Text variant="body" className="mb-1.5">
            8.1 Licensor liability is limited to intent and gross negligence. For essential
            contractual duties, liability may also apply in cases of slight negligence, but only for
            foreseeable and typical damages. This does not limit liability for injury to life, body,
            or health.
          </Text>
          <Text variant="body" className="mb-1.5">
            8.2 Licensor is not responsible for damages arising from misuse or breach of license
            terms. Users must use backup functions to protect against data loss. Alterations or
            manipulations of the Licensed Application may block further access.
          </Text>
          <Text variant="body">
            8.3 Licensor is not liable for indirect, incidental, punitive, or consequential damages
            such as lost profits, revenue, or data. In any event, liability is capped at the total
            amount paid by the user during the 12 months preceding the claim.
          </Text>
        </View>

        <View className="mb-5">
          <Text variant="title2" className="mb-2.5">
            9. WARRANTY
          </Text>
          <Text variant="body" className="mb-1.5">
            9.1 Licensor warrants that the Licensed Application is free of malware (e.g., viruses,
            spyware, trojans) at download and operates as described in documentation.
          </Text>
          <Text variant="body" className="mb-1.5">
            9.2 No warranty applies to unauthorized modifications, improper handling, or use with
            incompatible hardware or software.
          </Text>
          <Text variant="body" className="mb-1.5">
            9.3 Users must inspect the Application immediately after installation and report defects
            within 30 days to **legal@injexpro.com**.
          </Text>
          <Text variant="body" className="mb-1.5">
            9.4 If confirmed defective, Licensor may choose to repair the issue or provide a
            replacement.
          </Text>
          <Text variant="body" className="mb-1.5">
            9.5 In the event of non-conformity, You may request a refund from the App Store or Play
            Store operator. Beyond this, store operators have no warranty obligations.
          </Text>
          <Text variant="body">
            9.6 For business users, claims expire after 12 months. For consumers, statutory
            limitation periods apply.
          </Text>
        </View>

        <View className="mb-5">
          <Text variant="title2" className="mb-2.5">
            10. PRODUCT CLAIMS
          </Text>
          <Text variant="body">
            Licensor is solely responsible for handling any product liability claims, regulatory
            non-compliance issues, or consumer protection matters arising from Your possession or
            use of the Licensed Application.
          </Text>
        </View>

        <View className="mb-5">
          <Text variant="title2" className="mb-2.5">
            11. LEGAL COMPLIANCE
          </Text>
          <Text variant="body">
            You represent that You are not located in a country subject to U.S. government
            embargoes, nor listed as a prohibited or restricted party by the U.S. government.
          </Text>
        </View>

        <View className="mb-5">
          <Text variant="title2" className="mb-2.5">
            12. CONTACT INFORMATION
          </Text>
          <Text variant="body" className="mb-2.5">
            For questions, complaints, or claims regarding the Licensed Application, please contact:
          </Text>
          <Text variant="body" className="mb-1.5">
            **HR Online Consulting LLC**
          </Text>
          <Text variant="body" className="mb-1.5">
            **550 Kings Mountain, Kings Mountain, NC 28086**
          </Text>
          <Text variant="body" className="mb-1.5">
            **United States**
          </Text>
          <Text variant="body">
            Email: **legal@injexpro.com**
          </Text>
        </View>

        <View className="mb-5">
          <Text variant="title2" className="mb-2.5">
            13. TERMINATION
          </Text>
          <Text variant="body">
            This License remains valid until terminated by You or by Licensor. It will terminate
            automatically if You fail to comply with its terms. Upon termination, You must cease
            using the Licensed Application and delete all copies.
          </Text>
        </View>

        <View className="mb-5">
          <Text variant="title2" className="mb-2.5">
            14. THIRD-PARTY TERMS OF AGREEMENTS AND BENEFICIARY
          </Text>
          <Text variant="body" className="mb-2.5">
            Licensor confirms it complies with third-party agreements when using the Licensed
            Application.
          </Text>
          <Text variant="body">
            Apple and Google (and their subsidiaries) are third-party beneficiaries of this License
            Agreement. Upon Your acceptance of this Agreement, they may enforce its terms against
            You.
          </Text>
        </View>

        <View className="mb-5">
          <Text variant="title2" className="mb-2.5">
            15. INTELLECTUAL PROPERTY RIGHTS
          </Text>
          <Text variant="body">
            In the event of a third-party claim that the Licensed Application or its use infringes
            intellectual property rights, Licensor — not the Services — is solely responsible for
            investigation, defense, settlement, or discharge of such claims.
          </Text>
        </View>

        <View className="mb-5">
          <Text variant="title2" className="mb-2.5">
            16. APPLICABLE LAW
          </Text>
          <Text variant="body">
            This License Agreement is governed by the laws of Switzerland, excluding conflict-of-law
            rules.
          </Text>
        </View>

        <View>
          <Text variant="title2" className="mb-2.5">
            17. MISCELLANEOUS
          </Text>
          <Text variant="body" className="mb-1.5">
            17.1 If any provision of this Agreement is found invalid, the remaining terms remain
            enforceable. Invalid terms shall be replaced with valid provisions closest to the
            original intent.
          </Text>
          <Text variant="body">
            17.2 Side agreements, changes, or amendments are valid only if made in writing. A waiver
            of this requirement is also only valid if made in writing.
          </Text>
        </View>
      </ScrollView>
    </Drawer>
  );
}
