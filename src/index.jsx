import React from 'react';
import { render } from 'react-dom';
import { IntlProvider, addLocaleData, FormattedMessage, defineMessages } from 'react-intl';

/* 
import en from 'node_modules/react-intl/en';
import fr from 'node_modules/react-intl/fr';
import de from 'node_modules/react-intl/de';
const messages = {
  'de': {
    'hello': 'Guten Tag!'
  },
  'fr': {
    'hello': 'Bonjour!'
  }
};
*/

const getTranslations = (locale) => {
  let messages = {};
  let localeData = {};
  const all = require.context('locales', true, /\.json$/);
  all.keys().forEach((key) => {
    if (`./${locale}.json` === key) {
      console.log(all(key))
      messages = all(key);
    }
  });
  const allLocaleData = require.context('localeData', true, /\.js$/);
  allLocaleData.keys().forEach((key) => {
    if (`./${locale}.js` === key) {
      localeData = allLocaleData(key);
    }
  });
  return { messages, localeData };
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      locale: 'en',
    }
  }
  change(e) {
    this.setState({locale: e.target.value})
  }
  render () {

    const { locale } = this.state;
    const { messages, localeData } = getTranslations(locale);
    console.log({ messages, localeData })
    
    // addLocaleData([..en, ..fr, de]);
    
    addLocaleData([...localeData]);
    return (
      <div>
        <select onChange={this.change.bind(this)} value={this.state.value}>
          <option value='en'>en</option>
          <option value='fr'>fr</option>
          <option value='de'>de</option>
        </select>
        <IntlProvider locale={locale} messages={messages}>
          <div>
            <FormattedMessage
              id='hello'
              defaultMessage="Hello!"
            />
          </div>
        </IntlProvider>
      </div>
    )
  }
}

render(
  <App/>,
  document.getElementById('app')
);
