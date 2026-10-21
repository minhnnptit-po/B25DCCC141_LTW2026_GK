import React from 'react';

class WorkTimer extends React.Component {
  state = { seconds: 0 };

  componentDidMount() {
    this.timer = setInterval(this.tick.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick() {
    this.setState(function increase({ seconds }) {
      return { seconds: seconds + 1 };
    });
  }

  render() {
    const { seconds } = this.state;
    return <p>{`Đã xem: ${seconds} giây`}</p>;
  }
}

export default WorkTimer;
