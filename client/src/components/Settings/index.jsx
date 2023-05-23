import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RoomLink from '@/components/RoomLink';
import T from '@/components/T';

import classes from './styles.module.scss';

class Settings extends Component {
  handleSoundToggle() {
    this.props.toggleSoundEnabled(!this.props.soundIsEnabled);
  }

  handlePersistenceToggle() {
    this.props.togglePersistenceEnabled(!this.props.persistenceIsEnabled);
  }


  handleLanguageChange(evt) {
    const language = evt.target.value;
    this.props.setLanguage(language);
  }

  render() {
    return (
      <div className={classes.styles}>

        <section>
          <h4 className="mb-3">
            <T path="copyRoomHeader" />
          </h4>
          <RoomLink roomId={this.props.roomId} translations={this.props.translations} />
        </section>

        <section>
          <h4 className="mb-3">
            <T path="languageDropdownHeader" />
          </h4>
          <p>
            <a
              href="https://github.com/darkwire/darkwire.io/blob/master/client/README.md#translations"
              rel="noopener noreferrer"
              target="_blank"
            >
              <T path="helpTranslate" />
            </a>
          </p>
          <div className="form-group">
            <select
              value={this.props.language}
              className="form-control"
              onChange={this.handleLanguageChange.bind(this)}
            >
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="oc">Occitan</option>
              <option value="de">Deutsch</option>
              <option value="esAR">Español (Argentina)</option>
              <option value="nl">Nederlands</option>
              <option value="it">Italiano</option>
              <option value="ru">Русский</option>
              <option value="pl">Polish</option>
              <option value="zhCN">中文</option>
              <option value="ja">日本語</option>
              <option value="tr">Türkçe</option>
              <option value="ko">한국어</option>
            </select>
          </div>
        </section>

        <section>
          <h4>
            <T path="roomOwnerHeader" />
          </h4>
          <p>
            <T path="roomOwnerText" />
          </p>
        </section>
        <section>
          <h4>
            <T path="lockRoomHeader" />
          </h4>
          <p>
            <T path="lockRoomText" />
          </p>
        </section>
        <section>
          <h4>
            <T path="slashCommandsHeader" />
          </h4>
          <p>
            <T path="slashCommandsText" />
          </p>
          <ul>
            <li>
              /nick [username]{' '}
              <span className="text-muted">
                <T path="slashCommandsBullets.0" />
              </span>
            </li>
            <li>
              /me [action]{' '}
              <span className="text-muted">
                <T path="slashCommandsBullets.1" />
              </span>
            </li>
            <li>
              /clear{' '}
              <span className="text-muted">
                <T path="slashCommandsBullets.2" />
              </span>
            </li>
            <li>
              /help{' '}
              <span className="text-muted">
                <T path="slashCommandsBullets.3" />
              </span>
            </li>
          </ul>
        </section>
      </div>
    );
  }
}

Settings.propTypes = {
  soundIsEnabled: PropTypes.bool.isRequired,
  persistenceIsEnabled: PropTypes.bool.isRequired,
  toggleSoundEnabled: PropTypes.func.isRequired,
  roomId: PropTypes.string.isRequired,
  setLanguage: PropTypes.func.isRequired,
  translations: PropTypes.object.isRequired,
};

export default Settings;
