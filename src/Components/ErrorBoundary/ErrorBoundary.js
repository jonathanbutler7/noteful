import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = {
    hasError: null,
  };

  // static getDerivedStateFromError(error) {
  //   return { hasError: true };
  // }

  render() {
    if (this.state.hasError) {
      return (
        <h2>Something went wrong. Please click the nav bar to restart.</h2>
      );
    }
    return this.props.children;
  }
}

// import React, { useState } from 'react';

// function ErrorBoundary() {
//   const [error, setError] = useState(false);
//   return (
//     <>
//       {error && (
//         <h2>Something went wrong. Please click the nav bar to restart.</h2>
//       )}
//     </>
//   );
// }

// export default ErrorBoundary;
