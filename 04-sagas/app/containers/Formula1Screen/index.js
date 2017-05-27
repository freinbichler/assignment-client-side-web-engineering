/*
 *
 * Formula1Screen
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Autocomplete from 'react-autocomplete';
import { loadConstructors } from './actions';
import { selectConstructors } from './selectors';

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
           // set the menu to only the selected item
            // this.setState({ value });
           // or you could reset it to a default list again
           // this.setState({ unitedStates: getStates() })
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
      </div>
    );
  }
}

Formula1Screen.propTypes = {
  sendLoadConstructors: PropTypes.func.isRequired,
};

Formula1Screen.defaultProp = {
  constructors: ['loading...'],
};

const mapStateToProps = createStructuredSelector({
  constructors: selectConstructors(),
});

function mapDispatchToProps(dispatch) {
  return {
    sendLoadConstructors: () => {
      dispatch(loadConstructors());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Formula1Screen);
