import React from 'react';

const Buttons = props => {
  return (
    <div>
      <button onClick={() => props.loadMoreReviews()}>LOAD MORE</button>
    </div>
  );
};

export default Buttons;
