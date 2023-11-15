import { gql, useQuery } from '@apollo/client';

const GetHeaderSettings = gql`
query header_settings {
  acfOptionsHeader {
    themeHeaderSettings {
      headerPresets
      headerWidth
      innerHeaderWidth
      headerPadding 
      headerPaddingMobile
    }
  }
}
`;

export default function HeaderSettings() {
  const { loading, error, data } = useQuery(GetHeaderSettings);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.acfOptionsHeader.themeHeaderSettings;
}