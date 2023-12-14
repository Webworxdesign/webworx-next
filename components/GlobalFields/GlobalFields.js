import ThemeSettings from '../../constants/themeSettings';
import HeaderSettings from '../../constants/HeaderSettings';
import FooterSettings from '../../constants/footer-settings';


export default function GlobalFields() {
  const { containerWidth, tag, contentPadding } = ThemeSettings();
  const { headerPadding, headerPaddingMobile } = HeaderSettings();
  const { footerXAxisPadding, footerYAxisPadding } = FooterSettings();
  // console.log(FooterSettings());
  
  const { contentPaddingLeft = null, contentPaddingRight = null, contentPaddingRightMobile = null, contentPaddingLeftMobile = null } = contentPadding ? contentPadding : {};

  const headerPaddingVariable = headerPadding ? '--inside--header--padding: ' + headerPadding + ';' : ''; 
  const headerPaddingMobileVariable = headerPaddingMobile ? '--inside--header--padding--mobile: ' + headerPaddingMobile + ';' : '';
  const footerPaddingX = footerXAxisPadding ? '--footer--padding--x: ' + footerXAxisPadding + 'px;' : '0px';
  const footerPaddingY = footerYAxisPadding ? '--footer--padding--y: ' + footerYAxisPadding + 'px;' : '0px';
  const containerWidthVariable = containerWidth ? '--wwx--container--max-width: ' +  containerWidth + 'px;' : '--wwx--container--max-width: 1280px;';
  const contentMaxWidthVariable = containerWidth ? '--wwx--content--max-width: ' +  containerWidth + 'px;' : '--wwx--content--max-width: 1280px;';
  const contentPaddingLeftVariable = contentPaddingLeft ? '--wwx--content--padding--left: ' +  contentPaddingLeft + 'px;' : '--wwx--content--padding--left: 40px;';
  const contentPaddingRightVariable = contentPaddingRight ? '--wwx--content--padding--right: ' +  contentPaddingRight + 'px;' : '--wwx--content--padding--right: 40px;';
  const contentPaddingRightMobileVariable = contentPaddingRightMobile ? '--wwx--content--padding--right--mobile: ' +  contentPaddingRightMobile + 'px;' : '--wwx--content--padding--right--mobile: 20px;';
  const contentPaddingLeftMobileVariable = contentPaddingLeftMobile ? '--wwx--content--padding--left--mobile: ' +  contentPaddingLeftMobile + 'px;' : '--wwx--content--padding--left--mobile: 20px;';

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
          ${headerPaddingVariable}
          ${headerPaddingMobileVariable}
          ${footerPaddingX}
          ${footerPaddingY}
          ${containerWidthVariable}
          ${contentMaxWidthVariable}
          ${contentPaddingLeftVariable}
          ${contentPaddingRightVariable}
          ${contentPaddingRightMobileVariable}
          ${contentPaddingLeftMobileVariable}
          ${tagVariables.join('').replace(/[\n\r]+/g, '')}
        }
      `}</style>
    </>
  );
}

