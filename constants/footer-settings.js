import { gql, useQuery } from '@apollo/client';

const GetFooterSettings = gql`
query header_settings {
    acfOptionsFooter {
        themeFooterSettings {
            padding {
            footerXAxisPadding
            footerYAxisPadding
            }
        }
    }
}
`;

export default function FooterSettings() {
  const { loading, error, data } = useQuery(GetFooterSettings);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.acfOptionsFooter.themeFooterSettings.padding;
}