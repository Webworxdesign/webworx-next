// CoreCode.js
import React from 'react';
// import graphql and our getStyles helpers from Faust
import { gql } from '@apollo/client';
import { getStyles, useBlocksTheme } from '@faustwp/blocks';

export default function CoreCode(props) {
  // use getStyles utility to process the props.attributes properly
  const theme = useBlocksTheme();
  const style = getStyles(theme, props);
  const { attributes } = props;
  return (
    // This markup is from the WordPress CoreCode block
    // add the className and styles to the markup
    // add props.attributes?.content to the markup
    <pre className={attributes?.cssClassName} style={styles}>
      <code>{`${attributes?.content}`}</code>
    </pre>
  );
}
// add fragment
CoreCode.fragments = {
  key: `CoreCodeBlockFragment`,
  entry: gql`
    fragment CoreCodeBlockFragment on CoreCode {
      attributes {
        borderColor
        backgroundColor
        content
        style
        textColor
        fontSize
        fontFamily
        cssClassName
      }
    }
  `,
};
CoreCode.displayName = 'CoreCode';