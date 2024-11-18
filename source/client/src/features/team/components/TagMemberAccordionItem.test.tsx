//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { Accordion } from '@fluentui/react-components';
import IntlProvider from '../../../providers/IntlProvider';
import Presenter from './TagMemberAccordionItem.presenter';
import ThemeProvider from '../../../providers/ThemeProvider';
import { render } from '@testing-library/react';

it('should create a shapshot when the loading parameter is true', () => {
  const params = {
    loading: true,
    members: [
      {
        id: 'MjQzMmI1N2ItMGFiZC00M2RiLWFhN2ItMTZlYWRkMTE1ZDM0IyNlYjY1M2Y5Mi04MzczLTRkZTYtYmZlYy01YjRkMjE2YjZhZGUjI2QzYjJiM2ViLWM0N2YtNDViOS05NWYyLWIyZjJlZjYyMTVjZQ==',
        displayName: 'Adele Vance',
        tenantId: 'dcd219dd-bc68-4b9b-bf0b-4a33a796be35',
        userId: '87d349ed-44d7-43e1-9a83-5f2406dee5bd'
      }
    ],
    tag: {
      id: 'MjQzMmI1N2ItMGFiZC00M2RiLWFhN2ItMTZlYWRkMTE1ZDM0IyM3ZDg4M2Q4Yi1hMTc5LTRkZDctOTNiMy1hOGQzZGUxYTIxMmUjI3RhY29VSjN2RGk==',
      displayName: 'Finance',
      description: 'Finance Team for Mach 8 Project',
      memberCount: 2
    }
  };
  const { asFragment } = render(
    <IntlProvider>
      <ThemeProvider>
        <Accordion
          openItems={[
            params.tag
          ]}>
          <Presenter {...params} />
        </Accordion>
      </ThemeProvider>
    </IntlProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it('should create a shapshot when the loading parameter is false', () => {
  const params = {
    loading: false,
    members: [
      {
        id: 'MjQzMmI1N2ItMGFiZC00M2RiLWFhN2ItMTZlYWRkMTE1ZDM0IyNlYjY1M2Y5Mi04MzczLTRkZTYtYmZlYy01YjRkMjE2YjZhZGUjI2QzYjJiM2ViLWM0N2YtNDViOS05NWYyLWIyZjJlZjYyMTVjZQ==',
        displayName: 'Adele Vance',
        tenantId: 'dcd219dd-bc68-4b9b-bf0b-4a33a796be35',
        userId: '87d349ed-44d7-43e1-9a83-5f2406dee5bd'
      }
    ],
    tag: {
      id: 'MjQzMmI1N2ItMGFiZC00M2RiLWFhN2ItMTZlYWRkMTE1ZDM0IyM3ZDg4M2Q4Yi1hMTc5LTRkZDctOTNiMy1hOGQzZGUxYTIxMmUjI3RhY29VSjN2RGk==',
      displayName: 'Finance',
      description: 'Finance Team for Mach 8 Project',
      memberCount: 2
    }
  };
  const { asFragment } = render(
    <IntlProvider>
      <ThemeProvider>
        <Accordion
          openItems={[
            params.tag
          ]}>
          <Presenter {...params} />
        </Accordion>
      </ThemeProvider>
    </IntlProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});
