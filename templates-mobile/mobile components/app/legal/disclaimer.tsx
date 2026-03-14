import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, View } from 'react-native';

import { Text } from '@/components/nativewindui/Text';
import { Drawer } from '../../components/nativeui/Drawer';

export default function Disclaimer() {
  const router = useRouter();

  return (
    <Drawer
      open={true}
      onClose={() => router.back()}
      title="Disclaimer"
      size="full"
      initialSnapIndex={1}
    >
      <ScrollView contentContainerClassName="p-5">
        <View className="mb-5">
          <Text variant="title1" className="mb-2.5">
            DISCLAIMER
          </Text>
          <Text variant="body" className="mb-2.5">
            Last updated August 23, 2025
          </Text>
          <Text variant="title2" className="mb-2.5">
            WEBSITE DISCLAIMER
          </Text>
          <Text variant="body" className="mb-2.5">
            The information provided by **HR Online Consulting LLC** ("we," "us," or "our") on
            https://injexpro.com (the "Site") and within our mobile application is intended for
            general informational purposes only. All content on the Site and our mobile application
            is published in good faith; however, we make no representation or warranty of any kind,
            express or implied, regarding the accuracy, adequacy, validity, reliability,
            availability, or completeness of any information presented.
          </Text>
          <Text variant="body">
            UNDER NO CIRCUMSTANCES SHALL WE BE LIABLE TO YOU FOR ANY LOSS OR DAMAGE OF ANY KIND
            RESULTING FROM YOUR USE OF THE SITE OR OUR MOBILE APPLICATION OR RELIANCE ON ANY
            INFORMATION PROVIDED THEREIN. YOUR ACCESS AND USE OF THE SITE AND OUR MOBILE APPLICATION
            IS SOLELY AT YOUR OWN RISK.
          </Text>
        </View>

        <View className="mb-5">
          <Text variant="title2" className="mb-2.5">
            EXTERNAL LINKS DISCLAIMER
          </Text>
          <Text variant="body" className="mb-2.5">
            The Site and our mobile application may contain (or you may be directed through them to)
            links to external websites, content, or resources originating from third parties,
            including banners or advertisements. These external sites are not monitored,
            investigated, or checked by us for accuracy, adequacy, validity, reliability, or
            completeness.
          </Text>
          <Text variant="body">
            WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR TAKE RESPONSIBILITY FOR THE ACCURACY OR
            RELIABILITY OF ANY INFORMATION PROVIDED BY THIRD-PARTY WEBSITES LINKED THROUGH THE SITE
            OR ANY FEATURES IN BANNERS OR ADVERTISING. WE ARE NOT A PARTY TO, NOR SHALL WE BE
            RESPONSIBLE FOR, ANY TRANSACTIONS BETWEEN YOU AND THIRD-PARTY PROVIDERS OF PRODUCTS OR
            SERVICES.
          </Text>
        </View>

        <View className="mb-5">
          <Text variant="title2" className="mb-2.5">
            MEDICAL DISCLAIMER
          </Text>
          <Text variant="body" className="mb-2.5">
            The content, including but not limited to clinical illustrations, generated guidance,
            educational modules, and workflow tools, is provided **for informational and educational
            purposes only**. It does not constitute medical advice, diagnosis, or treatment, nor is
            it a substitute for professional judgment by qualified healthcare providers.
          </Text>
          <Text variant="body" className="mb-1.5">
            - **No doctor patient relationship is created.** Use of the InjexPro platform does not
            establish a physician patient relationship between us, our platform, and any individual
            patients.
          </Text>
          <Text variant="body" className="mb-1.5">
            - **Professional responsibility remains with the clinician.** All decisions regarding
            patient care, treatment protocols, and clinical outcomes are the sole responsibility of
            the licensed medical professional using the platform.
          </Text>
          <Text variant="body" className="mb-1.5">
            - **Regulatory compliance.** Users are responsible for ensuring that their use of
            InjexPro complies with all applicable laws, regulations, institutional requirements, and
            professional standards in their jurisdiction.
          </Text>
          <Text variant="body" className="mb-2.5">
            - **Tier restrictions.** Users of the *Standard Tier* are expressly prohibited from
            entering or uploading identifiable patient information. Users of the *Plus Tier* may
            process such information only under a valid Business Associate Agreement (BAA), Data
            Processing Agreement (DPA), or equivalent legal arrangement.
          </Text>
          <Text variant="heading">
            USE OF THE INJEXPRO PLATFORM IS AT YOUR OWN RISK. WE EXPRESSLY DISCLAIM ALL LIABILITY
            FOR ANY CLINICAL DECISION OR PATIENT OUTCOME RESULTING FROM THE USE OF OUR SERVICES.
          </Text>
        </View>

        <View>
          <Text variant="title2" className="mb-2.5">
            TESTIMONIALS DISCLAIMER
          </Text>
          <Text variant="body" className="mb-2.5">
            The Site may include testimonials from users of our products and/or services. These
            testimonials reflect the actual experiences and opinions of individual users. However,
            such experiences are personal to those users and may not represent the results of all
            users.
          </Text>
          <Text variant="body" className="mb-2.5">
            WE DO NOT CLAIM, AND YOU SHOULD NOT ASSUME, THAT ALL USERS WILL HAVE THE SAME
            EXPERIENCES. YOUR INDIVIDUAL RESULTS MAY DIFFER.
          </Text>
          <Text variant="body" className="mb-2.5">
            Testimonials may appear in multiple forms (e.g., text, audio, video) and are reviewed by
            us prior to publication. They are presented on the Site exactly as submitted by users,
            apart from minor edits for grammar or clarity. In some cases, testimonials may be
            shortened to exclude extraneous details not relevant to the general public.
          </Text>
          <Text variant="body" className="mb-2.5">
            The views and opinions expressed in testimonials are solely those of the individuals
            providing them and do not necessarily reflect our views or opinions. We are not
            affiliated with users who submit testimonials, and such users are not compensated in any
            way for their feedback.
          </Text>
          <Text variant="body">
            Testimonials are not intended, and should not be interpreted, as claims that our
            products and/or services diagnose, treat, cure, prevent, or mitigate any disease or
            medical condition. No testimonials have been clinically validated or reviewed by
            regulatory authorities.
          </Text>
        </View>
      </ScrollView>
    </Drawer>
  );
}
