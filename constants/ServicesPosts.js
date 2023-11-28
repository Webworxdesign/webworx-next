import { gql, useQuery } from '@apollo/client';

const GetServicesPosts = gql`
query Services {
  services {
    nodes {
      featuredImage {
        node {
          sourceUrl
        }
      }
      title
      date
      s {
        serviceItem {
          serviceItemTitle
        }
        featuredSectionBackgroundColour
      }
      link
      content
    }
  }
}
`;

export default function ServicesPosts() {
  const { loading, error, data } = useQuery(GetServicesPosts);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

    return data.services;
}