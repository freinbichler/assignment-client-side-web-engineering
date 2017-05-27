/*
 *
 * Formula1Screen
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Autocomplete from 'react-autocomplete';
import { loadConstructors, loadDrivers } from './actions';
import { selectConstructors, selectDrivers } from './selectors';

export class Formula1Screen extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    value: '',
  };

  componentDidMount() {
    this.props.sendLoadConstructors();
  }

  matchStateToTerm(item, value) {
    return item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
  }

  render() {
    const items = this.props.constructors || [{ constructorId: 'lulu', name: 'loading'}];

    let driversList = '';
    if(this.props.drivers) {
      driversList = this.props.drivers.map((driver) =>
        <li key={driver.driverId}>
          <a href={driver.url} target="_blank">{driver.givenName} {driver.familyName}</a>
        </li>
      );
    }

    return (
      <div>
        <h1>Formula 1</h1>
        <Autocomplete
          inputProps={{
            id: 'constructors-autocomplete',
            style: {
              backgroundColor: '#DDD',
              padding: '10px',
            },
            placeholder: 'Search Constructors...'
          }}
          ref={(a) => (this.autocomplete = a)}
          value={this.state.value}
          items={items}
          getItemValue={(item) => item.name}
          shouldItemRender={this.matchStateToTerm}
          onSelect={(value, item) => {
            this.setState({ value });
            this.props.sendLoadDrivers(item.constructorId);
          }}
          onChange={(event, value) => {
            this.setState({ value });
          }}
          renderItem={(item) => (
            <div
              key={item.constructorId}
              id={item.constructorId}
            >{item.name}</div>
         )}
        />
      <h2>Drivers:</h2>
        <ul>
          {driversList}
        </ul>
      </div>
    );
  }
}

Formula1Screen.propTypes = {
  sendLoadConstructors: PropTypes.func.isRequired,
  sendLoadDrivers: PropTypes.func.isRequired,
};

Formula1Screen.defaultProp = {
  constructors: ['loading...'],
  drivers: [],
};

const mapStateToProps = createStructuredSelector({
  constructors: selectConstructors(),
  drivers: selectDrivers(),
});

function mapDispatchToProps(dispatch) {
  return {
    sendLoadConstructors: () => {
      dispatch(loadConstructors());
    },
    sendLoadDrivers: (constructorId) => {
      dispatch(loadDrivers(constructorId));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Formula1Screen);
