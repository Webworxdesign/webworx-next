import { gql, useQuery } from '@apollo/client';

const GetThemeSettings = gql`
query theme_settings {
  themeGeneralSettings {
    themeGeneralSettings {
      containerWidth
      contentLayout
      contentPadding
      contentPaddingMobile
      fieldGroupName
      logoWidth
      logo {
        sourceUrl
      }
      siteIcon {
        sourceUrl
      }
      tag {
        tagType
        fieldGroupName
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