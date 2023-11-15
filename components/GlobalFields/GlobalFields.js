import ThemeSettings from '../../constants/themeSettings';
import HeaderSettings from '../../constants/HeaderSettings';


export default function GlobalFields() {
  const { containerWidth, tag, contentPadding, contentPaddingMobile } = ThemeSettings();
  const { headerPadding, headerPaddingMobile } = HeaderSettings();

  const headerPaddingVariable = headerPadding ? '--inside--header--padding: ' + headerPadding + ';' : ''; 
  const headerPaddingMobileVariable = headerPaddingMobile ? '--inside--header--padding--mobile: ' + headerPaddingMobile + ';' : '';
  const containerWidthVariable = containerWidth ? '--wpe--container--max-width: ' +  containerWidth + 'px;' : '--wpe--container--max-width: 991px;';
  const contentMaxWidthVariable = containerWidth ? '--wpe--content--max-width: ' +  containerWidth + 'px;' : '--wpe--content--max-width: 991px;';
  const contentPaddingVariable = contentPadding ? '--wpe--content--padding: ' + contentPadding + ';' : '';
  const contentPaddingMobileVariable = contentPaddingMobile ? '--wpe--content--padding--mobile: ' + contentPaddingMobile + ';' : '';

  // Typography 
  const tags = tag ? tag : [];
  const tagVariables = tags.map((tagEle) => {
    return (`
        ${ tagEle.fontSizeDesktop ? ( `--${tagEle.tagType}--font--size--desktop: ${tagEle.fontSizeDesktop};` ) : '' }
        ${ tagEle.fontSizeTablet ? ( `--${tagEle.tagType}--font--size--tablet: ${tagEle.fontSizeTablet};` ) : '' }
        ${ tagEle.fontSizeMobile ? ( `--${tagEle.tagType}--font--size--mobile: ${tagEle.fontSizeMobile};` ) : '' }
        ${ tagEle.fontWeightDesktop ? ( `--${tagEle.tagType}--font--weight--desktop: ${tagEle.fontWeightDesktop};` ) : '' }
        ${ tagEle.fontWeightTablet ? ( `--${tagEle.tagType}--font--weight--tablet: ${tagEle.fontWeightTablet};` ) : '' }
        ${ tagEle.fontWeightMobile ? ( `--${tagEle.tagType}--font--weight--mobile: ${tagEle.fontWeightMobile};` ) : '' }
        ${ tagEle.lineHeightDesktop ? ( `--${tagEle.tagType}--line--height--desktop: ${tagEle.lineHeightDesktop};` ) : '' }
        ${ tagEle.lineHeightTablet ? ( `--${tagEle.tagType}--line--height--tablet: ${tagEle.lineHeightTablet};` ) : '' }
        ${ tagEle.lineHeightMobile ? ( `--${tagEle.tagType}--line--height--mobile: ${tagEle.lineHeightMobile};` ) : '' }
        ${ tagEle.marginBottomDesktop ? ( `--${tagEle.tagType}--margin--bottom--desktop: ${tagEle.marginBottomDesktop};` ) : '' }
        ${ tagEle.marginBottomTablet ? ( `--${tagEle.tagType}--margin--bottom--tablet: ${tagEle.marginBottomTablet};` ) : '' }
        ${ tagEle.marginBottomMobile ? ( `--${tagEle.tagType}--margin--bottom--mobile: ${tagEle.marginBottomMobile};` ) : '' }
      `);
  });

  return (
    <>
      <style global jsx>{`
        :root {
          ${tagVariables}
          ${headerPaddingVariable}
          ${headerPaddingMobileVariable}
          ${containerWidthVariable}
          ${contentMaxWidthVariable}
          ${contentPaddingVariable}
          ${contentPaddingMobileVariable}
        }
      `}</style>
    </>
  );
}

