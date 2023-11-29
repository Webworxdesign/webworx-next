import { gql, useQuery } from '@apollo/client';

const GetProjectsPosts = gql`
query Projects {
  projects {
    nodes {
      featuredImage {
        node {
          mediaItemUrl
        }
      }
      title
    }
  }
}
`;

export default function ProjectsPosts() {
  const { loading, error, data } = useQuery(GetProjectsPosts);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.projects;
}