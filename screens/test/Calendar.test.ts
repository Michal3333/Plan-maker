import React from 'react';
import {describe, expect, test, it} from '@jest/globals'
import renderer from 'react-test-renderer';

import Calendar from '../../components/UI/Calendar';

describe('<Calendar />', () => {
   it('renders correctly', () => {
      const tree = renderer.create(Calendar({darkMode: true, logs:[], style:{}}))
      expect(tree).toMatchSnapshot();
    });
});

