//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import { defineMessages } from 'react-intl';
import parentMessages from '../messages';

const messages = {
  ...parentMessages,
  ...defineMessages({
    AppDescription: { defaultMessage: 'Tile your teams for quick access.' },
    AppTitle: { defaultMessage: 'Teamtile' },
    FeaturesDescription1: { defaultMessage: '🧱View your joined teams as tiles' },
    FeaturesDescription2: { defaultMessage: '📖View team members and channels' },
    FeaturesDescription3: { defaultMessage: '📁Navigate to files (SharePoint Document Library)' },
    FeaturesDescription4: { defaultMessage: '📅Navigate to Channel Calendar' },
    FeaturesDescription5: { defaultMessage: '🪄Filter teams, channels, members' },
    FeaturesDescription6: { defaultMessage: '📌Pin favorite teams' },
    FeaturesSubtitle: { defaultMessage: 'Are you frustrated with finding a team? Teamtile provides these features to you😊:' },
    FeaturesTitle: { defaultMessage: 'Features' },
    GitHub: { defaultMessage: 'GitHub' },
    GitHubLink: { defaultMessage: 'https://github.com/karamem0/teamtile' },
    PrivacyPolicy: { defaultMessage: 'Privacy Policy' },
    PrivacyPolicyLink: { defaultMessage: 'https://github.com/karamem0/teamtile/blob/main/PRIVACY_POLICY.md' },
    TermsOfUse: { defaultMessage: 'Terms of Use' },
    TermsOfUseLink: { defaultMessage: 'https://github.com/karamem0/teamtile/blob/main/TERMS_OF_USE.md' }
  })
};

export default messages;
