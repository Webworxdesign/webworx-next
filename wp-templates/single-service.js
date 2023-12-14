import { gql } from '@apollo/client';
import * as MENUS from '../constants/menus';
import { BlogInfoFragment } from '../fragments/GeneralSettings';
import {
  Header,
  Footer,
  Main,
  Container,
  EntryHeader,
  NavigationMenu,
  ContentWrapper,
  FeaturedImage,
  SEO,
} from '../components';
import { GlobalFields } from '../components/GlobalFields';

export default function SingleService(props) {
  const { title: siteTitle, description: siteDescription } = props?.data?.generalSettings;
  const primaryMenu = props?.data?.headerMenuItems?.nodes ?? [];
  const footerMenu = props?.data?.footerMenuItems?.nodes ?? [];
  const { title, content } = props.data.nodeByUri;

  return (
    <>
      <SEO
        title={`${siteTitle} - ${title}`}
        description={siteDescription} 
      />
      <GlobalFields />
      <Header
        title={siteTitle}
        description={siteDescription}
        menuItems={primaryMenu}
      />
      <Main>
        <>
          {/* <EntryHeader
            title={title}
            image={featuredImage?.node}
            date={date}
            author={author?.node?.name}
          /> */}
          <Container>
            <ContentWrapper content={content} />
          </Container>
        </>
      </Main>
      <Footer title={siteTitle} menuItems={footerMenu} />
    </>
  );
}

SingleService.variables = ({ uri }) => {
  return { 
    uri, 
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION, 
  };
};

SingleService.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenu.fragments.entry}
  query GetServiceByUri(
    $uri: String! 
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
  ) {
    nodeByUri(uri: $uri, ) {
      ... on NodeWithTitle {
        title
      }
      ... on NodeWithContentEditor {
        content
      } 
    }
    generalSettings {
      ...BlogInfoFragment
    }
    headerMenuItems: menuItems(where: { location: $headerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    footerMenuItems: menuItems(where: { location: $footerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
  }
`;