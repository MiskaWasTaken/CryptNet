import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RoomLink from '@/components/RoomLink';

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomUrl: `https://cryptnet.me/${props.roomId}`,
    };
  }

  render() {
    return (
      <div>
        <div>
          Welcome to CryptNet Alpha. Here are some highlights:
          <ul className="native">
            <li>Support on all modern browsers (Chrome, Firefox, Safari, Safari iOS, Android)</li>
            <li>Slash commands (/nick, /me, /clear)</li>
            <li>Room owners can lock the room, preventing anyone else from joining</li>
            <li>AES"256" encryption method</li>
            <li>No data or messages are stored, all keys get destroyed after use</li>
            <li>Messages are untraceable using network spoofing tools</li>
            <li>If you do not see a "disconnected" header, your IP is hidden and cannot be traced by your school or ISP</li>
            <li>Send files up to 20 MB</li>
            <li><strong>APPLE USERS READ BELOW</strong></li>
            <li>You cannot directly upload photos from the camera, CryptNet will kick you out of the room</li>
            <li>Please take a photo from the camera app and upload it</li>
          </ul>
          <div>
            You can learn more{' '}
            <a href="https://github.com/MiskaWasTaken/CryptNet" target="_blank" rel="noopener noreferrer">
              here
            </a>
            .
          </div>
        </div>
        <br />
        <p className="mb-2">Others can join this room using the following URL:</p>
        <RoomLink roomId={this.props.roomId} translations={this.props.translations} />

        {/* Synthesia video */}
        <div style={{ position: 'relative', overflow: 'hidden'}}>
        <video width="520" height="240" controls loop>
          <source src="https://cdn.discordapp.com/attachments/1095226209706725459/1111731454129492048/intro.mp4" type="video/mp4" className="intro" />
          There was supposed to be a video here but your browser doesnt support it, consider upgrading.
        </video>
        </div>
        <div className="react-modal-footer">
          <button className="btn btn-primary btn-lg" onClick={this.props.close}>
            {this.props.translations.welcomeModalCTA}
          </button>
        </div>

        {/* Autoplay video */}
        <center>
        <video width="520" height="240" autoPlay controls loop muted>
          <source src="https://cdn.discordapp.com/attachments/1095226209706725459/1111731455081594913/video.mp4" type="video/mp4" className="video" />
          There was supposed to be a video here but your browser doesnt support it, consider upgrading.
        </video>
        </center>
      </div>
    );
  }
}

Welcome.propTypes = {
  roomId: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  translations: PropTypes.object.isRequired,
};

export default Welcome;
