import { gql, useQuery } from '@apollo/client';

const GetThemeSettings = gql`
query theme_settings {
  themeGeneralSettings {
    themeGeneralSettings {
      containerWidth
      contentLayout
      contentPadding {
        contentPaddingLeft
        contentPaddingRight
        contentPaddingRightMobile
        contentPaddingLeftMobile
      }
      logo {
        databaseId
        sourceUrl
      }
      logoWidth
      siteIcon {
        databaseId
        sourceUrl
      }
      tag {
        fontSizeDesktop
        fontSizeMobile
        fontSizeTablet
        fontWeightDesktop
        fontWeightMobile
        fontWeightTablet
        lineHeightDesktop
        lineHeightMobile
        lineHeightTablet
        marginBottomDesktop
        marginBottomMobile
        marginBottomTablet
        tagType
      }
      featuredHeroVideo {
        mediaItemUrl
      }
      socialMedia {
        socialMediaType
        socialMediaUrl
      }
    }
  }
}
`;

export default function ThemeSettings() {
  const { loading, error, data } = useQuery(GetThemeSettings);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.themeGeneralSettings.themeGeneralSettings;
}