import React from 'react';

import Button from '../button';

import './style.css';

const DISMISSED_STORAGE_KEY = 'survey-banner-01.dismissed';

class SurveyBanner extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dismissed: !!JSON.parse(localStorage.getItem(DISMISSED_STORAGE_KEY)),
    };

    this.dismiss = this.dismiss.bind(this);
  }

  dismiss() {
    this.setState({ dismissed: true });
    localStorage.setItem(DISMISSED_STORAGE_KEY, true);
  }

  render() {
    if (this.state.dismissed) {
      return null;
    }

    return (
      <div className="survey-banner">
        <span>
          <span role="img" aria-label="Party">
            🎉
          </span>{' '}
          Be an influencer; change the future —{' '}
          <a
            href="https://forms.office.com/Pages/ResponsePage.aspx?id=NaKkOuK21UiRlX_PBbRZsLnQzIU2W_JOhtedhXrNufNUQVlGS0tBVjZVSEVTQVJZM0pTSjhON1NJNi4u"
            rel="noopener noreferrer"
            target="_blank"
          >
            take the Radix Survey
          </a>
          !
        </span>
        <Button btnType={['tiny', 'default']} onClick={this.dismiss}>
          Begone, annoying banner!
        </Button>
      </div>
    );
  }
}

export default SurveyBanner;
