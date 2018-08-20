/**
 * This file sets up environment in the browser to run the tests
 */

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import './style.css';

configure({ adapter: new Adapter() });
