// @flow

import React from 'react';

type Props = {
  onSubmit: () => void,
};

export default function Form(props: Props) {
  let {onSubmit, ...otherProps} = props;
  let onSubmitHandler = (e: Event) => {
    e.preventDefault();
    onSubmit();
  };
  return <form onSubmit={onSubmitHandler} {...otherProps} />;
}
