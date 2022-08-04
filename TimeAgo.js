// @flow
import React, { Component } from "react";
import { View, Text } from "react-native";
import moment from "moment";

export default class TimeAgo extends Component {
  props: {
    time: string,
    interval?: number,
    hideAgo?: boolean
  };
  state: { timer: null | number } = { timer: null };
  _isMounted = false;

  static defaultProps = {
    hideAgo: false,
    interval: 60000
  };

  componentDidMount() {
    this._isMounted = true;
    this.createTimer();
  }

  componentDidUpdate(){
    this._isMounted = true;
  }

  createTimer = () => {
    this._isMounted && this.setState({
      timer: setTimeout(() => {
        this.update();
      }, this.props.interval)
    });
  };

  componentWillUnmount() {
    this._isMounted = false;
    clearTimeout(this.state.timer);
  }

  update = () => {
    this._isMounted && this.forceUpdate();
    this.createTimer();
  };

  render() {
    const { time, hideAgo } = this.props;
    return (
      <Text {...this.props}>
        {moment(time).fromNow(hideAgo)}
      </Text>
    );
  }
}
